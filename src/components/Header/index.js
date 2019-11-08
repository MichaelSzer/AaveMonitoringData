import React from 'react';
import './index.css';

class Header extends React.PureComponent { 

    render() {

        return(
            <div id="header">
                <a href="https://aave.com/" rel="noopener noreferrer" target="_blank"><img id="logo" src={require('../../images/aaveLogo.svg')} alt="Aave" /></a>
            </div>
        );
    }
}

export default Header;