import apiClient from "./client"
import { TranslationRequestProps } from "./types"

const makeTranslationQuery = async ({
  inputSentence,
}: TranslationRequestProps) => {
  const { data } = await apiClient.POST("/translation/", {
    body: {
      input_sentence: inputSentence,
      input_encoding: "string",
      level_of_explanation: 0,
      target_lang: "string",
      model: "string",
    },
  })

  return data
}

export default makeTranslationQuery
