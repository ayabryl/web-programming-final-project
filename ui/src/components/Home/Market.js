import { useState, useEffect, useContext, Fragment } from "react";
import {
  Grid,
  TablePagination,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import ProductCard from "./ProductCard";
import SearchContext from "../../contexts/SearchContext";
import SearchBar from "../Layout/SearchBar";
import TablePaginationActions from "../Layout/TablePaginationAction";


const Market = () => {
  const [products, setProducts] = useState([]);
  const [parsedProduct, setParsedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [orderBy, setOrderBy] = useState("Best");
  const [chipSelectd, setSelectedChip] = useState("all");
  const { searchWord } = useContext(SearchContext);
  const navigate = useNavigate();

  const toProductPage = (product) => {
    navigate("/product", { state: { product: product } });
  };

  const fetchData = () => {
    axios.get(`http://localhost:3001/products`).then((res) => {
      const data = res.data;
      setProducts(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let productsShow = products;
    if (searchWord !== "") {
      productsShow = products.filter(
        (pro) =>
          pro.name.includes(searchWord) ||
          pro.category.includes(searchWord) ||
          pro.description.includes(searchWord)
      );
    }

    switch (orderBy) {
      case "Low":
        productsShow = productsShow.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case "High":
        productsShow = productsShow.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      case "Name":
        productsShow = productsShow.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      default:
        break;
    }

    if (chipSelectd !== "all") {
      productsShow = productsShow.filter((pro) =>
        pro.brand.includes(chipSelectd)
      );
    }

    productsShow = productsShow.map((p) => (
      <Grid
        item
        xs={3}
        onClick={() => {
          toProductPage(p);
        }}
      >
        <ProductCard
          key={Math.random().toString()}
          product={p}
          adminPage={false}
        ></ProductCard>
      </Grid>
    ));
    setParsedProducts(productsShow);
  }, [searchWord, products, orderBy, chipSelectd]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOrderbyChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleChipClick = (val) => {
    setSelectedChip(val);
  };

  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid
        sx={{ mt: 3 }}
        display="flex"
        alignItems="center"
        direction="column"
      >
        <Grid item sx={12} direction="row" display="flex">
          <Grid item sx={8} width="100%">
            <SearchBar />
          </Grid>
          <Grid item sx={4}>
            <TextField
              value={orderBy}
              onChange={handleOrderbyChange}
              variant="outlined"
              select
              size="small"
              label="Order by"
              fullWidth

            >
              <MenuItem value="Best">Best Match</MenuItem>
              <MenuItem value="Low">Price Low to High</MenuItem>
              <MenuItem value="High">Price High to Low</MenuItem>
              <MenuItem value="Name">A-Z</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid
          sx={{ mt: 3 }}
          item
          container
          diaply="flex"
          justifyContent="center"
        >
          <Stack direction="row" spacing={1}>
            <Chip
              color="primary"
              label="Revlon"
              onClick={() => handleChipClick("revlon")}
            />
            <Chip
              color="primary"
              label="Maybelline"
              onClick={() => handleChipClick("maybelline")}
            />
            <Chip
              color="primary"
              label="NYX"
              onClick={() => handleChipClick("nyx")}
            />
            <Chip
              color="primary"
              label="All"
              onClick={() => handleChipClick("all")}
            />
          </Stack>
        </Grid>
        <Grid item container spacing={4} sx={{ p: 3 }}>
          {rowsPerPage > 0
            ? parsedProduct.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : parsedProduct}
        </Grid>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        flex-direction="column-reverse"
        alignItems="stretch"
        container
        sx={{ position: "relative", bottom: 0 }}
      >
        <TablePagination
          rowsPerPageOptions={[12, 32, 48, { label: "All", value: -1 }]}
          colSpan={3}
          count={parsedProduct.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "products per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Grid>
    </Fragment>
  );
};
export default Market;
