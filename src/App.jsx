// import ProtectedRoute from './ui/authentication/ProtectedRoute';

import { Navigate, Route, Routes } from 'react-router-dom';
import RootLayout from './components/ui/layout/RootLayout';
import ProfilePage from './pages/profile/Profile.page';
import SignInPage from './pages/auth/Signin.page';
import SignUpPage from './pages/auth/Signup.page';
import ForgotPassword from './pages/auth/ForgotPassword.page';
import ResetPassword from './pages/auth/ResetPassword.page';
import HomePage from './pages/home/Home.page';
import ProductPage from './pages/product/Product.page';
import AuthLayout from './components/ui/layout/AuthLayout';
import SettingsPage from './pages/settings/Settings.page';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/product" element={<Navigate to="/" />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
