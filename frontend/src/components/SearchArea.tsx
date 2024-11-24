import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';

const SearchArea = () => {
  return (
    <div className="search-area">
      <Input />
      <SuggestionsNotFound />
      <Suggestions />
    </div>
  );
};

export default SearchArea;
