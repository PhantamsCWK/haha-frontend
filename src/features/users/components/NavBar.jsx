// import { useAuth, useMediaQuery } from '../../../hooks';

import { CiLogin, CiLogout } from "react-icons/ci";
import { useAuth } from "../../../hooks"
import { Link } from "react-router-dom";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";

const NavBar = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const navigate = useNavigate();
  const { token, user, logout } = useAuth()
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
        {user?.role == 'admin' ? <Link to="/admin" className="btn btn-ghost text-xl" >Admin</Link> 
        : <></>
        }
       
    </div>
    <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl" >CuCuCoffee</Link>
    </div>
    <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-circle">
            <Link to={'history'}>
                <FaHistory size={20}/>
            </Link>
        </button>
        <button className="btn btn-ghost btn-circle">
            <Link to={'carts'} className="indicator">
                <PiShoppingCartSimpleLight size={25}/>
            </Link>
        </button>
        <button className="btn btn-ghost btn-circle">
            <div>
                {
                    token ? <CiLogout size={25} onClick={()=> logout()}/>
                    : <Link to={'/login'}><CiLogin size={25} /></Link>
                }
            </div>
        </button>
    </div>
    </div>
  )
}

export default NavBar