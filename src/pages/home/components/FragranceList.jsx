import React, { useState } from "react";
import FragranceCard from "./FragranceCard";
import { Container, Row, Col } from "reactstrap";
import Pagination from "./Pagination";
import SearchAndFiltering from "./SearchAndFiltering";
import useFragranceList from "../../../hooks/useFragranceList";

const FragranceList = () => {
  const { fragranceList } = useFragranceList();
  console.log(fragranceList);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const itemsPerPage = 8;

  // Filter and sort items
  let filteredItems = fragranceList.filter((item) =>
    item.name.includes(searchTerm)
  );
  if (selectedFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.category === selectedFilter
    );
  }
  if (selectedSort) {
    filteredItems.sort((a, b) => a.price - b.price);
  }

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid style={{ padding: "36px" }}>
      <SearchAndFiltering
        filterOptions={["Category 1", "Category 2", "Category 3"]}
        sortOptions={["Price low to high", "Price high to low"]}
        onSearch={setSearchTerm}
        onFilter={setSelectedFilter}
        onSort={setSelectedSort}
      />
      <Row>
        {currentItems.map((item, index) => (
          <Col
            key={index}
            className="d-flex align-items-center justify-content-center"
            sm="12"
            md="6"
            lg="4"
            xxl="3"
          >
            <div className="my-3 w-100">
              <FragranceCard
                fragranceId={item.id}
                fragranceName={item.name}
                brand={item.brand}
                description={item.description}
                imageSources={item.imageSources}
                color={item.color}
              />
            </div>
          </Col>
        ))}
      </Row>

      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ marginTop: "36px" }}
      >
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </Container>
  );
};

export default FragranceList;
