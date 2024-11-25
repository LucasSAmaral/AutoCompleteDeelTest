// I chose to define this type as a union of two objects and check if one of the properties is present in the response object (see `useFetchSuggestions.ts`)).
// This approach is more explicit and avoids passing all properties as partials and checking if they are undefined.
type AutoCompleteResponse =
  | {
      suggestions: string[];
    }
  | { suggestionsNotFoundMessage: string };
