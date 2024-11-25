import { useRef } from 'react';

interface InputProps {
  inputValue: string;
  inputClassName: string;
  handleInputClear: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  inputValue,
  inputClassName,
  handleInputClear,
  handleInputChange,
  setIsInputFocused,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="input-wrapper">
      {/* Initially, the input had type="search", but it was not properly supported in some browsers. 
          So, I replaced it with a custom button to clear the input and focus it. */}
      <button
        className="clear-input-button"
        onClick={() => {
          handleInputClear();
          inputRef.current?.focus();
          setTimeout(() => setIsInputFocused(true), 200);
        }}
      >
        X
      </button>
      <input
        ref={inputRef}
        className={`search-input ${inputClassName}`}
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        // The isInputFocused state controls the visibility of the Suggestions, SuggestionsNotFound, and SearchHistory components.
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
      />
    </div>
  );
};

export default Input;
