import React from "react";
import Pagination from "react-bootstrap/Pagination";



export default function PaginationBar({ data, setActive, active, setLoading }) {

  const getPages = () => {
    if (data.total_pages > 10) {
      return 10;
    } else if (data.total_pages <= 10) {
      return data.total_pages;
    }
  }

  let items = [];
  
  for (let number = 1; number <= getPages(); number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => {
        // setLoading(true);
        setActive(number);
        }} >
        {number}
      </Pagination.Item>
    );
  }

  return (  
    items.map(data => 
        <Pagination>{data}</Pagination>
    )
  )
}
