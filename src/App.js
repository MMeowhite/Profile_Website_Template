import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";
import {ThemeProvider} from "./components/themeProvider";
import useConfig from "./utils/useConfig"


function App() {
    const { configValue: website_title} = useConfig('website_title');

    // setting website title
    document.title = website_title

  return (
      // global theme setting
      <ThemeProvider>

          {/* router setting*/}
          <RouterProvider router={routers} />

      </ThemeProvider>
      )
}

export default App;
