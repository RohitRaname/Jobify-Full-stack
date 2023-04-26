import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "../components/Logo";
import { useAppContext } from "../context/AppContext";
import { Navlinks } from "./Navlinks";

const SmallSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn">
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <Navlinks  />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
