import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUpPage from './pages/auth/SignUp.page';
import LogInPage from './pages/auth/LogIn.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <LogInPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
