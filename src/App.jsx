import React from 'react'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div className='outer-pokedex'>
       <h1 id='pokedex-heading'>
          <Link to='/'>Pokedex</Link>
       </h1>
       <CustomRoutes/>
    </div>
  )
}
