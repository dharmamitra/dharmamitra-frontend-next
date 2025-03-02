import { CoreMessage } from "ai"

/**
 * Creates a clean ReadableStream from an AI text stream by removing protocol markers.
 *
 * This utility function takes an async iterable text stream (like the returne of
 * Vercel AI SDK's streamText function) and converts it to a pure ReadableStream that
 * contains only the raw text content without any protocol-specific markers or metadata.
 *
 * The function handles:
 * 1. Stripping protocol markers and metadata from the AI stream
 * 2. Converting clean text chunks to encoded bytes for the stream
 * 3. Proper error handling during streaming
 * 4. Closing the stream when the source is exhausted
 *
 * This is particularly useful when working with an API endpoint that returns a stream
 * containing irregular protocol markers (like "0:", "f:", "e:") which make the content
 * difficult to parse on the client.
 *
 * @param textStream - An async iterable that yields text chunks from an AI stream
 * @returns A ReadableStream containing only the clean text content
 *
 * @example
 * ```typescript
 * // In an API route:
 * const { textStream } = streamText({
 *   model: someModel,
 *   messages: [...],
 * });
 *
 * const readableStream = createReadableStreamFromAI(textStream);
 * return new Response(readableStream, {
 *   headers: {
 *     "Content-Type": "text/plain; charset=utf-8",
 *   },
 * });
 * ```
 */
export function createReadableStreamFromAI(textStream: AsyncIterable<string>) {
  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      try {
        // Process each chunk from the text stream
        for await (const chunk of textStream) {
          // Encode and enqueue the raw text chunk
          controller.enqueue(encoder.encode(chunk))
        }

        // Close the stream when done
        controller.close()
      } catch (error) {
        console.error("Stream processing error:", error)
        controller.error(error)
      }
    },
  })
}

export function composeMessageProps(input: string) {
  const messages: CoreMessage[] = [
    {
      role: "system",
      content: "You are a helpful translator of buddhist literature.",
    },
    {
      role: "user",
      content: `Please translate: ${input}. Return only the translation and a detailed grammatical explanation. Do not wrap the translations in quotes marks and do not include any introductory, or other text.`,
    },
  ]
  return messages
}
