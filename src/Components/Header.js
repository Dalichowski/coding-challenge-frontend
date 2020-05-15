import React, { Component } from 'react';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../assets/Pharmacy_Green_Cross.svg.png';
import Typography from '@material-ui/core/Typography';

import './Header.css';

class Header extends Component{
    
    goHome = () => {
        window.location.reload()
    }

    render(){
        return(
            <AppBar position="sticky">
                <Toolbar className='appBar'>
                    <Typography id="Logo" variant="h3" onClick={this.goHome}>
                        <img src={Logo} width="50" alt='pharmaLogo'/> LeahCare
                    </Typography>
                </Toolbar>
            </AppBar>
            
        );
    }
}

export default Header;