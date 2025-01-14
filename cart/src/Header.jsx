import styled from "styled-components";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContainer = styled.header`
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 5vh;
  padding: max(1vh, 1vw);
`
const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: max(10px, 1vw);
  font-size: max(0.7vw, 14px);
  &:hover {
    cursor: pointer;
  }
  `
const CartImage = styled.img`
  width: max(1.5vw, 18px);
  height: max(5vh, 20px);
  `
const CartItems = styled.p`
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: max(1vw, 16px);
  height: max(1vw, 16px);
  `

const Cart = styled.div`
  z-index: 1000;
  background-color: #ffffff;
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: calc(100vh - 5vh);
  transition: 0.3s ease;
  width: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


const StyledLink = styled(Link) `
  text-decoration: none;
  color: white;
  margin: 1vw;
  font-size: max(1.5vw, 16px);
  &:hover {
    color: red;
  }
`
const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeaderLink = styled.h1`
  display: flex;
  align-items: center;
`
export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const cart = useCart();


  return (
    <StickyWrapper>
      <HeaderContainer>
        <Links>
          <HeaderLink><StyledLink to="/">Home</StyledLink></HeaderLink>
          <HeaderLink><StyledLink to="shop">Shop</StyledLink></HeaderLink>
        </Links>
        <CartContainer onClick={() => setShowCart(!showCart)}>
          <CartImage src="/src/assets/cart-header.svg" alt="cart icon" />
          <CartItems>{Object.keys(cart.cart).length}</CartItems>
        </CartContainer>
        <CartWindow visible={showCart} cartItems={cart.cart}/>
      </HeaderContainer>
    </StickyWrapper>
  );
}

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;;
`

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: min(20px, 2vw);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`
const CartItemImage = styled.img` 
  width: max(6vw, 12vh);
  height: max(6vw, 12vh);
`
const CartItemDescription = styled.div`
  height: 100%;
  width: 100%;
  margin: 1vw;
`
const Title = styled.p`
  font-weight: bold;
  font-size: min(18px, 4vw);
`
const Buttons = styled.div`
  margin-top: 1vh;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const Increase = styled.button`
  margin: 5px;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  };

`
const Decrease = styled.button`
  margin: 5px;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  };
`

const QuantityImg = styled.img`
  width: max(1.2vw, 20px);
`
const RemoveFromCart = styled.button`
  border: none;
  background-color: white;
`
const RemoveImg = styled.img`
  width: max(1.3vw, 20px);
  &:hover {
    cursor: pointer;
  }
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 1vh;
`

const P = styled.p`
  font-size: min(16px, 3.5vw);
`
const H2 = styled.h2`
    font-size: min(25px, 5vw);
`
const TotalForItem = styled.p`
  font-weight: bold;
  font-size: min(16px, 3.5vw);
`
const TotalForItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CartItemContainer = styled.div`
  
`
const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: max(2vh, 2vw);
`
const Checkout = styled.button`
  padding: min(1vw, 10px);
  background-color: red;
  border: none;
  border-radius: 10%;
  color: white;
  font-size: min(16px, 1.5vw);
`
function CartWindow({visible, cartItems}) {

  const cart = useCart();

  const increaseQuantity = (item) => {
    const temp = {...item};
    temp.quantity += 1;
    
    cart.addToCart(temp);
    
  }

  const decreaseQuantity = (item) => {
    const temp = {...item};
    if (temp.quantity > 1) {
      temp.quantity -= 1;
      cart.addToCart(temp);
    }
    
  }

  if (visible) {
    if (Object.keys(cartItems).length <= 0) {
      return (
        <></>
      );
    }
    
    return (
      <Cart>
        <CartItemContainer>
          <CartHeader>
            <H2>Cart</H2>
          </CartHeader>
          {
            Object.keys(cartItems).map(id => {
              const value = cartItems[id];
              return <CartItem key={id}>
                  <CartItemImage src={value.images[0]} alt="#" />
                  <CartItemDescription>
                    <TitleContainer>
                      <Title>{value.title}</Title>
                      <RemoveFromCart onClick={() => cart.removeFromCart(id)}><RemoveImg src="/src/assets/delete.svg" alt="remove from cart"/></RemoveFromCart>
                    </TitleContainer>
                    <P>{value.description}</P>
                    <TotalForItemContainer>
                      <Buttons>
                        <Decrease onClick={() => decreaseQuantity(value)}><QuantityImg src="/src/assets/minus.svg" alt="decrease" /></Decrease>
                        <P>{value.quantity}</P>
                        <Increase onClick={() => increaseQuantity(value)}><QuantityImg src="/src/assets/plus.svg" alt="increase" /></Increase>
                      </Buttons>
                      <TotalForItem>{(value.quantity * value.price).toFixed(2)} $</TotalForItem>
                    </TotalForItemContainer>
                  </CartItemDescription>
              </CartItem>
            })
          }
        </CartItemContainer>
        <TotalContainer>
          <TotalForItem>Total: {cart.cartTotal()} $</TotalForItem>
          <Checkout>Checkout</Checkout>
        </TotalContainer>
      </Cart>
    );
  }

  return (<></>); 
}
