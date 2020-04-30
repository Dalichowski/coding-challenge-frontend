import React, {Component} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button} from '@material-ui/core';
import './ModalDoc1.css';

class ModalDoc extends Component {
  constructor(props){
    super(props);
    this.state={
        resource: '',
        docUrl: '',
        name:'',
        family:'',
        address:'',
        telecoms:'',
        telecom: [],
        finalTel: []
    }
  }
  componentDidMount(){
    const {resource, url, name, family} = this.props;
    const index =  url.split('/')[5];
    const docUrl = `http://hapi.fhir.org/baseDstu3/Practitioner/${index}`;
    this.setState({
        resource: resource,
        docUrl: docUrl,
        name: name,
        family: family
    })

    
  }
  onOpenModal = () => {

    this.setState({ open: true });
    const docRes = this.state.resource;

    //DISPLAY TELECOM 
    if(docRes.hasOwnProperty('telecom')){

        const tel = docRes.telecom;
        const com = this.state.telecom;
        for (let i=0; i<tel.length; i++){

          com.push(Object.values(tel[i]))
        }
        const fnl = this.state.finalTel;
        for(let i=0; i<com.length; i++){
          fnl.push(com[i][0].concat(': ', com[i][1]))
        }
        console.log(fnl)
    } 
    //DISPLAY ADDRESS
    if(docRes.hasOwnProperty('address')){
        this.setState({
            address: docRes.address[0].text || docRes.address[0].line
        })
    }

  };

  onCloseModal = () => {
    this.setState({ 
      open: false, 
      finalTel: []
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button variant='contained' onClick={this.onOpenModal}>More ...</Button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <div className='card-body'>
            <h1>{this.props.type} {this.state.name} {this.state.family}</h1>
            <div className='docCard'>
                <br/>
                <h2>Contact :</h2>
                <strong>Telecom : </strong>
                <br/>
                {this.state.resource.hasOwnProperty('telecom') === false ? <p>none</p> : this.state.finalTel.map(tel=>
                  <li>{tel}</li>) }
                <strong>Address :</strong>
                <p>{this.state.address ? this.state.address : 'none'}</p>

            </div>
        </div>
        </Modal>
      </div>
    );
  }
}

export default ModalDoc;
