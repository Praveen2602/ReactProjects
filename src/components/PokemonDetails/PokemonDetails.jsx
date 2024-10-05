import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'
export default function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites?.other?.dream_world?.front_default || response.data.sprites.front_shiny || 'default_image_url.png',
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name), // Corrected here
            });
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]); // Added id as a dependency

    return (
        <div className='pokemon-details-wrapper'>
            <div className='pokemon-details-name'>Name: {pokemon.name}</div>
            <div className='pokemon-details-image'>
                <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>
            <div className="pokemon--details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
            </div>
        </div>
    );
}
