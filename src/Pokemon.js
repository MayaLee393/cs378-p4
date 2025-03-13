import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, LabelList } from "recharts";

const Pokemon = ({ name }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <h1>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim()}</h1>
            <div className="pokemon-types">
                <h2 style={{ textAlign: "center" }}>Type(s):</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    {data.types.map((type_elem, index) => (
                        <span key={index} style={{ padding: "5px 10px", backgroundColor: "#ddd", borderRadius: "10px", fontWeight: "bold" }}>
                            {type_elem.type.name}
                        </span>
                    ))}
                </div>
            </div>
            {data && (
                <>
                    <div className="pokemon-stats">
                        <h2>Base Stats</h2>

                        <ResponsiveContainer width="90%" height={300}>
                            <BarChart data={statsData} margin={{ top: 10, right: 30, left: 20, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                <YAxis domain={[0, 255]} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8">
                                    <LabelList dataKey="value" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="pokemon-abilities">
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
