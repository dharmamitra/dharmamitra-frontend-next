/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/translation-fgs/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /** Translation */
    post: operations["translation_translation_fgs__post"]
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/translation-no-stream/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /** Translation No Stream */
    post: operations["translation_no_stream_translation_no_stream__post"]
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/translation/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /** Translation */
    post: operations["translation_translation__post"]
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/tagging/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /** Tagging */
    post: operations["tagging_tagging__post"]
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/available-models/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /** Get Available Models */
    get: operations["get_available_models_available_models__get"]
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    /** AvailableModelsResponse */
    AvailableModelsResponse: {
      /** Models */
      models: components["schemas"]["TranslationModel"][]
    }
    /** Body_tagging_tagging__post */
    Body_tagging_tagging__post: {
      /** Input Sentence */
      input_sentence?: string
      /** Input Sentences Batch */
      input_sentences_batch?: string[]
      mode: components["schemas"]["GrammarModes"]
      /** @default auto */
      input_encoding: components["schemas"]["InputEncoding"]
      /**
       * Human Readable Tags
       * @default false
       */
      human_readable_tags: boolean
    }
    /** Body_translation_no_stream_translation_no_stream__post */
    Body_translation_no_stream_translation_no_stream__post: {
      /** Input Sentence */
      input_sentence: string
      input_encoding: components["schemas"]["InputEncoding"]
      target_lang: components["schemas"]["TargetLanguage"]
    }
    /** Body_translation_translation__post */
    Body_translation_translation__post: {
      /** Input Sentence */
      input_sentence: string
      input_encoding: components["schemas"]["InputEncoding"]
      target_lang: components["schemas"]["TargetLanguageExperimental"]
      model: components["schemas"]["TranslationModel"]
      /**
       * Do Grammar Explanation
       * @default false
       */
      do_grammar_explanation: boolean
    }
    /** Body_translation_translation_fgs__post */
    Body_translation_translation_fgs__post: {
      /** Input Sentence */
      input_sentence: string
      input_encoding: components["schemas"]["InputEncoding"]
      target_lang: components["schemas"]["TargetLanguage"]
    }
    /** ErrorResponseModel */
    ErrorResponseModel: {
      /** Detail */
      detail: string
    }
    /**
     * GrammarModes
     * @enum {string}
     */
    GrammarModes:
      | "lemma"
      | "lemma-morphosyntax"
      | "unsandhied-lemma-morphosyntax"
      | "unsandhied"
      | "unsandhied-morphosyntax"
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][]
    }
    /**
     * InputEncoding
     * @enum {string}
     */
    InputEncoding: "auto" | "tibetan" | "wylie" | "dev" | "iast" | "hk"
    /** Lemma */
    Lemma: {
      /** Lemma */
      lemma: string
      /** Unsandhied */
      unsandhied: string
      /** Tag */
      tag: string
      /** Meanings */
      meanings: string[]
    }
    /** Sentence */
    Sentence: {
      /** Sentence */
      sentence: string
      /** Grammatical Analysis */
      grammatical_analysis: components["schemas"]["Lemma"][]
    }
    /** TaggerResponseModel */
    TaggerResponseModel: components["schemas"]["Sentence"][]
    /**
     * TargetLanguage
     * @enum {string}
     */
    TargetLanguage:
      | "english"
      | "english-explained"
      | "english-deep-research"
      | "tibetan"
      | "sanskrit"
      | "sanskrit-dev"
      | "buddhist-chinese"
      | "modern-chinese"
      | "russian"
      | "korean"
      | "japanese"
      | "german"
      | "french"
      | "italian"
      | "hindi"
      | "spanish"
    /**
     * TargetLanguageExperimental
     * @enum {string}
     */
    TargetLanguageExperimental:
      | "english"
      | "english-explained"
      | "english-deep-research"
      | "tibetan"
      | "sanskrit"
      | "sanskrit-dev"
      | "buddhist-chinese"
      | "korean"
      | "german"
      | "russian"
      | "french"
      | "italian"
      | "spanish"
      | "portuguese"
      | "dutch"
      | "hindi"
      | "japanese"
      | "pali"
      | "sanskrit-knn"
      | "modern-chinese"
    /**
     * TranslationModel
     * @enum {string}
     */
    TranslationModel: "" | "default" | "FGS-RAG" | "MITRA-BASE" | "MITRA-PRO" | "GEMINI-MARKUP-RAG"
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[]
      /** Message */
      msg: string
      /** Error Type */
      type: string
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export interface operations {
  translation_translation_fgs__post: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        "application/json": components["schemas"]["Body_translation_translation_fgs__post"]
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": unknown
        }
      }
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["HTTPValidationError"]
        }
      }
    }
  }
  translation_no_stream_translation_no_stream__post: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        "application/json": components["schemas"]["Body_translation_no_stream_translation_no_stream__post"]
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": unknown
        }
      }
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["HTTPValidationError"]
        }
      }
    }
  }
  translation_translation__post: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        "application/json": components["schemas"]["Body_translation_translation__post"]
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": unknown
        }
      }
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["HTTPValidationError"]
        }
      }
    }
  }
  tagging_tagging__post: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        "application/json": components["schemas"]["Body_tagging_tagging__post"]
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json":
            | components["schemas"]["TaggerResponseModel"]
            | components["schemas"]["ErrorResponseModel"]
        }
      }
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["HTTPValidationError"]
        }
      }
    }
  }
  get_available_models_available_models__get: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["AvailableModelsResponse"]
        }
      }
    }
  }
}
