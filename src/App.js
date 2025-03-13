import React, { useState } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Default Pokémon list with Shaymin, Marill, and Mew
  const defaultPokemon = ["Marill", "Piplup", "Mew"];

  // State for the currently displayed Pokémon (default: Marill)
  const [selectedPokemon, setSelectedPokemon] = useState("Marill");

  // State for dynamically added Pokémon buttons
  const [pokemonList, setPokemonList] = useState(defaultPokemon);

  // State for the search input (starts empty)
  const [searchInput, setSearchInput] = useState("");

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle form submission (adding a new button for the entered Pokémon)
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPokemon = searchInput.toLowerCase().trim();

    if (newPokemon) {
      // Add Pokémon to the list if it’s not already present
      if (!pokemonList.includes(newPokemon)) {
        setPokemonList([...pokemonList, newPokemon]);
      }
      // Display the newly added Pokémon
      setSelectedPokemon(newPokemon);
    }

    setSearchInput(""); // Clear input after submission
  };

  // Function to change the selected Pokémon when a button is clicked
  const handlePokemonChange = (name) => {
    setSelectedPokemon(name);
  };

  return (
    <div className="App">
      <h1 className="title">Pokemon Lookup</h1>

      <div className="pokemon-buttons">
        {pokemonList.map((pokemon, index) => (
          <button key={index} onClick={() => handlePokemonChange(pokemon)} className='poke-button btn btn-light mb-2'>
            {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="form d-flex align-items-center">
        <div className="form-group mb-2">
          <label className="sr-only">Enter Pokemon Name</label>
          <input className="name_input form-control" value={searchInput} onChange={handleInputChange} id="inputPokemon"placeholder='marill'/>

        </div>
        <button type="submit" className='submit btn btn-primary mb-2'>+</button>
      </form>

      <Pokemon name={selectedPokemon} />
    </div>
  );
}

export default App;
