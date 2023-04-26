import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    height: var(--nav-height);
    display: flex;
    align-items: center;
    max-width: var(--fluid-width);
    margin: 0 auto;
    width: var(--max-width);
  }

  .container {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: -4rem;
  }

  .main-img {
    max-width: 35rem;
    width: 100%;
    margin: 0 auto;
  }

  h2 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }

  @media screen and (max-width: 992px) {
    .container {
      grid-template-columns: 1fr;
      margin-top: 0;
    }
  }
`;

export default Wrapper;
