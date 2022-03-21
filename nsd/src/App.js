import './App.css';
import { Routes, Route} from 'react-router-dom'

import SearchForm from './components/SearchForm'

function App() {
  return (
    <div className="">
      <header className="">
        Hello
      </header>
      <Routes>
        <Route path="/" element={<SearchForm />} />
      </Routes>
    </div>
  );
}

export default App;
