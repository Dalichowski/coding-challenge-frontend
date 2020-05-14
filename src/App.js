import React, { Component } from 'react';
import Header from './Components/Header';
import TableDoc from './Components/TableDoc/TableDoc1';

import './App.css';


class App extends Component{
  render(){
  return (
    <div className="App">
      <Header/>
      <TableDoc/>
    </div>
  );}
}

export default App;
