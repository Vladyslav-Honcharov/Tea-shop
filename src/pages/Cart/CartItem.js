import React, { useContext } from "react";

import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { ShopContext } from "../../context/ShopContext";

const CartItemContainer = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  alignItems: "flex-start",
}));

const ProductName = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "Comfortaa",
});

const Price = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: "Didact Gothic",
}));

const QuantityContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const QuantityButton = styled("button")(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  border: "none",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  cursor: "pointer",
  transition: "background 0.3s ease",
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

const QuantityInput = styled("input")(({ theme }) => ({
  width: "40px",
  padding: theme.spacing(0.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
}));

export default function CartItem(props) {
  const { id, productName, price, image } = props.data;
  const { addToCart, cartItems, removeToCart, updateCartItems } =
    useContext(ShopContext);

  return (
    <>
      {" "}
      <CartItemContainer alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={image} alt={productName} />
        </ListItemAvatar>
        <ListItemText
          primary={<ProductName>{productName}</ProductName>}
          secondary={
            <React.Fragment>
              <Price>Ціна: {price} грн / 50 грам</Price>
            </React.Fragment>
          }
        />
        <QuantityContainer>
          <QuantityButton onClick={() => removeToCart(id)}>-</QuantityButton>
          <QuantityInput
            value={cartItems[id]}
            onChange={(e) => updateCartItems(Number(e.target.value), id)}
          />
          <QuantityButton onClick={() => addToCart(id)}>+</QuantityButton>
        </QuantityContainer>
      </CartItemContainer>
      <Divider variant="inset" />
    </>
  );
}
