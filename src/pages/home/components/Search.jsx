import React from "react";
import { Input } from "reactstrap";

const Search = ({ onSearch }) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
      <Input
        type="text"
        placeholder="Search by name, brand, notes or description..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
