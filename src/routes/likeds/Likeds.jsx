import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

// Fetch products based on selected category
const fetchProducts = async () => {
  const response = await api.get(`products?category=all`);
  return response.data;
};

// API Methods for Liked Products
const postLikedProduct = async (id, liked) => {
  const res = await api.post(`products/${id}/likeds`, { liked });
  return res.data;
};

const deleteLikedProduct = async (id, liked) => {
  const res = await api.delete(`products/${id}/likeds`, {
    data: { liked }, // Send the liked data inside the 'data' field in the request body
  });
  return res.data;
};

const Likeds = () => {
  const userInfo = localStorage.getItem("info");
  const userID = userInfo ? JSON.parse(userInfo)?.userId : null;
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorMessage,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    keepPreviousData: true,
    onError: (error) => {
      toast.error("Error loading products: " + error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Mutations for liking/unliking products
  const { mutate: updateLike, isLoading: isLiking } = useMutation({
    mutationFn: ({ id, liked }) => postLikedProduct(id, liked),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product liked!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const { mutate: deleteLike, isLoading: isUnliking } = useMutation({
    mutationFn: ({ id, liked }) => deleteLikedProduct(id, liked),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product unliked!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Like and unlike functions
  function addLikeds(id) {
    updateLike({ id, liked: userID });
  }

  function deleteLikeds(id) {
    deleteLike({ id, liked: userID });
  }

  if (productsError) {
    return <div className="text-red-500 text-center">Error loading products: {productsErrorMessage.message}</div>;
  }

  return (
    <div className="overflow-x-auto py-6">
      <ToastContainer />

      <h2 className="text-white text-3xl text-center font-extrabold mb-7">Products</h2>

      <div className="min-w-full">
        {productsLoading && (
          <div className="w-full p-10">
            <div className="loader m-auto"></div>
          </div>
        )}
        {!products?.length && !productsLoading && (
          <div className="text-xl px-4 py-10 text-gray-700 text-center w-full h-full">No products available.</div>
        )}
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 px-4">
          {products?.map(
            (product) =>
              product?.likeds?.includes(userID) && (
                <div key={product._id} className="hover:bg-blue-gray-50 cursor-default shadow-xl border rounded-md overflow-hidden flex flex-col">
                  <div className="w-full aspect-video bg-gray-400"></div>
                  <h2 className="text-2xl px-3 py-2">{product.name}</h2>
                  <div className="text-xl px-3 py-2 text-blue-600">{product.price}$</div>
                  <div className="text-xl px-3 py-2 font-bold text-green-800">{product.category.name}</div>
                  {product?.likeds?.includes(userID) ? (
                    <button className="self-end px-5 pb-5 text-2xl text-red-600" onClick={() => deleteLikeds(product._id)} disabled={isUnliking}>
                      <FaHeart />
                    </button>
                  ) : (
                    <button className="self-end px-5 pb-5 text-2xl text-red-600" onClick={() => addLikeds(product._id)} disabled={isLiking}>
                      <FaRegHeart />
                    </button>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Likeds;
