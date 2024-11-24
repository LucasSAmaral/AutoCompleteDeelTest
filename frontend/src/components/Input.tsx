interface InputProps {
  inputSearchValue: string;
  inputSelectedValue: string;
  inputClassName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  inputSearchValue,
  inputSelectedValue,
  handleInputChange,
  inputClassName,
}) => {
  return (
    <input
      className={`search-input ${inputClassName}`}
      value={inputSelectedValue === '' ? inputSearchValue : inputSelectedValue}
      onChange={handleInputChange}
      type="search"
    />
  );
};

export default Input;
