interface InputProps {
  inputValue: string;
  inputClassName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ inputValue, handleInputChange, inputClassName }) => {
  return (
    <input
      className={`search-input ${inputClassName}`}
      value={inputValue}
      onChange={handleInputChange}
      type="search"
    />
  );
};

export default Input;
