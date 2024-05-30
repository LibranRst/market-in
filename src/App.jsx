import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ui/authentication/Protected-route';
import AuthLayout from './components/ui/layout/AuthLayout';
import RootLayout from './components/ui/layout/RootLayout';
import UserSidebarLayout from './components/ui/layout/UserSidebarLayout';
import AccountPage from './pages/account/Account.page';
import ForgotPassword from './pages/auth/ForgotPassword.page';
import ResetPassword from './pages/auth/ResetPassword.page';
import SignInPage from './pages/auth/Signin.page';
import SignUpPage from './pages/auth/Signup.page';
import CartPage from './pages/cart/Cart.page';
import HomePage from './pages/home/Home.page';
import Orders from './pages/orders/Orders.page';
import TopUp from './pages/payment/TopUp.page';
import AddEditProduct from './pages/product/AddEditProduct.page';
import ProductPage from './pages/product/Product.page';
import ProfilePage from './pages/profile/Profile.page';
import SellerProfilePage from './pages/profile/SellerProfile.page';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile/:id" element={<SellerProfilePage />} />
        <Route path="/product" element={<Navigate to="/" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/product/create"
            element={<AddEditProduct mode="add" />}
          />
          <Route path="/product/edit" element={<Navigate to="/" />} />
          <Route
            path="/product/edit/:id"
            element={<AddEditProduct mode="edit" />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<UserSidebarLayout />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
