import React, { useEffect,useState} from 'react'
import './PokemonList.css'
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';
export default function PokemonList() {

     const [pokemonList,setPokemonList] = useState([]);
     const [isLoading,setIsLoading] = useState(true);

    const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl , setNextUrl] = useState('');
    const [prevUrl,setPrevUrl]  = useState('');
    
    async function downloadPokemon(){
      setIsLoading(true);
        //this downloads list of 20 pokemon
        const response = await axios.get(pokedexUrl)
        //console.log(response);

        const pokemonResults= response.data.results; // we get the array of pokemon drom results
    //     console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previos);

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
    },[pokedexUrl]);

  return (
    <div className='pokemon-list-wrapper'>
          <div>PokemonList</div>
          <div className='pokemon-wrapper'>
            
          {isLoading ? "Loading" : pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
          </div>
          <div className='controls'>
            <button disabled={prevUrl ===null} onClick={()=>{setPokedexUrl(prevUrl)}}>Prev</button>
            <button disabled={nextUrl===null} onClick={()=>{setPokedexUrl(nextUrl)}}>Next</button>
          </div>
    </div>
  )
}
