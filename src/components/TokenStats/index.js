import React from 'react';
import './index.css';
import { numberWithCommas } from '../../utils/helpers';

const TokenStats = ({ isLoading, symbol, txCount, volume, usd }) => {

    return(
        <div className="container">
            <p className="tokenTitle">{`Token ${symbol}`}</p>
            <div className="row">
                <div className="stat">
                    <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Tx Count</p>
                    <p style={{ fontSize: 20, fontWeight: 'bold' }}>{isLoading? '-' : `${numberWithCommas(txCount)}`}</p>
                </div>
                <div className="stat">
                    <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Volume</p>
                    <p style={{ fontSize: 20, fontWeight: 'bold' }}>{isLoading? '-' : `${numberWithCommas(volume)}`}<text style={{ fontSize: 14, fontWeight: '200' }}>{` ${symbol}`}</text></p>
                </div>
                <div className="stat">
                    <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Value</p>
                    <p style={{ fontSize: 20, fontWeight: 'bold' }}><text style={{ fontSize: 14, fontWeight: '200' }}>{`U$D `}</text>{isLoading? '-' : `${numberWithCommas(usd)}`}</p>
                </div>
            </div>
        </div>
    );
}

export default TokenStats; 