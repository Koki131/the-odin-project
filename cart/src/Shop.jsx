import { useEffect, useState } from "react";
import styled from "styled-components";
import debounce from 'lodash/debounce'
import { useNavigate } from "react-router-dom";
import products from "/src/assets/products.json";
import { useCart } from "./CartContext";

const ShopContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin: 10px;
    padding: 10px;
`
const CardDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 22vw;
    font-size: 0.8vw;
    margin: 10px;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        cursor: pointer;
    };
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.2);
`
const CardContentDiv = styled.div`
    padding: 10px; 
    z-index: 100;
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
`
const CardHeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`
const PriceElement = styled.p`
    margin-left: auto;
`
const ImageContainer = styled.div`
    position: relative;
    height: min(30vh, 20vw);
`
const AddToCart = styled.a`
    position: absolute;
    width: 2.5vw;
    height: 2.5vw;
    top: calc(100% - (2.8vw));
    right: 0.7vw;
    z-index: 200;

`
const Image = styled.img`
    width: 100%;
    height: auto;
    &:hover {
        transform: scale(2);
    }
`
const CartImage = styled.img`
    border-radius: 50%;
    background-color: white;
    box-shadow: ${(props) => props.disabled ? "none" : "rgba(0, 0, 0, 0.16) 0px 1px 4px;"};
    width: 100%;
    height: 100%;
    padding: 0.3vw;
    transition: 0.3s ease;
    pointer-events:${(props)=>props.disabled?'none':null};
    &:hover {
        box-shadow: none;
        transform: scale(1.05);
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
`



export default function Shop() {

    const [storeData, setStoreData] = useState([]);
    const [offset, setOffset] = useState(0);
    const cart = useCart();
    
    const fetchData = () => {
        
        const data = async () => {
            
            
            const temp = [];
            for (let i = offset; i < offset + 9; i++) {
                temp.push({...products[i], quantity: 1});
            }

            setStoreData((prevData) => prevData.length === 0 ? temp : [...prevData, ...temp]);
                
        };

        data();
    }

    const handleOffset = () => {
        
        setOffset((prevOffset) => {
            const newOffset = prevOffset + 9;
            
            if (newOffset >= 36) return prevOffset;
            return newOffset;
        });
    }
    
    
    useEffect(() => {
        
        const handleScroll = debounce(() => { 
            if (Math.ceil(window.innerHeight + window.scrollY + 1) >= document.documentElement.scrollHeight) { 
                handleOffset(); 
            } 
        }, 200);

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
        
    }, []);
    
    useEffect(() => {
        
        let ignore = false;
    
        if (!ignore) fetchData();
    
        return () => {
            ignore = true;
        };
    }, [offset]);
    

    

    return (
        <ShopContainer>
            {
                storeData.map((item, index) => {
                    
                    return <Card key={index} item={item} image={item.images[0]} imageHover={item.images[1]} cart={cart} />
                })
            }
        </ShopContainer>
    );
}



function Card({item, image, imageHover, cart}) {

    const [currImage, setCurrImage] = useState(image);

    const navigate = useNavigate();

    const setImage = (img) => {
        setCurrImage(img);
    }
    const handleClick = () => {
        navigate("/item", {state: {item: item}})
    }

    
    return (
        <CardDiv onMouseEnter={() => setImage(imageHover)} onMouseLeave={() => setImage(image)} onClick={handleClick}>
            <ImageContainer>
                <AddToCart onClick={(e) => {
                    e.stopPropagation();
                    cart.addToCart(item);
                }}>
                    {cart.cart[item.id] === undefined ? <CartImage disabled={false} src="/src/assets/cart.svg" alt="Add to Cart" /> : <CartImage disabled={true} src="/src/assets/in-cart.svg" alt="Item in Cart"/>}
                </AddToCart>
                <Image src={currImage} alt="#" />
            </ImageContainer>
            <CardContentDiv>
                <CardHeaderDiv>
                    <p>{item.title}</p>
                    <PriceElement>{item.price}$</PriceElement>
                </CardHeaderDiv>
                <div>
                    <p>{item.description}</p>
                </div>
            </CardContentDiv>
        </CardDiv>
    );

}