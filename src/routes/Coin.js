import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import React, {useState, useEffect} from 'react';
import './Coin.css'

const Coin = () => {

  const params = useParams();

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);

  // const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`
  const url = `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${params.coinId}?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;
  // const url = `https://api.allorigins.win/get?url=https://api.coingecko.com/api/v3/coins/${params.coinId}?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data);
  
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false)
    })
  }, [url])

 

  if (loading) {
    return <h1>{coin.name ? coin.name : 'Loading...'}</h1>;
  }
  

  return (
    <div>
      <div className='coin-container'>
        <div className='content'>
          <h1>{coin.name}</h1>
        </div>
        <div>
          <div className='content'>
            <div className='rank'>
              <span className='rank-btn'> Rank # {coin.market_cap_rank}</span>
            </div>
            <div className='info'>
              <div className='coin-heading'>
                {coin.image ? <img src={coin.image.small} alt='' /> : " data" } 
                {coin.symbol ? <p>{coin.symbol.toUpperCase()}</p> : " data"}
                {coin.symbol ? <p>{coin.name.toUpperCase()}</p> : " data"}
              </div>
              <div className='coin-price'>
                {coin.market_data?.current_price? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : "data"}
                
              </div>

            </div>

          </div>
        <div className='content'>
          <table>
            <thead>
              <tr>
                <th>1hr</th>
                <th>24hr</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{coin.market_data?.price_change_percentage_1h_in_currency.usd ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : "data"}</td>
                <td>{coin.market_data?.price_change_percentage_24h_in_currency.usd ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : "data"}</td>
                <td>{coin.market_data?.price_change_percentage_7d_in_currency.usd ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : "data"}</td>
                <td>{coin.market_data?.price_change_percentage_14d_in_currency.usd ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : "data"}</td>
                <td>{coin.market_data?.price_change_percentage_30d_in_currency.usd ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : "data"}</td>
                <td>{coin.market_data?.price_change_percentage_1yr_in_currency.usd ? <p>{coin.market_data.price_change_percentage_1yr_in_currency.usd.toFixed(1)}%</p> : "data"}</td>
              </tr>
            </tbody>
          </table>
        </div>
    <div className='content'>
      <div className='stats'>
        <div className='left'>
          <div className='row'>
            <h4>24 Hour Low</h4>
            {coin.market_data?.low_24h? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : "data"}
          </div>
          <div className='row'>
            <h4>24 Hour High</h4>
            {coin.market_data?.high_24h? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : "data"}
          </div>
        </div>
        <div className='right'>
          <div className='row'>
            <h4>Market Cap</h4>
            {coin.market_data?.market_cap ? <p>{coin.market_data.market_cap.usd.toLocaleString()}</p> : "data"}
          </div>
          <div className='row'>
            <h4>Circulating Supply</h4>
            {coin.market_data ? <p>{coin.market_data.circulating_supply.usd}</p> : "data"}
          </div>
          
        </div>
      </div>
    </div>
      <div className='content'>
        <div className='about'>
          <h3>About</h3>
          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(coin.description ? coin.description.en : "It couldn't load")
            }} />


        </div>

      </div>
        </div>
      </div>
    </div>
  )
}

export default Coin