import React, { Component } from 'react';
import Header from './Components/Header';
//import DocList from './Components/DocList'
import TableDoc from './Components/TableDoc';
import './App.css';


class App extends Component{
  render(){
  return (
    <div className="App">
      <Header/>
      {/* <DocList/> */}
      <TableDoc/>
    </div>
  );}
}

export default App;
