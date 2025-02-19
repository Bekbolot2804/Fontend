// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from "./components/views/Head"
import Foot from "./components/views/Foot"
import NavBar from "./components/views/NavBar.tsx";
import Navbar from "react-bootstrap/Navbar";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {/*<Head />*/}
      <NavBar />
      <App />
      <Foot />
    </StrictMode>,
)