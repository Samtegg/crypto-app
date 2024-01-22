import React from 'react'
import Coinitem from './Coinitem'
import { Link } from 'react-router-dom'

import './Coins.css'

const Coins = (props) => {

  return (
    <div className="container">
        <div>
            <div className='heading'>
                <p>#</p>
                <p className='coin-name'>Coin</p>
                <p>Price</p>
                <p>24h</p>
                <p className='hide-mobile'>Volume</p>
                <p className='hide-mobile'>Mkt Cap</p>

            </div>

            {props.coins.map(coins => {
              return (
                <Link key={coins.id} to={`/coin/${coins.id}`}>
                  <Coinitem coins={coins} key= {coins.id}/>
                </Link>
              )
            })}

        </div>

    </div>
  )
}

export default Coins