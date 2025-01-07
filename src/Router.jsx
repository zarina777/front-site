import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Product from "./routes/products/Products";
import Login from "./routes/login/Login";
import Home from "./routes/home/Home";
import CreateProduct from "./routes/products/CreateProduct";
import EditProduct from "./routes/products/EditProduct";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Signup from "./routes/signup/Signup";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import Likeds from "./routes/likeds/Likeds";

export default function Routers() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="products">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="likeds"
            element={
              <ProtectedRoute>
                <Likeds />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}
