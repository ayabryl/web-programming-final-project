import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material/";
import toast, { Toaster } from "react-hot-toast";
import { StyledButtonContained, theme } from "../../theme";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: "",
    name: "",
    brand: "",
    productLink: "",
    description: "",
    category: "",
    productType: "",
    imageLink: "",
    productColors: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [productColors, setProductColors] = useState([
    { hexValue: "", colorName: "" },
  ]);

  const handleAddColor = () => {
    setProductColors([...productColors, { hexValue: "", colorName: "" }]);
  };

  const handleRemoveColor = (index) => {
    setProductColors(productColors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index, event) => {
    const values = [...productColors];
    values[index][event.target.name] = event.target.value;
    setProductColors(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit form data to server

    const body = {
      price: formData.price,
      name: formData.name,
      brand: formData.brand,
      productLink: formData.productLink,
      description: formData.description,
      category: formData.category,
      productType: formData.productType,
      imageLink: formData.imageLink,
      productColors: productColors,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // Save the new product in db
    fetch("http://localhost:3001/addProduct", requestOptions)
      .then((response) => {
        console.log(response);
        toast.success("The product successfuly added");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Grid item xs={8}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <Grid
              sx={{ m: 2 }}
              container
              spacing={1}
              align="center"
              justifyContent="center"
            >
              <Grid item xs={4}>
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  fullWidth="100%"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  fullWidth="100%"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Brand"
                  type="text"
                  fullWidth="100%"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Product Link"
                  type="text"
                  fullWidth="100%"
                  name="productLink"
                  value={formData.productLink}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Description"
                  type="text"
                  fullWidth="100%"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Category"
                  type="text"
                  fullWidth="100%"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Image link"
                  type="text"
                  fullWidth="100%"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}></Grid>

              <FormControl>
                <Grid
                  item
                  xs={12}
                  container
                  align="center"
                  justifyContent="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        color: "primary.dark",
                        fontWeight: "bold",
                        mt: 1,
                      }}
                    >
                      Product Colors:{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    spcing={1}
                    align="center"
                    justifyContent="center"
                  >
                    {productColors.map((color, index) => (
                      <div key={index}>
                        <Grid
                          item
                          xs={12}
                          container
                          align="center"
                          justifyContent="center"
                        >
                          <Grid item xs={3} sx={{ mr: 1.5 }}>
                            <FormControl>
                              <InputLabel htmlFor={`hex_value-${index}`}>
                                Hex Value
                              </InputLabel>
                              <Input
                                id={`hex_value-${index}`}
                                name="hexValue"
                                type="text"
                                value={color.hexValue}
                                onChange={(event) =>
                                  handleColorChange(index, event)
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={3} sx={{ mr: 0.5 }}>
                            <FormControl>
                              <InputLabel htmlFor={`color_name-${index}`}>
                                Color Name
                              </InputLabel>
                              <Input
                                id={`color_name-${index}`}
                                name="colorName"
                                type="text"
                                value={color.colorName}
                                onChange={(event) =>
                                  handleColorChange(index, event)
                                }
                              />
                            </FormControl>
                          </Grid>

                          <Button
                            sx={{
                              color: "secondary.light",
                              "&:hover": { color: "primary.main" },
                            }}
                            onClick={() => handleRemoveColor(index)}
                            size="small"
                          >
                            Remove Color
                          </Button>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                  <Grid item sx={12}>
                    <Button
                      sx={{
                        color: "primary.dark",
                        "&:hover": { color: "primary.main" },
                        mt: 1,
                      }}
                      onClick={handleAddColor}
                    >
                      Add Another Color
                    </Button>
                  </Grid>
                </Grid>
                <Grid item sx={12}>
                  <StyledButtonContained
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handleSubmit}
                  >
                    Add Product
                  </StyledButtonContained>
                </Grid>
              </FormControl>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};
export default AddProductForm;
