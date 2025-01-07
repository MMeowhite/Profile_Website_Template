import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";
import {ThemeProvider} from "./components/themeProvider";


function App() {
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch("/config.json");
                const data = await response.json();
                document.title = data.website_title ? data.website_title : data.pages.home.name
            } catch (error) {
                console.log('Error loading the config', error);
            }
        };
        fetchConfig();
    }, []);


  return (
      // global theme setting
      <ThemeProvider>
          {/* router setting*/}
          <RouterProvider router={routers} />
      </ThemeProvider>
      )
}

export default App;
