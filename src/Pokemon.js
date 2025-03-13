import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, LabelList } from "recharts";

const Pokemon = ({ name }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      };

    async function fetchPokemon() {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
            console.log(url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setData(data);
            setError(null);
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

    // Convert stats into a format suitable for recharts
    const statsData = data?.stats?.map((stat) => ({
        name: stat.stat.name.toUpperCase(), // Capitalize the stat name
        value: stat.base_stat,
    }));

    return (
        <div>
            <h1 >{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim()}</h1>
            <div className="pokemon-picture">
                <img src={data.sprites.front_default}></img>
            </div>
            <hr style={{width: "90vw", marginLeft: "auto", marginRight: "auto", backgroundColor: "navy", height: "5px" }}></hr>
            <div className="section pokemon-types">
                <h2 style={{ textAlign: "center" }}>Type(s):</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    {data.types.map((type_elem, index) => (
                        <span key={index} style={{ padding: "5px 10px", backgroundColor: typeColors[type_elem.type.name] || "#ddd", borderRadius: "10px", fontWeight: "bold" }}>
                            {type_elem.type.name}
                        </span>
                    ))}
                </div>
            </div>

            {data && (
                <>
                    <div className="section pokemon-stats">
                        <h2>Base Stats</h2>
                        <ResponsiveContainer width="90%" height={300}>
                            <BarChart data={statsData} margin={{ top: 10, right: 30, left: 20, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} scale="band"/>
                                <YAxis domain={[0, 230]} />
                                <Tooltip />
                                <Bar dataKey="value" fill="yellow">
                                    <LabelList dataKey="value" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="section pokemon-abilities">
                        <h2>Abilities</h2>
                        {data.abilities.map((ability_elem, index) => (
                            <p key={index}>{ability_elem.ability.name}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Pokemon;
