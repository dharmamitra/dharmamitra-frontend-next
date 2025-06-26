import { useCallback, useEffect } from "react"

import { focusBgColor as defaultFocusBgColor } from "@/components/styled-client"

export default function useFocusHighlight({
  targetId,
  styledTargetId,
  focusColor = defaultFocusBgColor,
  focusInset = "0",
}: {
  targetId: string
  styledTargetId: string
  focusColor?: string
  focusInset?: string
}) {
  const handleFocusIn = useCallback(
    (styledElement: HTMLElement) => {
      styledElement.style.setProperty("--customFocusColor", focusColor)
      styledElement.style.setProperty("--customFocusInset", focusInset)
      styledElement.style.setProperty("--customFocusZIndex", "0")
    },
    [focusColor, focusInset],
  )

  const handleFocusReset = useCallback((styledElement: HTMLElement) => {
    styledElement.style.setProperty("--customFocusColor", "transparent")
    styledElement.style.setProperty("--customFocusInset", "0")
    styledElement.style.setProperty("--customFocusZIndex", "-1")
  }, [])

  const handleUserTabPress = useCallback(
    ({
      event,
      targetElement,
      styledElement,
    }: {
      event: KeyboardEvent
      targetElement: HTMLElement
      styledElement: HTMLElement
    }) => {
      if (event.key !== "Tab") {
        // handleFocusIn(styledElement)
        return
      }

      targetElement.addEventListener("focusin", () => handleFocusIn(styledElement))
      targetElement.addEventListener("focusout", () => handleFocusReset(styledElement))

      return () => {
        targetElement.removeEventListener("focusin", () => handleFocusIn(styledElement))
        targetElement.removeEventListener("focusout", () => handleFocusReset(styledElement))
      }
    },
    [handleFocusIn, handleFocusReset],
  )

  useEffect(() => {
    const targetElement = document.getElementById(targetId)
    const styledElement = document.getElementById(styledTargetId)
    if (!targetElement || !styledElement) return

    window.addEventListener("keydown", (event) =>
      handleUserTabPress({
        event,
        targetElement,
        styledElement,
      }),
    )

    window.addEventListener("click", () => handleFocusReset(styledElement))

    return () => {
      window.removeEventListener("keydown", (event) =>
        handleUserTabPress({
          event,
          targetElement,
          styledElement,
        }),
      )

      window.addEventListener("click", () => handleFocusReset(styledElement))
    }
  }, [handleUserTabPress, targetId, styledTargetId, handleFocusReset])
}
