type AutoCompleteResponse =
  | {
      suggestions: string[];
    }
  | { suggestionsNotFoundMessage: string };
