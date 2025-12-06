"use client"

import React from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import { clear, createStore, del, entries, get, set } from "idb-keyval"

// Limits estimated to cap IndexedDB usage at ~15MB, but max.
// usage will likely be ~3MB and typical usage should be much lower.
const MAX_ENTRIES = 200
const TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

interface CacheEntry {
  messages: UIMessage[]
  timestamp: number
}

const chatStore = createStore("chat-cache", "messages")

const memoryCache = new Map<string, CacheEntry>()

function isExpired(entry: CacheEntry) {
  return Date.now() - entry.timestamp > TTL_MS
}

function getValidEntry(entry: CacheEntry | undefined) {
  if (!entry) return null
  if (isExpired(entry)) return null
  return entry
}

async function evictOldestIfNeeded() {
  const allEntries = await entries<string, CacheEntry>(chatStore)
  if (allEntries.length <= MAX_ENTRIES) return

  // Sort by timestamp (oldest first) and remove excess
  const sorted = allEntries.sort((a, b) => a[1].timestamp - b[1].timestamp)
  const toRemove = sorted.slice(0, allEntries.length - MAX_ENTRIES + 1)

  for (const [key] of toRemove) {
    memoryCache.delete(key)
    await del(key, chatStore)
  }
}

async function cleanupExpired() {
  const allEntries = await entries<string, CacheEntry>(chatStore)
  for (const [key, entry] of allEntries) {
    if (isExpired(entry)) {
      memoryCache.delete(key)
      await del(key, chatStore)
    }
  }
}

// Run cleanup on module load (once per session)
if (typeof window !== "undefined") {
  cleanupExpired()
}

interface UseCachedChatOptions<T extends object> {
  id: string
  transport: DefaultChatTransport<UIMessage>
  body: T
}

/**
 * A wrapper around useChat that caches messages by id using IndexedDB.
 * Uses a memory cache for fast synchronous access during render,
 * with IndexedDB for persistence across sessions.
 *
 * Cache limits: 75 entries max, 7-day TTL. Oldest entries evicted on insert.
 */
export function useCachedChat<T extends object>({ id, transport }: UseCachedChatOptions<T>) {
  const [isCacheLoaded, setIsCacheLoaded] = React.useState(() => {
    const entry = memoryCache.get(id)
    return getValidEntry(entry) !== null
  })

  const initialMessages = React.useMemo(() => {
    const entry = getValidEntry(memoryCache.get(id))
    return entry?.messages ?? []
  }, [id])

  const chatResult = useChat({
    id,
    transport,
    messages: initialMessages,
  })

  const { setMessages, messages, sendMessage } = chatResult

  function sendMessageWithClear(...args: Parameters<typeof sendMessage>) {
    setMessages([])
    memoryCache.delete(id)
    del(id, chatStore)
    return sendMessage(...args)
  }

  // Load from IndexedDB and update chat state when id changes
  React.useEffect(() => {
    const memEntry = getValidEntry(memoryCache.get(id))
    if (memEntry) {
      setIsCacheLoaded(true)
      return
    }

    setIsCacheLoaded(false)
    let cancelled = false

    get<CacheEntry>(id, chatStore).then((stored) => {
      if (cancelled) return
      const valid = getValidEntry(stored)
      if (valid) {
        memoryCache.set(id, valid)
        setMessages(valid.messages ?? [])
      }
      setIsCacheLoaded(true)
    })

    return () => {
      cancelled = true
    }
  }, [id, setMessages])

  // Persist to IndexedDB when messages change
  React.useEffect(() => {
    if (messages.length > 0) {
      const entry: CacheEntry = { messages, timestamp: Date.now() }
      memoryCache.set(id, entry)
      set(id, entry, chatStore).then(() => evictOldestIfNeeded())
    }
  }, [id, messages])

  return { ...chatResult, isCacheLoaded, sendMessage: sendMessageWithClear }
}

export async function clearCachedChat(id: string) {
  memoryCache.delete(id)
  await del(id, chatStore)
}

export async function clearAllCachedChats() {
  memoryCache.clear()
  await clear(chatStore)
}

export function hasCachedChat(id: string) {
  return memoryCache.has(id)
}
