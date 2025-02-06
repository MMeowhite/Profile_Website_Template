import { createBrowserRouter } from 'react-router-dom'

import Layout from "../components/layout";
import Main from "../pages/Main";
import Publication from "../pages/Publication"
import Blog from "../pages/Blog";
import BlogBlocks from "../pages/Blog/blockBlocks";
import BlogPage from "../pages/Blog/blogPage"
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";



// global router configuration
const routers = [
    {
        path: '/',
        element: <Layout />,
        children: [
            // 通过Layout设置的Outlet组件渲染子路由
            {path:"/", element: <Main />},
            {path: "/experience", element: <Experience />},
            {path:"/publication", element: <Publication />},
            {path:"/projects", element: <Projects />},
            {
                path:"/blog",
                element: <Blog />,
                children:[
                    {index: true, element: <BlogBlocks />},
                    {path: ":slug", element: <BlogPage /> }
                ]
            }
        ]
    },
]

export default createBrowserRouter(routers);