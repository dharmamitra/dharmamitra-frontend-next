export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]

export const MAX_FILE_SIZE_MB = 150

export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const ACCEPTED_FILE_TYPES_STRING = ALLOWED_FILE_TYPES.join(",")

export const OUTPUT_FILE_NAME_SUFFIX = "_mitra-ocr.txt"

export const makeOCROutputFileName = (fileName?: string) =>
  fileName
    ? fileName
        .replace("filename=", "")
        .replace(/\.[^/.]+$/, OUTPUT_FILE_NAME_SUFFIX)
    : "document" + OUTPUT_FILE_NAME_SUFFIX

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
