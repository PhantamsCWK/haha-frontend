import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
// import Navbar from 'daisyui/components/navbar';
import NavBar from '../features/users/components/NavBar';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className='h-full w-screen'>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default MainLayout;