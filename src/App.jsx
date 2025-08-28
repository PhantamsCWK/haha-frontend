import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Loading from './pages/Loading'
import { useAuth } from './hooks';
// const AdminLayout = from './layouts/AdminLayout';

const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Error = lazy(() => import("./pages/Error"));
const Admin = lazy(() => import("./pages/Admin"));
const Charts = lazy(() => import("./pages/Charts"));
const History = lazy(() => import("./pages/History"));
const Product = lazy(() => import("./pages/Product"));
// const Post = lazy(() => import("./pages/Post"));
// // const Profile = lazy(() => import("./pages/Profile"));
// const SettingAccount = lazy(() => import("./pages/SettingAccount"));
// // const SettingProfile = lazy(() => import("./pages/SettingProfile"));
// // const SettingSecurity = lazy(() => import("./pages/SettingSecurity"));


const App = () => {

  const { token, user } = useAuth()

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='carts' element={<Charts />} />
            <Route path='history' element={<History />} />
          </Route>
          <Route element={token ? <Navigate to="/" /> : <AuthLayout />}>
            <Route path='login' element={ <Login /> }/>
            <Route path='register' element={ <Register /> }/>
          </Route>
          <Route element={ token && user.role == 'admin' ? <AdminLayout/> : <Navigate to="/"/> } >
            <Route path='admin' element={<Admin />}/>
            <Route path='product/:id' element={<Product />}/>
          </Route>
          {/* <Route path='*' element={<Error />}/> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App