import React from 'react'
import './Search.css'
export default function Search() {
  return (
    <div className='search-wrapper'>
        <input 
          id='pokemon-name-search'
          type='text' 
          placeholder='enter pokemon name.....'>

        </input>
    </div>
  )
}
