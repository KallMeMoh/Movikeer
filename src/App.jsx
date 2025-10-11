import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';

let router = createBrowserRouter([
  {
    path: '',
    element: <Home />
  },
  {
    path: 'movie',
    element: <h2>Hi</h2>
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;