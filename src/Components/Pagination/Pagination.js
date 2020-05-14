import React, {Component} from 'react';
import axios from 'axios';

class Pagination extends Component{
    constructor(props){
        super(props);
        this.state={
           nextPage: this.props.nextPage,
           previousPage: this.props.previousPage
        }
    }

    nextPage = () => {
        axios.get(this.state.nextPage)
            .then(response => {
                this.setState({
                    allDoctors: response.data.entry
                })
            })
    }
    render(){
        return(
            <div>
                <button onClick={this.previousPage} className="btn btn-primary">Previous Page</button>
                <button onClick={this.nextPage} className="btn btn-primary">Next Page</button>
            </div>
        )
    }
}

export default Pagination;