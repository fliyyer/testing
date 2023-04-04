import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Navbar = () => {

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
    <nav>
      <div>
        <Link to="/">
          <img src="logo.png" alt="Logo" />
        </Link>
      </div>
      {user ? (
        <div>
          <p>{`Hello, ${user.email}`}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
