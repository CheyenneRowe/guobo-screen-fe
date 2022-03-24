import React, { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import './search-input.less';
import '../../styles/widget.less';

function SearchInput(props) {
    let [searchVal, setSearchVal] = useState('');
    function searchChange(event) {
        setSearchVal(event.target.value);
    }
    function searchClick() {
        props.searchValue(searchVal);
    }
    function searchSubmit(event) {
        event.preventDefault();
        searchClick();
    }
    return (
        <div className="search-input-container">
            <form onSubmit={searchSubmit}>
                <input type="text" className="search-input widget-input"
                    value={searchVal}
                    name="searchVal"
                    onChange={searchChange}
                />
                <SearchOutlined className="search-icon" onClick={searchClick} />
            </form>
        </div>
    )
}


export default SearchInput

