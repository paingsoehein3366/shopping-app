import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginApp from './components/loginApp';
import ShirtApp from './components/ShirtApp';
import ShirtCategories from './components/ShirtCategories';
import UpdateCategory from './components/UpdateCategory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginApp />
  }, {
    path: "/shirt",
    element: <ShirtApp />
  },
  {
    path: "/shirtCategory",
    element: <ShirtCategories />
  },
  {
    path: "/updateCategory/:id",
    element: <UpdateCategory />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
