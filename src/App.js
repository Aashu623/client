import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import NotFound from './Components/layout/NotFound/NotFound';
import LoginPage from './Pages/LoginPage';
import UserDetailsPage from './Pages/UserDetailsPage';
import RegisterPage from './Pages/RegisterPage';
import QuizPage from './Pages/QuizPage';
import SuccessPage from './Pages/SuccessPage';
import AllResultsPage from './Pages/AllResultsPage';
import ProtectedRoute from './Components/ProtectedRoute'
import { loadUser } from './actions/userAction';
import { useDispatch } from 'react-redux';
import LeaderboardPage from './Pages/LeaderboardPage';


function App() {

  // window.addEventListener('contextmenu', (e) => e.preventDefault());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  })
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
        element: <ProtectedRoute component={<UserDetailsPage />} />
      },
      {
        path: '/quiz',
        element: <ProtectedRoute component={<QuizPage />} />
      },
      {
        path: '/result/submit',
        element: <ProtectedRoute component={<SuccessPage />} />
      },
      {
        path: '/results',
        element: <ProtectedRoute component={<AllResultsPage />} />
      },
      {
        path: '/leaderboard',
        element: <ProtectedRoute component={<LeaderboardPage />}/>
      }
    ]
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
