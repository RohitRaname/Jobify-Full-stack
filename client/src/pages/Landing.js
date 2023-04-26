import "styled-components";

import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import { Logo } from "../components";

import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav className="nav">
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h2>
            Job <span> Tracking </span>App
          </h2>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
