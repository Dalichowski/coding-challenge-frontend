import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow';
import ModalDoc from '../ModalDoc/ModalDoc1';
import ModalEdit from '../ModalEdit/ModalEdit'
import Cross from '../../assets/Pharmacy_Green_Cross.svg.png'
import axios from 'axios';
//import Post from '../ModalEdit/Post';

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
            perPage: null,
            currentPage: null
        }; 
        
    }
    

    async componentDidMount(){
        setTimeout(() => {
            axios.get(this.state.url)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry,
                })
                //Filter Name
                // const filteredDocsName = this.state.allDoctors.filter(docs => docs.resource.name)
                
                // this.setState({
                //     doctorsName: filteredDocsName
                // })
                // //Filter Contact
                // const filteredDocsContact = this.state.allDoctors.filter(docs => docs.resource.telecom)
                // this.setState({
                //     contacts: filteredDocsContact
                // })
                // //Filter Address
                // const filteredDocsAddress = this.state.allDoctors.filter(docs => docs.resource.address)
                // this.setState({
                //     address: filteredDocsAddress
                // })

                console.log(this.state.allDoctors)
            })
            .catch(error=>{

                console.log(error)
            })
            
            
        }, 2000);
    }; 

    
    

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
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (<div className="loader"><h1>Loading Doctors ... <img src={Cross} className='pharmaLogo' alt='pharma-logo' width='60'/></h1></div>)}
            </React.Fragment>            
        );
    }
}



export default DocList;