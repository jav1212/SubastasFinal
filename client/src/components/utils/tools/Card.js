import React from "react";
import Loader from "./Loader";

const Card = ({ productCard }) => {
  return (
    <div
      className=" h-fit rounded overflow-hidden shadow-lg m-12"
      style={{ width: "27%" }}
    >
      <img
        className="w-full"
        src={productCard.src}
        loader={<Loader />}
        alt=""
      />

      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2">{productCard.nombre}</div>
        <p className=" text-azulgrisclaro text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default Card;
