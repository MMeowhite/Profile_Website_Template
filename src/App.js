import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";


function App() {
    useEffect(() => {
        document.title = "Resume Website"
    },[])
  return <RouterProvider router={routers} />
}

export default App;
