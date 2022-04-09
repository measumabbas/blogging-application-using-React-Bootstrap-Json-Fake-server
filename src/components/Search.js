import React from 'react'

const Search = ({handleSearch, searchValue, onInputChange}) => {
  return (
    <div className='search-form'>
      <form className='d-flex' onSubmit={handleSearch}>

        <input 
          type="search" 
          className='form-control'
          placeholder='Search Blog'
          value={searchValue}
          onChange={onInputChange}
        />
        <input type="submit" className="btn btn-primary search-btn" value='Search' />
      </form>
        
    </div>
  )
}

export default Search