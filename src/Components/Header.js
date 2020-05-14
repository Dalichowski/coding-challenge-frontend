import React, { Component } from 'react';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../assets/Pharmacy_Green_Cross.svg.png';
import Typography from '@material-ui/core/Typography';

import './Header.css';

class Header extends Component{
    
    render(){
        return(
            <AppBar position="sticky">
                <Toolbar className='appBar'>
                    <Typography variant="h3" >
                        <img src={Logo} width="50" alt='pharmaLogo'/> LeahCare
                    </Typography>
                </Toolbar>
            </AppBar>
            
        );
    }
}

export default Header;