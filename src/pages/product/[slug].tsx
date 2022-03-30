import Layout from "@components/Layout";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import classes from "@utils/classes";
import client from "@utils/client";
import { imageProductProps, productScreenStateType, slugProductProps } from "@utils/types";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { urlFor, urlForThumbnail } from "@utils/image";
import { Store } from "@utils/Store";
import axios from "axios";
import { useSnackbar } from "notistack";

export interface productScreenProps {
  slug: string;
}

export default function ProductScreen(props: productScreenProps) {
  const { slug } = props;
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState<productScreenStateType>({
    product: null,
    loading: true,
    error: "",
  });

  const { product, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug] [0]`;
        const params = { slug };
        const product = await client.fetch(query, params);

        setState({ ...state, product, loading: false });
      } catch (error) {
        setState({ ...state, error: (error as Error).message, loading: false });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar("Lo siento, El producto no se encuentra en stock", {
        variant: "error",
      });
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product?._id as string,
        name: product?.name as string,
        countInStock: product?.countInStock as number,
        slug: product?.slug as unknown as string,
        price: product?.price as number,
        image: urlForThumbnail(product?.image as imageProductProps),
        quantity,
      },
    });
    enqueueSnackbar(`${product?.name} se ha añadido al carrito`, {variant:'success'})
  };

  return (
    <Layout title={product?.title}>
      {loading && <CircularProgress />}
      {error && !loading && <Alert variant="error">{error}</Alert>}
      {!error && !loading && (
        <Box>
          <Box sx={classes.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Regresar</Typography>
              </Link>
            </NextLink>
          </Box>

          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product?.image)}
                alt={product?.name}
                layout="responsive"
                width={640}
                height={640}
              ></Image>
            </Grid>

            <Grid md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product?.name}
                  </Typography>
                </ListItem>
                <ListItem>Categoria: {product?.category}</ListItem>
                <ListItem>Marca: {product?.brand}</ListItem>
                <ListItem>
                  <Rating value={product?.rating} readOnly></Rating>
                  <Typography sx={classes.smallText}>
                    ({product?.numReviews} reseñas)
                  </Typography>
                </ListItem>
                <ListItem>Descripción: {product?.description}</ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${product?.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Estado</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product?.countInStock > 0
                            ? "En Stock"
                            : "No disponible"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={addToCartHandler}
                      fullWidth
                      variant="contained"
                    >
                      Añadir al carrito
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
