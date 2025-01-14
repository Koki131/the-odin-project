import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "./CartContext";


const ProductContainer = styled.div`
    margin: 1vw;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    align-items: center;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`
const ImageContainer = styled.div`
    display: flex;
    gap: 2vw;
    flex-direction: column;
    align-items: center;
`
const ImageCarousel = styled.div`
    display: flex;
    flex-direction: row;
    overflow: scroll;
    gap: 2vh;
    align-items: center;
    justify-content: center;
`
const SliderContainer = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CarouselWrapper = styled.div`
    margin-right: 5px;
`
const CarouselImage = styled.img`
    width: min(13vw, 22vh);
    height: min(13vw, 22vh);
    border: 1px solid rgba(0, 0, 0, 0);
    padding: min(1vw, 10px);
`
const CarouselImageActive = styled.img`
    width: min(14vw, 23vh);
    height: min(14vw, 23vh);
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: min(1vw, 10px);
`
const Image = styled.img`
    width: min(40vw, 50vh);
    height: min(40vw, 50vh);
`;

const Button1 = styled.a`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15%;
    width: 15%;
    top: 50%;
    left: 0;
    z-index: 100;
    transform: translate(0, -50%);
`;

const Button2 = styled.a`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15%;
    width: 15%;
    top: 50%;
    right: 0;
    z-index: 100;
    transform: translate(0, -50%);
`

const ProductDescription = styled.div`
    
`
const Quantity = styled.p`
  margin-top: 1vh;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  visibility: ${(props) => props.disabled ? "hidden" : "visible"};
`
const IncreaseQuantity = styled.button`
  margin: 5px;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  };

`
const DecreaseQuantity = styled.button`
  margin: 5px;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  };
`
const QuantityImg = styled.img`
  width: max(2.5vw, 20px);
  height: max(2.5vh, 20px);
`

const AddToCart = styled.button`
    padding: min(10px, 1.5vw);
    background-color: ${(props) => props.disabled ? "grey" : "red"};
    border: none;
    pointer-events: ${(props)=> props.disabled ? 'none' : null};
    border-radius: 10%;
    color: white;
    &:hover {
        cursor: pointer;
    }
`
const P = styled.p`
    font-size: min(16px, 3.5vw);
`
const Price = styled.p`
    font-size: min(20px, 3.5vw);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: min(16px, 3.5vw);
    font-weight: bold;
`
const H2 = styled.h2`
    font-size: min(25px, 5vw);
`
const AddToCartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export default function CardPage() {
    const [index, setIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [insideImageHandler, setInsideImageHandler] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState("center center");
    const [zoom, setZoom] = useState(false);
    const location = useLocation();
    const cart = useCart();
    const item = location.state?.item;    

    
    const handleClick = (index) => {
        setIndex(index)
    }
    const shiftLeft = () => {
       let newIdx = index - 1 % 26;

       if (newIdx < 0) {
        newIdx += 3;
       }

       setIndex(newIdx);

    }
    const shiftRight = () => {
        setIndex((prevIndex) => (prevIndex + 1) % 3);
    }

    const increaseQuantity = () => {
        if (quantity >= 99) return;
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity((prevQuantity) => prevQuantity - 1);
    }
    const addToCart = () => {
        const itemWithQuantity = {...item, quantity};
        cart.addToCart(itemWithQuantity);
    }

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const xPercent = ((e.clientX - left) / width) * 100;
        const yPercent = ((e.clientY - top) / height) * 100;

        setTransformOrigin(`${xPercent}% ${yPercent}%`);
    };


    return (
        <ProductContainer>
            <ImageContainer>
                <SliderContainer onMouseEnter={() => setInsideImageHandler(true)} onMouseLeave={() => setInsideImageHandler(false)}>
                    <CarouselButtons shouldRender={insideImageHandler} shiftLeft={shiftLeft} shiftRight={shiftRight}/>
                    <Image onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} 
                    onMouseMove={handleMouseMove} src={item.images[index]} alt="Product" 
                    style={{transform: zoom ? "scale(2)" : "scale(1)", transformOrigin: transformOrigin}}/>
                </SliderContainer>
                <ImageCarousel>
                    {
                        item.images.map((image, idx) => {
                            return <CarouselWrapper key={idx}>
                                {idx === index ? <CarouselImageActive onClick={() => handleClick(idx)} src={image}/> : 
                            <CarouselImage onClick={() => handleClick(idx)} src={image}/>}
                            </CarouselWrapper>
                        })
                    }
                </ImageCarousel>
            </ImageContainer>
            <ProductDescription>
                <H2>Description</H2>
                <P>{item.description}</P>
                <Price>{item.price}$</Price>
                {
                    cart.cart[item.id] === undefined ? 
                    <>
                        <Quantity disabled={false}>
                            <DecreaseQuantity onClick={decreaseQuantity}><QuantityImg src="/src/assets/minus.svg" alt="decrease" /></DecreaseQuantity>
                            {quantity}
                            <IncreaseQuantity onClick={increaseQuantity}><QuantityImg src="/src/assets/plus.svg" alt="decrease" /></IncreaseQuantity>
                        </Quantity>
                        <AddToCartContainer><AddToCart disabled={false} onClick={addToCart}>Add to cart</AddToCart></AddToCartContainer>
                    </>
                    :
                    <>
                    <Quantity disabled={true}>
                        <DecreaseQuantity onClick={decreaseQuantity}><QuantityImg src="/src/assets/minus.svg" alt="decrease" /></DecreaseQuantity>
                        {quantity}
                        <IncreaseQuantity onClick={increaseQuantity}><QuantityImg src="/src/assets/plus.svg" alt="decrease" /></IncreaseQuantity>
                    </Quantity>
                    <AddToCartContainer><AddToCart disabled={true} onClick={addToCart}>Add to cart</AddToCart></AddToCartContainer>
                </>
                }
            </ProductDescription>
        </ProductContainer>
    );
}



function CarouselButtons({shouldRender, shiftLeft, shiftRight}) {

    if (shouldRender) {
        return (
            <>
                <Button1 onClick={shiftLeft}><img src="/src/assets/arrow-left.svg"/></Button1>
                <Button2 onClick={shiftRight}><img src="/src/assets/arrow-right.svg"/></Button2>
            </>
        );
    }

    return (
        <></>
    );

}
