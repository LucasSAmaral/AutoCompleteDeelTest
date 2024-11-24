import SearchArea from './components/SearchArea';
import './style.css';

function App() {
  return (
    <div className="wrapper">
      <h1 className="title">Auto Complete</h1>
      <p className="subtitle">Search about web development technologies</p>
      <SearchArea />
    </div>
  );
}

export default App;
