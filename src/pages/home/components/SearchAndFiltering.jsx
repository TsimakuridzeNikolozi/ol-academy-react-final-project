import React, { useState } from "react";
import {
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const SearchAndFiltering = ({
  filterOptions,
  sortOptions,
  onSearch,
  onFilter,
  onSort,
}) => {
  const [dropdownOpenFilter, setDropdownOpenFilter] = useState(false);
  const [dropdownOpenSort, setDropdownOpenSort] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const toggleFilter = () => setDropdownOpenFilter((prevState) => !prevState);
  const toggleSort = () => setDropdownOpenSort((prevState) => !prevState);

  const handleFilter = (option) => {
    setSelectedFilter(option);
    onFilter(option);
  };

  const handleSort = (option) => {
    setSelectedSort(option);
    onSort(option);
  };

  const clearAll = () => {
    setSelectedFilter(null);
    setSelectedSort(null);
    onSearch("");
    onFilter(null);
    onSort(null);
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
      <Input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className=""
      />
      <div className="d-flex align-items-center justify-content-center gap-1 text-nowrap flex-wrap flex-md-nowrap">
        <Dropdown isOpen={dropdownOpenFilter} toggle={toggleFilter}>
          <DropdownToggle caret>
            Filter: {selectedFilter || "None"}
          </DropdownToggle>
          <DropdownMenu>
            {filterOptions.map((option, index) => (
              <DropdownItem key={index} onClick={() => handleFilter(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={dropdownOpenSort} toggle={toggleSort}>
          <DropdownToggle caret>Sort: {selectedSort || "None"}</DropdownToggle>
          <DropdownMenu>
            {sortOptions.map((option, index) => (
              <DropdownItem key={index} onClick={() => handleSort(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button onClick={clearAll}>Clear All</Button>
      </div>
    </div>
  );
};

export default SearchAndFiltering;
