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
            url: `https://hapi.fhir.org/baseDstu3/Practitioner`,
            doctorsName: null,
            allDoctors: null,
            contacts: null,
            address: null,
            pagination: null,
            paginationSet: null,
            nextPage: null,
            previousPage: null,
            search:''
        }; 
        
    }
    
    //LOAD API
    async componentDidMount(){
        setTimeout(() => {
            axios.get(this.state.url)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry   
                })

                //Setting HTTPS Pagination Link
                const pag = response.data.link[1].url;
                const pag2 = pag.split('/')
                pag2.splice(0, 1, 'https:')
                this.setState({
                    pagination: pag2.join('/')
                })
                console.log(this.state.pagination)

                axios.get(this.state.pagination)
                    .then(response => {
                        //Setting HTTPS Next & Previous Page Links
                        const nxtp = response.data.link[1].url;
                        const nxtp2 = nxtp.split('/')
                        nxtp2.splice(0, 1, 'https:')

                        const prvp = response.data.link[2].url;
                        const prvp2 = prvp.split('/')
                        prvp2.splice(0, 1, 'https:')
                        this.setState({
                            nextPage: nxtp2.join('/'),
                            previousPage: prvp2.join('/')
                        })
                        
                    })
                })
            .catch(error=>{

                console.log(error)
            }) 
        }, 2000);
    }; 
    
    //Go To Next Page
    nextPage = () => {
        axios.get(this.state.nextPage)
            .then(response => {
                const nxtp = response.data.link[1].url;
                const nxtp2 = nxtp.split('/')
                nxtp2.splice(0, 1, 'https:')

                const prvp = response.data.link[2].url;
                const prvp2 = prvp.split('/')
                prvp2.splice(0, 1, 'https:')
                this.setState({
                    allDoctors: response.data.entry,
                    nextPage: nxtp2.join('/'),
                    previousPage: prvp2.join('/')
                })    
            })      
    }
    
    //Go To Previous Page
    previousPage = () => {
        axios.get(this.state.previousPage)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry,
                })
                if(response.data.link[2] === undefined){
                    const nxtp = response.data.link[1].url;
                    const nxtp2 = nxtp.split('/')
                    nxtp2.splice(0, 1, 'https:')
                    
                    this.setState({
                        previousPage: this.state.url,
                        nextPage: nxtp2.join('/'),
                    })
                } else {
                    const nxtp = response.data.link[1].url;
                    const nxtp2 = nxtp.split('/')
                    nxtp2.splice(0, 1, 'https:')

                    const prvp = response.data.link[2].url;
                    const prvp2 = prvp.split('/')
                    prvp2.splice(0, 1, 'https:')
                    
                    this.setState({
                        nextPage: nxtp2.join('/'),
                        previousPage: prvp2.join('/')
                    })
                }
            })      
    }

    //SEARCH INPUT
    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        })
        console.log(this.state.search)
    }

    //SEARCH FONCTION
    searchDoctor = () =>{
        const searchList = `https://hapi.fhir.org/baseDstu3/Practitioner?given=${this.state.search}&_format=json&_pretty=true`;
        axios.get(searchList)
            .then(searchResponse =>{
                this.setState({
                    allDoctors: searchResponse.data.entry
                })
                console.log(searchResponse)
            })
    }
    

    render(){
        return(
            <React.Fragment>
                <div className="form-row" id="searcher" onKeyPress={e => {
                    if (e.key === 'Enter'){
                        this.searchDoctor()
                    }
                }}>
                    <div className="form-group col-md-5">
                        <input type="text" placeholder='Dr. Anybody ...' name='search' value={this.state.search} className="form-control" onChange={this.handleSearchChange}/>
                    </div>
                    <div className="form-group col-md-1">
                        <button onClick={this.searchDoctor} className="btn btn-primary">Search...</button>
                    </div>   
                </div>
                
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