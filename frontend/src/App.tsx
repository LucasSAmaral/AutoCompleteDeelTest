import Input from './components/Input';
import Suggestions from './components/Suggestions';
import './style.css';

function App() {
  return (
    <div className="wrapper">
      <h1 className="title">Auto Complete</h1>
      <p className="subtitle">Search about web development technologies</p>
      <div className="search-area">
        <Input />
        <Suggestions />
      </div>
    </div>
  );
}

export default App;
