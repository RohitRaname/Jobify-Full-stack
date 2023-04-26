import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  // sidebar is set in userReducer it is global
  const { user, toggleSidebar, logoutUser } = useAppContext();

  // logout dropdown
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn toggle-sidebar" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />

            {/* always use ?. */}
            <span>{user?.name}</span>
            <FaCaretDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutUser}
            >Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
