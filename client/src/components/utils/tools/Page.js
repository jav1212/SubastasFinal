import React from "react";
import Card from "./Card";

const Pagination = ({ products, activePage }) => {
  const productsPerPage = products.slice(
    (activePage - 1) * 3,
    (activePage - 1) * 3 + 3
  );
  return (
    <div className="flex-wrap flex justify-between mt-2">
      {productsPerPage.map((product, index) => {
        return <Card productCard={product} key={index} />;
      })}
    </div>
  );
};

export default Pagination;
