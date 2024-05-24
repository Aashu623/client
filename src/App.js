import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import NotFound from './Components/layout/NotFound/NotFound';
import LoginPage from './Pages/LoginPage';
import UserDetailsPage from './Pages/UserDetailsPage';
import RegisterPage from './Pages/RegisterPage';
import QuizPage from './Pages/QuizPage';
import SuccessPage from './Pages/SuccessPage';


function App() {

  // window.addEventListener('contextmenu', (e) => e.preventDefault());

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/me',
        element: <UserDetailsPage />
      },
      {
        path: '/quiz',
        element: <QuizPage />
      },
      {
        path: '/result/submit',
        element: <SuccessPage />
      }
    ]
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
