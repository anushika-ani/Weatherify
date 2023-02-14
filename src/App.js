import React,{useState} from 'react';
import {Fetch} from './apicalls/Fetch';
import './App.css'


function App() {
    const [query,setQuery]=useState('');
    const [weather, setWeather] = useState({});

    const search = async(eov)=>{
        if(eov.key ==='Enter'){
            const data = await Fetch(query);
            setWeather(data);
            
            setQuery('');
            console.log(data);
        }
    }
  return (
    <div className='main-container'>
        <input
            type='text'
            className='search'
            value={query}
            placeholder='Search....'
            onChange={(e)=>setQuery(e.target.value)}
            onKeyPress={search}
        />
        {weather.main && (
            <div className='city'>
                <div className='city-temp'>
                    {Math.round(weather.main.temp)}
                    <sup>&deg;C</sup>
                </div>
                <h2 className='city-name'>
                    <span>{weather.name}</span>
                    <sup>{weather.sys.country}</sup>
                </h2>
                <div className='info'>
                    <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                    <p>{weather.weather[0].description}</p>
                </div>
                
                
            </div>
            
        )}
        
    </div>
  )
}

export default App