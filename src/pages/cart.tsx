import Layout from "@components/Layout";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Store } from "@utils/Store";
import { useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { DispatchStorePayloadType } from "@utils/types";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSnackbar } from "notistack";

function CartScreen() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (
    item: DispatchStorePayloadType,
    quantity: number
  ) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar("Lo siento, El producto no se encuentra en stock", {
        variant: "error",
      });
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: item?._key as string,
        name: item?.name as string,
        countInStock: item?.countInStock as number,
        slug: item?.slug as unknown as string,
        price: item?.price as number,
        image: item?.image as string,
        quantity,
      },
    });

    enqueueSnackbar(`${item?.name} se ha añadido al carrito`, {
      variant: "success",
    });
  };

  const removeItemHandler = async (item: DispatchStorePayloadType) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Carrito de compras
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          <Typography>
            El carrito se encuentra vacio.{"  "}
            <NextLink href="/" passHref>
              <Link>Ir a comprar</Link>
            </NextLink>
          </Typography>
        </Box>
      ) : (
        <Grid container>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._key}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>${item.price}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal (
                    {cartItems.reduce(
                      (a: number, c: DispatchStorePayloadType): number =>
                        a + c.quantity,
                      0
                    )}{" "}
                    items) : ${" "}
                    {cartItems.reduce(
                      (a: number, c: DispatchStorePayloadType): number =>
                        a + c.quantity * c.price,
                      0
                    )}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button fullWidth color="primary" variant="contained">
                    Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
