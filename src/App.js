import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";
import {ThemeProvider} from "./components/themeProvider";


function App() {
    useEffect(() => {
        document.title = "Resume Website"
    },[])

  return (
      <ThemeProvider>
          <RouterProvider router={routers} />
      </ThemeProvider>
      )
}

export default App;
