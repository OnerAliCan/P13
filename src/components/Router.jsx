import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
])

export default router
