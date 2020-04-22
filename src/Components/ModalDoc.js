import React, {Component} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button} from '@material-ui/core';
import './ModalDoc.css';

class ModalDoc extends Component {
  constructor(props){
    super(props);
    this.state={
      open: false,
      name:'',
      family:'',
      index:'',
      docs: '',
      contactMode1:'',
      contactValue1: '',
      contactMode2:'',
      contactValue2: '',
      contactMode3:'',
      contactValue3:''
    }
  }
  componentDidMount(){
    const {url, name, family, docs} = this.props;
    const index =  url.split('/')[5];
    // const docUrl = `http://hapi.fhir.org/baseDstu3/Practitioner/${index}`;
    this.setState({
      name: name,
      family: family,
      index: index,
      docs: docs,
      
    })
    
    
  }
  onOpenModal = () => {

    this.setState({ open: true });

    const system1 = this.state.docs[0].system;
    const value1 = this.state.docs[0].value; 
    const system2 = this.state.docs[1].system;
    const value2 = this.state.docs[1].value;
    const system3 = this.state.docs[2].system;
    const value3 = this.state.docs[2].value;
    console.log(system1 + ' : ' + value1,'|' +this.state.docs[1].system + ' : ' +this.state.docs[1].value )
    this.setState({
      contactMode1: system1,
      contactValue1: value1,
      contactMode2: system2,
      contactValue2: value2,
      contactMode3: system3,
      contactValue3: value3
    })
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button variant='contained' onClick={this.onOpenModal}>More ...</Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className='docCard'>
              <h1>{this.props.type} {this.state.name} {this.state.family}</h1>
              <div>
                <h2>Contact :</h2> 
                <strong>{this.state.contactMode1}</strong> : {this.state.contactValue1}
                <br/>
                <strong>{this.state.contactMode2}</strong> : {this.state.contactValue2}
                <br/>
                <strong>{this.state.contactMode3}</strong> : {this.state.contactValue3}
              </div>
              
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalDoc;