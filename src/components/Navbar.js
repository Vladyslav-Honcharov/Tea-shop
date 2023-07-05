import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function Navbar() {
  return (
    <Box>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 3 }}>
            <Link to="/" className="logo">
              <img
                src="https://png.pngtree.com/png-vector/20230213/ourmid/pngtree-tea-shop-logo-deisgn-png-image_6595438.png"
                alt=""
                className="logo"
              />{" "}
              <h2>Tea for soul</h2>
            </Link>
          </Typography>
          <Link to="/cart" className="cart">
            CART <ShoppingBagIcon />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
