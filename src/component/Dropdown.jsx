import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdClear, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            isOpen: false,                                          // toggle dropdown
            options: (this.props.options !== undefined) ? this.props.options.map(val => String(val)): [],    // cast all options to string values 
            multiselect: (this.props.multi) ? true : false,         // if allow multi selection 
            selectedOptions: [],                                    // selected options
            searchValue: "",                                        // search bar value 
            placeholder: (this.props.placeholder !== undefined) ? this.props.placeholder : "Select..."
        }
    
    }

    componentDidUpdate(prevProps, prevState){
        // update props onchange function
        if ((this.props.onChange !== undefined) && (prevState.selectedOptions != this.state.selectedOptions)) {
            this.props.onChange(this.state.selectedOptions);
        }
        // reset search value
        if (this.state.isOpen != prevState.isOpen){
            this.setState({searchValue:""});
        }
    }

    debounce = (func, delay) => {
        /*
        search delay to prevent over computing
        */
        let debounceTimer;
        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer= setTimeout(() => func.apply(this, args), delay);
        };
    };

    handleSearch = (e) => {
        /*
        set the search bar value 
        */
        this.setState({
            searchValue: e.target.value
        })
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    toggleCear = () => {
        /*
        Remove all selected 
        */
        this.setState({
            selectedOptions: [],
        });
    }

    handleMultiOptionClick = (option) => {
        /*
        Check if selected, if so remove from array. If not selected, add to array 
        */
        if (this.state.selectedOptions.includes(option)) {
          this.setState({
            selectedOptions: this.state.selectedOptions.filter((item) => item !== option),
          });
        } else {
          this.setState({
            selectedOptions: [...this.state.selectedOptions, option],
          });
        }
    };

    handleSingleOptionClick = (option) => {
        /*
        Only have 1 option 
        */
        this.setState({
            selectedOptions: [option]
        })
    }

    handleSelectAll = () => {
        /*
        Select all options
        */
        this.setState({
          selectedOptions: this.state.options,
        });
    };

    handleClickOutside = (event) => {
        /*
        If user click outside component, close dropdown 
        */
        if (this.containerRef && !this.containerRef.current.contains(event.target)) {
          this.setState({isOpen:false})
        }
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);    // add click outside event 
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside); // remove click outside event 
    }

    render() {
        const updateSearch = this.debounce(this.handleSearch, 500);     // set debounce value 
        return (
            <div className="multiselect-dropdown" ref={this.containerRef}>
                {/* This the the Dropdown main component in hmlt  */}
                <div className={`dropdown-toggle ${this.state.isOpen ? 'open' : ''}`}>
                    <div onClick={this.toggleDropdown}>
                        {this.state.selectedOptions.length === 0 ? this.state.placeholder : this.state.selectedOptions.join(', ')}
                    </div>       
                    <div className='dropdown-button-right'>
                        {this.state.selectedOptions.length === 0 && <div/>}  
                        {this.state.selectedOptions.length !== 0 &&<MdClear onClick={this.toggleCear}/>}
                        {this.state.isOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown />}
                    </div>
                </div>
                {/* Dropdown of all the options */}
                {this.state.isOpen && (
                <ul className="dropdown-options">
                    {/* Static buttons for select all & de-select all*/}
                    {this.state.multiselect && (
                        <div className='dropdown-options-buttons'>
                            <div className='select-buttons'>
                                <div onClick={this.handleSelectAll} className='select-button'>
                                    Select All
                                </div>
                                <div onClick={this.toggleCear} className='select-button' style={{"border-left": "1px solid"}}>
                                    Remove All
                                </div>
                            </div>
                        </div>     
                    )}
                    {/* Search bar to filter options if pass in props */}
                    {this.props.isSearch && (
                        <input onChange={updateSearch} className='search-box'/>
                    )}
                    {/* Options: blue if selected, else white */}
                    {this.state.options.filter(option => option.toLowerCase().includes(this.state.searchValue.toLowerCase())).map((option) => (
                    <li
                        key={option}
                        onClick={() => (this.state.multiselect? this.handleMultiOptionClick(option): this.handleSingleOptionClick(option))}
                        className={this.state.selectedOptions.includes(option) ? 'selected' : ''}
                    >
                        {this.state.multiselect && (this.state.selectedOptions.includes(option)? <MdCheckBox/>: <MdCheckBoxOutlineBlank/>)}
                        {option}
                    </li>
                    ))}
                </ul>
                )}
            </div>
        )
    }

}

Dropdown.propTypes = {
    options: PropTypes.array,
    multi: PropTypes.bool,
    isSearch: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}


export default Dropdown;