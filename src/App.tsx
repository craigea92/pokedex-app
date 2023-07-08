import React, { useEffect } from "react";
import NavBar from "./sections/NavBar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import "react-toastify/dist/ReactToastify.css";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import "./scss/index.scss";
import { onAuthStateChanged } from "@firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig";

function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if a user is authenticated when the component mounts
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        // If the user is authenticated, set the user status with the email
        dispatch(setUserStatus({ email: currentUser.email }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      // Show toast messages for each item in the toasts array
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      // Clear toasts in the application state
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <NavBar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<MyList />} path="/list" />
            <Route element={<About />} path="/about" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
