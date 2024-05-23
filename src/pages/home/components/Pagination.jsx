import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ currentPage, totalPages, paginate }) => {
  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first href="#" onClick={() => paginate(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          href="#"
          previous
          onClick={() => paginate(currentPage - 1)}
        />
      </PaginationItem>

      <PaginationItem active>
        <PaginationLink>{currentPage}</PaginationLink>
      </PaginationItem>

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          href="#"
          next
          onClick={() => paginate(currentPage + 1)}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink href="#" last onClick={() => paginate(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
