import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import Logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
    const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

    const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate('/')
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link to="/">
          <img src={Logo} className="w-12" alt="Maritim Muda" />
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={handleToggle}
          className="flex items-center px-3 py-2 border rounded text-blue-700 border-blue-700 hover:text-blue-500 hover:border-blue-500"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              fillRule="evenodd"
              d="M2 5h16a1 1 0 010 2H2a1 1 0 110-2zm0 6h16a1 1 0 010 2H2a1 1 0 010-2zm0 6h16a1 1 0 010 2H2a1 1 0 110-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        {user ? (
          <div className="text-sm lg:flex-grow">
            <p className="block mt-4 lg:inline-block lg:mt-0 text-black mr-4">
              {`Hello, ${user.email}`}
            </p>
            <button
              onClick={handleLogout}
              className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-700 mr-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-sm lg:flex-grow">
            <Link
              to="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:bg-blue-900 py-1 px-5 rounded-md bg-blue-600 mr-4"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
