import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Layout from './ui/layout/Layout';
// import ProtectedRoute from './ui/authentication/ProtectedRoute';
import AuthPage from './pages/auth/Auth.page';
import HomePage from './pages/home/Home.page';
import ProfilePage from './pages/profile/profile.page';
import ProtectedRoute from './ui/authentication/ProtectedRoute';
import ForgotPassword from './pages/auth/ForgotPassword.page';
import ResetPassword from './pages/auth/ResetPassword.page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const safeRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/signin',
    element: <AuthPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
];

const protectedRoutes = [
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/profile',
        element: <ProfilePage />,
      }
    ],
  },
];

const router = createBrowserRouter([...safeRoutes, ...protectedRoutes]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <ProtectedRoute>
//         <Layout />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         path: '/',
//         element: <HomePage />,
//       },
//       {
//         path: '/profile',
//         element: <ProfilePage />,
//       },
//     ],
//   },
//   {
//     path: '/signin',
//     element: <AuthPage />,
//   },
// ]);
