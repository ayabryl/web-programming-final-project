import { ListItem, Typography, List, Button, Card, Grid } from "@mui/material";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductInCart from "./ProductInCart";
import { LoginContext } from "../../contexts/LoginContext";
import { Box } from "@mui/system";

const Cart = (props) => {
  const { email, idToken, login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const toProductPage = (productId) => {
    const product = cart.find((p) => p.id === productId);
    navigate("/product", { state: { product: product } });
  };

  const products = cart?.map((p) => (
    <Grid item xs={12} key={Math.random().toString()}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <ProductInCart
          toProductPage={toProductPage}
          handleRemoveFromCart={handleRemoveFromCart}
          key={Math.random().toString()}
          name={p.name}
          category={p.category}
          price={p.price}
          imageURL={p.image_link}
          id={p.id}
        ></ProductInCart>
      </Box>
    </Grid>
  ));

  const getTotal = cart.length
    ? cart.map((p) => p.price).reduce((prev, next) => prev + next)
    : 0;

  const handleOrder = () => {
    //todo: add option to chose amount
    const products = cart.map((product) => ({
      product_name: product.name,
      price: product.price,
      color: product.product_colors[0],
      amount: product.amount,
    }));
    const order = {
      products: products,
      created_at: new Date(),
      user_id: idToken,
      status: "New order",
      total_price: getTotal,
    };
    props.handleOrder(order);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "50px",
        }}
      >
        <Typography sx={{ marginTop: "50px" }} variant="h5">
          My Basket
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Grid sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {products}
            </Grid>
          </Grid>
        </Box>
        <Typography sx={{ marginTop: "50px" }}>
          Estimated Total: {getTotal}
        </Typography>
        <Button
          size="large"
          onClick={handleOrder}
          sx={{
            height: "50px",
            width: "50px",
            color: "white",
            backgroundColor: "black",
            ":hover": {
              bgcolor: "grey",
              color: "white",
            },
          }}
        >
          Order
        </Button>
      </Box>
    </div>
  );
};

export default Cart;