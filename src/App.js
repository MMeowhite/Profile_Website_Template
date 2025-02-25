import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";
import {ThemeProvider} from "./utils/themeProvider";
import useConfig from "./utils/useConfig"
import {LanguageProvider} from "./utils/languageProvider";


function App() {
    const { configValue: website_title} = useConfig('websiteTitle');

    // setting website title
    document.title = website_title

  return (
      // global theme setting
      <ThemeProvider>
        <LanguageProvider>
          {/* router setting*/}
          <RouterProvider router={routers} />
        </LanguageProvider>
      </ThemeProvider>
      )
}

export default App;
