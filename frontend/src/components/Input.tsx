interface InputProps {
  inputValue: string;
  inputClassName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  inputValue,
  inputClassName,
  handleInputChange,
  setIsInputFocused,
}) => {
  return (
    <input
      className={`search-input ${inputClassName}`}
      value={inputValue}
      onChange={handleInputChange}
      type="search"
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
    />
  );
};

export default Input;
