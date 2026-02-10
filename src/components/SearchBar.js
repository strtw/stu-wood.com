import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            inputValue:'',
        };

    }
    handleClick(e){
       this.sendQuery();
    }

    handleKeyPress(e){
            this.setState({inputValue:e.currentTarget.value});
            if(e.keyCode === 13){
                this.sendQuery();
              }
    }


    sendQuery = () =>{
        this.props.getSearchQuery(this.state.inputValue);
    }
   
    render(){
        return(
            <div className="search">
                <input className="search-bar" type='text' value={this.state.inputValue} onKeyDown={evt => this.handleKeyPress(evt)} onChange={evt => this.handleKeyPress(evt)} aria-label="Search projects" /><span id="search-bar-search" className='search-button' role="button" tabIndex={0} onClick={evt => this.handleClick(evt)} onKeyDown={evt => { if (evt.key === 'Enter' || evt.key === ' ') { evt.preventDefault(); this.handleClick(evt); } }}>Search</span>
            </div>
        )
}
    
}

export default SearchBar