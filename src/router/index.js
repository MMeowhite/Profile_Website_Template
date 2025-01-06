import { createBrowserRouter } from 'react-router-dom'

import Layout from "../components/layout";
import Main from "../components/Main";


// global router configuration
const routers = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {path:"/", element: <Main />}
        ]
    },
]

export default createBrowserRouter(routers);