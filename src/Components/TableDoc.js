import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Cross from '../assets/Pharmacy_Green_Cross.svg.png'
import axios from 'axios';

import './TableDoc.css';

class DocList extends Component {

    constructor(props){
        super(props);

        this.state = {
            url: `http://hapi.fhir.org/baseDstu3/Practitioner`,
            doctors: null,
            allDoctors: null,
            contacts: null
        }; 
        
    }

    async componentDidMount(){
        setTimeout(() => {
            axios.get(this.state.url)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry,
                })
                const filteredDoc = this.state.allDoctors.filter(doctor => doctor.resource.name)
                
                this.setState({
                    doctors: filteredDoc
                })
                const filteredCont = this.state.doctors.filter(doctor => doctor.resource.telecom)
                
                this.setState({
                    contacts: filteredCont
                })
                console.log(this.state.doctors)
            })
            .catch(error=>{
                console.log(error)
            })
        }, 2000);
    }; 

    
    

    render(){
        return(
            <React.Fragment>
                {this.state.doctors && this.state.contacts ? (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {this.state.doctors.map(doctor => (
                            <TableRow key={doctor.resource.id} hover={true}>
                                <TableCell>{doctor.resource.id}</TableCell>
                                <TableCell>{doctor.resource.name[0].prefix || doctor.resource.name[0].given}</TableCell>
                                <TableCell>{doctor.resource.name[0].given  || doctor.resource.name[1].given }</TableCell>
                                <TableCell>{doctor.resource.name[0].family || doctor.resource.name[0]._family.extension[0].valueString}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>) : (<div className="loader"><h1>Loading Doctors ... <img src={Cross} className='pharmaLogo' alt='pharma-logo' width='60'/></h1></div>)}
            </React.Fragment>            
        );
    }
}



export default DocList;