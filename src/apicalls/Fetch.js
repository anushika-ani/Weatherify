import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_Key = '957918bf68c5bef00f7240987f7a10eb';

export const Fetch = async(query)=>{
    const {data} = await axios.get(URL,{
        params :{
            q:query,
            units:'metric',
            APPID: API_Key,
        }
    });
    return data;
}