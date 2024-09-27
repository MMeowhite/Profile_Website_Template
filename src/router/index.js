import { createBrowserRouter } from 'react-router-dom'

import Main from "../components/Main";
import CV from "../pages/cv";



const routers = [
    {
        path: '/',
        Component: Main,
    },
    {
        path: '/cv',
        Component: CV,
    }
]

export default createBrowserRouter(routers);