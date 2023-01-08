import { useState, useContext, useEffect } from "react";
import React from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Paper,
  Input,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ViewListIcon from "@mui/icons-material/ViewList";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Order from "./Order";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  const fetchOrdersData = () => {
    axios.get(`http://localhost:3001/orders`).then((res) => {
      const data = res.data;
      setOrders(data);
    });
  };

  useEffect(() => {
    console.log("Fetching data...");
    // fetchOrdersData();
    console.log(orders);
    setOrders([
      {
        order_status: "Deliverd",
        created_at: new Date().toUTCString(),
        products: [],
        user_id:
          "Q.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcGF1dGhyZWFj",
      },
    ]);
  }, []);

  const ordersShow = orders.map((order) => (
    <Grid item xs={3}>
      <Order order={order}></Order>
    </Grid>
  ));

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid>
        <Grid container spacing={4} sx={{ p: 1 }}>
          {ordersShow}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Orders;