import React from "react";
import { PRODUCTS } from "../../products";
import Product from "./Product";
import Grid from "@mui/material/Grid";
import Slider from "./Slider";

function Shop() {
  return (
    <div>
      <Slider />
      <Grid container spacing={2} className="content">
        {PRODUCTS.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product data={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Shop;
