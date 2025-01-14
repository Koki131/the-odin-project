import { Link } from "react-router-dom";
import styled from "styled-components";

const StoreContainer = styled.div`
  background: url("/src/assets/store-front.jpg") ;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledLink = styled(Link)`
  border: 1px solid red;
  background-color: red;
  color: white;
  padding: 4vw;
  text-decoration: none;
  font-size: 2vw;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10%;
  &:hover {
    box-shadow: none;
  }
`
const App = () => {
  return (
    <StoreContainer>
      <nav></nav>
      <div>
        <StyledLink to="shop">Shop Now</StyledLink>
      </div>
    </StoreContainer>
  );
};

export default App;