import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom"
import routers from "./router";
import { ThemeProvider } from "./utils/Provider/themeProvider";
import { LanguageProvider } from "./utils/Provider/languageProvider";
import {ConfigProvider} from "./utils/Provider/ConfigProvider";


function App() {

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
