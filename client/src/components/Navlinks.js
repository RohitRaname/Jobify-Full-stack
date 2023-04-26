import React from "react";
import links from "../utils/links";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export function Navlinks({ toggleFunc }) {
  const { toggleSidebar } = useAppContext();

  return (
    <ul className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={id}
            to={path}
            onClick={toggleFunc!=="false" ? toggleSidebar : () => {}}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </ul>
  );
}
