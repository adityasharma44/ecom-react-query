import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Home from "./Home";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FaMicrophone, FaSearch, FaTimes } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 8,
    skip: 0,
  });

  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 0);
  const q = searchParams.get("q") || "";

  // const [limit] = useState(4);
  // const [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  // const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const result = await axios.get(
      `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`
    );
    return result.data.products;
  };

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", limit, skip, q],
    queryFn: getProducts,
    // staleTime:10000,
    // refetchInterval:3000.
    placeholderData: keepPreviousData,
  });

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  if (error) {
    return console.log(error.message);
  }

  const toProducts = (id) => {
    navigate(`/product/${id}`);
  };

  const handleMove = (moveCount) => {
    // setSkip((prevSkip)=>{
    //   return Math.max(prevSkip + moveCount,0);
    // })
    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0));
      return prev;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      prev.set("q", e.target.value);
      prev.set("skip", 0);
      return prev;
    });
  };

  return (
    <>
      <Home />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full max-w-md mx-auto">
            <FaSearch className="text-gray-500 ml-3" />
            <input
              type="text"
              className="flex-grow p-2 rounded-full outline-none"
              placeholder="Search..."
              onChange={(e) => {
                e.preventDefault();
                setSearchParams((prev) => {
                  prev.set("q", e.target.value);
                  prev.set("skip", 0);
                  return prev;
                });
              }}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product, index) => (
              <div
                key={product.id}
                onClick={(e) => {
                  e.preventDefault();
                  toProducts(product.id);
                }}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.images[0]}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => handleMove(-limit)}
              type="button"
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => handleMove(limit)}
              class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
