import { createBrowserRouter } from 'react-router-dom'

import Layout from "../utils/layout";
import Main from "../pages/Main";
import Publication from "../pages/Publication"
import Blogs from "../pages/Blogs";
import BlogBlocks from "../pages/Blogs/blockBlocks";
import BlogPage from "../pages/Blogs/blogPage"
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import NotFound from "../pages/NotFound";



// global router configuration
const routers = [
    {
        path: '/',
        element: <Layout />,
        children: [
            // 通过Layout设置的Outlet组件渲染子路由
            {path: "/", element: <Main />},
            {path: "/experience", element: <Experience />},
            {path: "/publication", element: <Publication />},
            {path: "/projects", element: <Projects />},
            {
                path:"/blogs",
                element: <Blogs />,
                children:[
                    {index: true, element: <BlogBlocks />},
                    {path: ":slug", element: <BlogPage /> }
                ]
            },
            {path: "*", element: <NotFound />}
        ]
    },
]

export default createBrowserRouter(routers);