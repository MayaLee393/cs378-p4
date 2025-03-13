import logo from './logo.svg';
import './App.css';

import Pokemon from './Pokemon';

function App() {
  return (
    <div className="App">
        <h1>Pokemon Lookup</h1>
        <input className="name_input" placeholder='Pokemon Name'></input>
        <Pokemon name="marill"/>
    </div>
  );
}

export default App;
