import React, { useEffect, useState } from "react";
import { socket } from "../../../config/socket";
import Page from "../../utils/tools/Page";
import Pagination from "react-bootstrap/Pagination";
import Loader from "../../utils/tools/Loader";

const Auctions = () => {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [dataArrived, setDataArrived] = useState(false);

  const timer = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    socket.emit("getProducts");

    function onGetProducts(data) {
      timer();
      setDataArrived(true);
      setProducts(data);
    }
    socket.on("postProducts", (data) => onGetProducts(data));

    return () => {
      socket.off("getProducts");
      socket.off("postProducts", (data) => onGetProducts(data));
    };
  }, [products, active]);

  const handleNext = () => {
    if (active < items.length) {
      setActive(active + 1);
    }
  };
  const handlePrev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };
  const handleClick = (e) => {
    setActive(parseInt(e.target.id));
  };

  let items = [];
  for (let index = 1; index <= Math.ceil(products.length / 3); index++) {
    items.push(index);
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Page products={products} activePage={active} />
          <div className=" flex items-center justify-center">
            <Pagination className=" absolute bottom-3" size="lg">
              <Pagination.Prev onClick={handlePrev} />
              {items.map((item) => {
                return (
                  <Pagination.Item
                    onClick={handleClick}
                    id={item}
                    key={item}
                    active={item === active}
                  >
                    {item}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next onClick={handleNext} />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
};

export default Auctions;
