export const ocrSelectionBoxId = "ocr-selection-box"

export function handleOCRKeyPress(event: KeyboardEvent, triggerFn: () => void) {
  const { key, ctrlKey, shiftKey } = event

  if (key === "Enter" && !ctrlKey && !shiftKey) {
    const input = document.getElementById(ocrSelectionBoxId)

    if (!input || !(input instanceof HTMLTextAreaElement) || !input.value)
      return

    if (
      input === document.activeElement ||
      document.activeElement?.tagName === "BODY"
    ) {
      triggerFn()
    }
  }
}

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]

export const MAX_FILE_SIZE_MB = 15

export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const ACCEPTED_FILE_TYPES_STRING = ALLOWED_FILE_TYPES.join(",")

export const validateFile = (file: File | null | undefined): file is File => {
  if (!file || !(file instanceof File)) {
    return false
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    alert("Please upload a PDF, JPG, PNG, or WEBP file")
    return false
  }
  if (file.size > MAX_FILE_SIZE) {
    alert("File size should be less than 15MB")
    return false
  }
  return true
}

export const downloadOCRTextFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link) // Required for Firefox
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
