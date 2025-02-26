import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";
import { ThemeProvider } from "./utils/Provider/themeProvider";
import useConfig from "./utils/useConfig"
import { LanguageProvider } from "./utils/Provider/languageProvider";
import {ConfigProvider} from "./utils/Provider/ConfigProvider";


function App() {
    const { configValue: website_title} = useConfig('websiteTitle');

    // setting website title
    document.title = website_title

  return (
      <ThemeProvider>
        <LanguageProvider>
            <ConfigProvider>
                <RouterProvider router={routers} />
            </ConfigProvider>
        </LanguageProvider>
      </ThemeProvider>
      )
}

export default App;
