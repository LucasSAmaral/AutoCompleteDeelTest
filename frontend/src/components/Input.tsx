interface InputProps {
  inputSearchValue: string;
  inputSelectedValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  shouldRemoveBorderBottom: boolean;
}

const Input: React.FC<InputProps> = ({
  inputSearchValue,
  inputSelectedValue,
  handleInputChange,
  shouldRemoveBorderBottom,
}) => {
  return (
    <input
      className={`search-input ${shouldRemoveBorderBottom ? 'no-border-bottom' : ''}`}
      value={inputSelectedValue === '' ? inputSearchValue : inputSelectedValue}
      onChange={handleInputChange}
      type="search"
    />
  );
};

export default Input;
