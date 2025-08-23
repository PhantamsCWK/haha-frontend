import { Outlet } from 'react-router-dom'
// import { useMediaQuery } from '../hooks'
import { Footer } from '../components';
import NavBar from '../features/users/components/NavBar';

const Admin = () => {
  // const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className='flex flex-col justify-start items-center pt-[4px] mx-2'>
      <NavBar/>
      <Outlet />
      <Footer />
    </section>
  )
}

export default Admin