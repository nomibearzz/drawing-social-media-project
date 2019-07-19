import React from 'react';

const Searchbar = (props) => {
  const {searchQuery, onChange} = props;
  console.log(props);
   
  return (
    <div className="search">
      <input type="text"
        placeholder="Search a Drawing"
        value={searchQuery}
        onChange={(event) => onChange(event)} 
        data-cy="searchbar" />
    </div>
  );
  
}

export default Searchbar;