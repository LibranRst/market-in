import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from './components/ui/layout/Layout';
// import ProtectedRoute from './ui/authentication/ProtectedRoute';
import HomePage from './pages/home/Home.page';
import ProfilePage from './pages/profile/profile.page';
import ProtectedRoute from './components/ui/authentication/ProtectedRoute';
import ForgotPassword from './pages/auth/ForgotPassword.page';
import ResetPassword from './pages/auth/ResetPassword.page';
import { ThemeProvider } from './components/theme-provider';

import { Toaster } from '@/components/ui/toaster';
import SignInPage from './pages/auth/Signin.page';
import SignUpPage from './pages/auth/Signup.page';
import SettingsPage from './pages/settings/settings.page';

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
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
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
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...safeRoutes, ...protectedRoutes]);
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
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
