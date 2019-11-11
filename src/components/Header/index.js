import React from 'react';
import './index.css';

class Header extends React.PureComponent { 

    render() {

        return(
            <div id="header">
                <a href="https://aave.com/" rel="noopener noreferrer" target="_blank"><img id="logo" src={require('../../images/aaveLogo.svg')} alt="Aave" /></a>
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                    <a className="text-navigator" href="#dashboard" >Dashboard</a>
                    <a className="text-navigator" href="#total-liquidation" >Total Liquidation - Historical Events</a>
                    <a className="text-navigator" href="#events-monitor" >Events Monitor</a>
                </div>
            </div>
        );
    }
}

export default Header;