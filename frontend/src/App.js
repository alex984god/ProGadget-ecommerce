import { Container } from "react-bootstrap";
import Header from "./components/Header";
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import React from "react";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ScrollToTopButton from './components/ScrollToTopButton'


const App = () => {
  return (
    <>
      <Header/>
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
      <ScrollToTopButton/>
    </>
  );
};

export default App;
