import React, { useContext } from "react";
import { PRODUCTS } from "../../products";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import BuyForm from "./Form";

const CartContainer = styled("div")({
  padding: "20px",
  maxWidth: "max-content",
  fontFamily: "Comfortaa, cursive",
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});
const EmpyyCartContainer = styled("div")({
  maxWidth: "max-content",
  flexDirection: "row",
  display: "flex",
  marginLeft: "27vw",
  flexWrap: "wrap",
  alignSelf: "start",
});

const Title = styled("h1")({
  textAlign: "center",
  marginBottom: "30px",
  fontFamily: "Comfortaa, cursive",
});

const Amount = styled("h3")({
  textAlign: "right",
  marginBottom: "20px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const ContinueShoppingButton = styled("button")({
  background: "#FFC371",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  maxHeight: 50,
  maxWidth: 200,
  alignSelf: "center",
  transition: "background 0.3s ease",
  "&:hover": {
    background: "#FF9A8B",
  },
});

const ProductsContainer = styled("div")({
  display: "grid",
  gap: "20px",
});

function Cart() {
  const { cartItems, totalCartAmount } = useContext(ShopContext);
  const totalAmount = totalCartAmount();
  const navigate = useNavigate();

  return (
    <>
      <Title>Ваша корзина</Title>
      <CartContainer className="content">
        {totalAmount > 0 ? (
          <>
            <ProductsContainer>
              {PRODUCTS.map((product) => {
                if (cartItems[product.id] !== 0) {
                  return <CartItem key={product.id} data={product} />;
                }
                return null;
              })}
              <div>
                <Amount>Сума: {totalAmount} грн</Amount>
                <ButtonContainer>
                  <ContinueShoppingButton onClick={() => navigate("/")}>
                    Продовжити покупку
                  </ContinueShoppingButton>
                </ButtonContainer>
              </div>
            </ProductsContainer>
            <div>
              <BuyForm />
            </div>
          </>
        ) : (
          <>
            <EmpyyCartContainer>
              <RemoveShoppingCartIcon style={{ fontSize: "30vh" }} />
              <ContinueShoppingButton onClick={() => navigate("/")}>
                Продовжити покупку
              </ContinueShoppingButton>
            </EmpyyCartContainer>
          </>
        )}
      </CartContainer>
    </>
  );
}

export default Cart;
