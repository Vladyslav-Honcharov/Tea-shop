import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ShopContext } from "../../context/ShopContext";

const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundImage: "linear-gradient(to right, #FFC371, #FF5F6D)",
  color: theme.palette.common.white,
  margin: 10,
  "&:hover": {
    backgroundImage: "linear-gradient(to right, #FF9A8B, #FF6A88)",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomTypography = styled(Typography)`
  font-family: "Comfortaa", cursive;
`;

const CustomCardContent = styled(CardContent)`
  font-family: "Didact Gothic", sans-serif;
`;

function Product(props) {
  const { id, productName, price, image, discription } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const storedIsFavorite = localStorage.getItem(`isFavorite_${id}`);
    return storedIsFavorite ? JSON.parse(storedIsFavorite) : false;
  });

  useEffect(() => {
    localStorage.setItem(`isFavorite_${id}`, JSON.stringify(isFavorite));
  }, [id, isFavorite]);

  const cartItemAmount = cartItems[id];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card sx={{ maxWidth: 500, minHeight: 380 }}>
      <CardMedia component="img" height="194" image={image} alt={productName} />
      <CustomCardContent>
        <CustomTypography variant="body2" color="text.main">
          {productName}
        </CustomTypography>
        <CustomTypography variant="body2" color="text.secondary">
          {price} грн / 50грам
        </CustomTypography>
        <AddToCartButton
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={() => addToCart(id)}
        >
          Додати в кошик {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </AddToCartButton>
      </CustomCardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          color={isFavorite ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CustomCardContent>
          <CustomTypography paragraph variant="h5">
            Опис чаю:
          </CustomTypography>
          <CustomTypography paragraph>{discription}</CustomTypography>
        </CustomCardContent>
      </Collapse>
    </Card>
  );
}

export default Product;
