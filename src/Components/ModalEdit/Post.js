import React, {Component} from 'react';
//import axios from 'axios';

class PersonList extends Component {
  state = {
    //NAME & GENDER
    name: this.props.preName,
    family: this.props.preLast,
    gender: '',
    birthDate:'',
    birthDateDisplayed:'',
    //ADDRESS
    address: this.props.address[0].text,
    city: this.props.address[0].city,
    postalCode: this.props.address[0].postalCode,
    country: this.props.address[0].country,
    //TELECOM
    telephone: this.props.telecom[0],
    fax: this.props.telecom[1],
    eMail:this.props.telecom[2],
    //Doctor Index & URL
    index: this.props.index,
    docUrl: '' 
  }
  
  //Handle Input Changes
  handleChange = (event) => {
    const docUrl = `http://hapi.fhir.org/baseDstu3/Practitioner/${this.state.index}`
    const value = event.target.value
    this.setState({ 
      [event.target.name]: value,
      docUrl: docUrl
    });
  }

  //Put Changes in Api
  handleSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state.index)
    fetch(`http://hapi.fhir.org/baseDstu3/Practitioner/${this.state.index}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.index,
        resourceType: 'Practitioner',
        name: [{
          use: "official",
          text: this.state.name + ' ' + this.state.family,
          family: this.state.family,
          given: this.state.name,
          prefix: "Dr." 
        }],
        gender: this.state.gender,
        birthDate: this.state.birthDate,
        address: [ {
          use: "work",
          text: this.state.address,
          city: this.state.city,
          postalCode: this.state.postalCode,
          country: this.state.country
        }],
        telecom: [ {
          system: "phone",
          value: this.state.telephone
            }, {
          system: "fax",
          value: this.state.fax
          }, {
          system: "email",
          value: this.state.eMail
        } ],
      }),
      headers:{
        'Content-Type' : 'application/fhir+json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(json => console.log(json))
    
    window.location.reload()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name='name' className="form-control" placeholder={this.state.name} value={this.state.name} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" name="family" className="form-control" placeholder={this.state.family} value={this.state.family} onChange={this.handleChange} required/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="birthDatePicker">Date *</label>
              <input className="form-control" name="birthDate" type="date"  id="birthDatePicker"  value={this.state.birthDate} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="genderSelect">Gender *</label>
              <select type="text" id="genderSelect" name="gender" className="form-control" value={this.state.gender} onChange={this.handleChange} required>
                <option defaultValue={this.state.gender}>Choose...</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address *</label>
            <input type="text" className="form-control" id="inputAddress" name="address" value={this.state.address} onChange={this.handleChange} required/>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City *</label>
              <input type="text" className="form-control" name="city" id="inputCity" value={this.state.city} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">Country *</label>
              <input type="text" className="form-control" name="country" id="inputCountry" value={this.state.country} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Postal Code *</label>
              <input type="text" className="form-control" name="postalCode" id="inputPostalCode" value={this.state.postalCode} onChange={this.handleChange} required/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputTelephone">Telephone *</label>
              <input type="tel" className="form-control" name="telephone" id="inputTelephone" placeholder={this.state.telephone} value={this.state.telephone} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputFax">Fax *</label>
              <input type="tel" className="form-control" name="fax" id="inputFax" value={this.state.fax} onChange={this.handleChange} required/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail">E-Mail *</label>
              <input type="email" className="form-control" name="eMail" id="eMail" value={this.state.eMail} onChange={this.handleChange} required/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    )
  }
}

export default PersonList;
