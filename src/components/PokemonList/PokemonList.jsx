import React, { useEffect,useState} from 'react'
import './PokemonList.css'
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';
export default function PokemonList() {

     const [pokemonList,setPokemonList] = useState([]);
     const [isLoading,setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';
    
    async function downloadPokemon(){
        //this downloads list of 20 pokemon
        const response = await axios.get(POKEDEX_URL)
        //console.log(response);

        const pokemonResults= response.data.results; // we get the array of pokemon drom results
    //     console.log(response.data);

        const pokemonResultPromise =  pokemonResults.map((pokemon)=> axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);

        const pokeListResult = pokemonData.map((pokeData)=>{
               const pokemon = pokeData.data;
               return {
                id:pokemon.id,
                name:pokemon.name,
                image: pokemon.sprites?.other?.dream_world?.front_default || pokemon.sprites.front_shiny || 'default_image_url.png',
                types:pokemon.types
            }
        
        });
        console.log(pokeListResult);
        setPokemonList(pokeListResult)
        setIsLoading(false);
        
    }
    useEffect(()=>{
       downloadPokemon();
    },[]);

  return (
    <div className='pokemon-list-wrapper'>
          <div>PokemonList</div>
          <div className='pokemon-wrapper'>
            
          {isLoading ? "Loading" : pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
          </div>
          <div className='controls'>
            <button>Prev</button>
            <button>Next</button>
          </div>
    </div>
  )
}
