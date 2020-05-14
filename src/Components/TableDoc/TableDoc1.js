import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow';
import ModalDoc from '../ModalDoc/ModalDoc1';
import ModalEdit from '../ModalEdit/ModalEdit';
//import Pagination from '../Pagination/Pagination';
import Cross from '../../assets/Pharmacy_Green_Cross.svg.png'
import axios from 'axios';
//import Link from '@material-ui/core/Link';

import './TableDoc1.css';

class DocList extends Component {

    constructor(props){
        super(props);

        this.state = {
            url: `http://hapi.fhir.org/baseDstu3/Practitioner`,
            doctorsName: null,
            allDoctors: null,
            contacts: null,
            address: null,
            pagination: null,
            paginationSet: null,
            nextPage: null,
            previousPage: null
        }; 
        
    }
    

    async componentDidMount(){
        setTimeout(() => {
            axios.get(this.state.url)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry,
                    pagination: response.data.link[1].url,   
                })
                    console.log(this.state.pagination)
                axios.get(this.state.pagination)
                    .then(response => {
                        console.log(response.data.link)
                        this.setState({
                            nextPage: response.data.link[1].url,
                            previousPage: response.data.link[2].url 
                        })
                        
                    })
                })
            .catch(error=>{

                console.log(error)
            }) 
        }, 2000);
    }; 

    nextPage = () => {
        axios.get(this.state.nextPage)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry,
                    nextPage: response.data.link[1].url,
                    previousPage: response.data.link[2].url
                })    
            })      
    }
    
    previousPage = () => {
        axios.get(this.state.previousPage)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry,
                })
                if(response.data.link[2] === undefined){
                    this.setState({
                        previousPage: this.state.url,
                        nextPage: response.data.link[1].url,
                    })
                } else {
                    this.setState({
                        nextPage: response.data.link[1].url,
                        previousPage: response.data.link[2].url
                    })
                }
            })      
    }
    

    render(){
        return(
            <React.Fragment>
                {this.state.allDoctors ? (
                    <TableContainer>

                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow className='tableHead'>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Details</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                                {this.state.allDoctors.map(doctor => (
                                    <TableRow key={doctor.resource.id} hover={true}>
                                        <TableCell>{doctor.resource.id}</TableCell>
                                        
                                        <TableCell>{doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].prefix || doctor.resource.name[0].given }</TableCell>
                                        <TableCell>{doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].given }</TableCell>
                                       {/* <TableCell></TableCell>  */}
                                        <TableCell>{doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].family }</TableCell>
                                        <TableCell>
                                            <ModalDoc
                                                resource={doctor.resource}
                                                url={doctor.fullUrl}
                                                type={doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].prefix}
                                                name={doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].given}
                                                family={doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].family }
                                                birthDate={doctor.resource.birthDate}
                                                gender={doctor.resource.gender}

                                            />
                                        </TableCell>
                                        <TableCell>
                                            <ModalEdit
                                                resource={doctor.resource}
                                                url={doctor.fullUrl}
                                                type={doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].prefix}
                                                name={doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].given }
                                                family={doctor.resource.name === undefined ? 'Not Specified' : doctor.resource.name[0].family }
                                                address={doctor.resource.address}
                                                telecom={doctor.resource.contacts}
                                                bDate={doctor.resource.birthDate}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <button onClick={this.previousPage} className="btn btn-primary">Previous Page</button>
                        <button onClick={this.nextPage} className="btn btn-primary">Next Page</button>
                        {/* <Pagination
                            nextPage={this.state.nextPage}
                            previousPage={this.state.previousPage}
                        /> */}
                    </TableContainer>
                ) : (<div className="loader"><h1>Loading Doctors ... <img src={Cross} className='pharmaLogo' alt='pharma-logo' width='60'/></h1></div>)}
                
            </React.Fragment>            
        );
    }
}



export default DocList;