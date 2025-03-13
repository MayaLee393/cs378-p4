import React, { useState, useEffect } from "react";

const Pokemon = ({ name }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPokemon() {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
            console.log(url)
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(`Pokemon ${name} not found!`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [name]);

  if (loading) return <p>Loading pokemon stats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={fetchPokemon}>Get Pokemon</button>
      {data && (<>
        <div className="pokemon-stats">
        <h2>Stats</h2>
            {data.stats && data.stats.map((stat_elem, index) => {
            
                const stat_base = stat_elem.base_stat;
                const stat_name = stat_elem.stat.name;
                return (
                    <p key={index}>{stat_name}: {stat_base}</p>
                );
            })}
        </div>
        <div className="pokemon-abilities">
            <h2>Abilities</h2>
            {data.abilities && data.abilities.map((ability_elem, index) => {
                const ability_name = ability_elem.ability.name;
                return (
                    <p key={index}>{ability_name} i</p>
                );
            })}
        </div>
        </>)}
    </div>
  );
};

export default Pokemon;
