import React from "react";

const Search = ({ handleQuery, searchQuery, searchResults }) => {
  return (
    <div>
      <label>
        Search by name:
        <input type="text" value={searchQuery} onChange={handleQuery} />
      </label>
      <ul>
        {searchResults.map((contact) => (
          <li key={contact.name}>
            {contact.name} {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
