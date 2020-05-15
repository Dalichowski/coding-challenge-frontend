import React, {Component} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button} from '@material-ui/core';
import './ModalDoc1.css';

import PersonList from './Post';

class ModalEdit extends Component {
  constructor(props){
    super(props);
    this.state={
        docUrl: '',
        index:'',
        name: '',
        family:'',
        address:'',
        telecom: [],
        finalTel: []
    }
  }

  //API CALL
  componentDidMount(){
    const {resource, url, name, family, address } = this.props;
    const index =  url.split('/')[5];
    const docUrl = `https://hapi.fhir.org/baseDstu3/Practitioner/${index}`;
    this.setState({
        resource: resource,
        docUrl: docUrl,
        index: index,
        name: name,
        family: family,
        address: address
    })
  }

  
  //OPEN MODAL
  onOpenModal = () => {
    this.setState({ 
      open: true 
    });
    const docRes = this.state.resource;
    if(docRes.hasOwnProperty('telecom')){

      const tel = docRes.telecom;
      const com = this.state.telecom;
      for (let i=0; i<tel.length; i++){

        com.push(Object.values(tel[i]))
      }
      const fnl = this.state.finalTel;
      for(let i=0; i<com.length; i++){
        fnl.push(String(com[i][1]))
      }
      console.log(fnl)
  }
  };

  //CLOSE MODAL
  onCloseModal = () => {
    this.setState({ 
      open: false,
      telecom: [],
      finalTel: []
    });
    console.log(this.state.finalTel)
    window.location.reload()
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button variant='contained' onClick={this.onOpenModal}>Edit ...</Button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <div className='card-body'>
            <h1>{this.props.type} {this.state.name} {this.state.family}</h1>
            <div className='docCard'>
                <p>{this.state.index}</p>
                (* means required)
            </div>
        </div>
        <PersonList
            index={this.state.index}
            preName={this.state.name}
            preLast={this.state.family}
            address={this.state.address === undefined ? 'none' : this.state.address}
            telecom={this.state.finalTel === undefined ? 'none' : this.state.finalTel}
            bDate={this.props.bDate}
        />
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;
