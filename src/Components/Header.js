import React, { Component } from 'react';
import {AppBar} from '@material-ui/core';
//import Button from '@material-ui/core/Button';
//import {Menu} from '@material-ui/icons'
import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import './Header.css';

class Header extends Component{
    
    render(){
        return(
            <AppBar position="sticky">
                <Toolbar className='appBar'>
                    <Typography variant="h3" >
                    Leah
                    </Typography>
                </Toolbar>
            </AppBar>
            
        );
    }
}

export default Header;