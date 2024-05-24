import React, { useState } from "react";
import FragranceCard from "./FragranceCard";
import { Container, Row, Col } from "reactstrap";
import Pagination from "./Pagination";
import Search from "./Search";
import { useDB } from "../../../hooks/useDB";

const FragranceList = () => {
  const { fragranceList } = useDB();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  // Filter items by search term
  let filteredItems = fragranceList.filter((item) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowercaseSearchTerm) ||
      item.brand.toLowerCase().includes(lowercaseSearchTerm) ||
      item.description.toLowerCase().includes(lowercaseSearchTerm) ||
      item.notes.toString().toLowerCase().includes(lowercaseSearchTerm)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid style={{ padding: "36px" }}>
      <Search onSearch={setSearchTerm} />
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
            <div className="my-3">
              <FragranceCard
                fragranceId={item.id}
                fragranceName={item.name}
                fragranceConcentration={item.concentration}
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
