import React from 'react';
import './index.css';
import { numberWithCommas } from '../../utils/helpers';

const ReserveFinance = ({ isLoading, symbol, liquiditySupply, depositInterestRate, stableBorrowRate, variableBorrowRate }) => {

    return (
        <div className="reserveFinanceContainer">
            <div className="detail">
                <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Liquidity Supply</p>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>{isLoading? '-' : `${numberWithCommas(liquiditySupply)}`}<text style={{ fontSize: 14, fontWeight: 200 }}>{` ${symbol}`}</text></p>
            </div>
            <div className="detail">
                <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Deposit Interest Rate APR</p>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>{isLoading? '-' : `${depositInterestRate}`}<text style={{ fontSize: 14, fontWeight: 200 }}>{` %`}</text></p>
            </div>
            <div className="detail">
                <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Stable Borrow Rate APR</p>
                <p style={{ fontSize: 20, fontWeight: 'bold', color: '#b6509e' }}>{isLoading? '-' : `${stableBorrowRate}`}<text style={{ fontSize: 14, fontWeight: 200, color: 'black' }}>{` %`}</text></p>
            </div>
            <div className="detail">
                <p style={{ fontSize: 16, fontWeight: 200, marginBottom: 12 }}>Variable Borrow Rate APR</p>
                <p style={{ fontSize: 20, fontWeight: 'bold', color: '#2ebac6' }}>{isLoading? '-' : `${variableBorrowRate}`}<text style={{ fontSize: 14, fontWeight: 200, color: 'black' }}>{` %`}</text></p>
            </div>
        </div>
    );
}

export default ReserveFinance;