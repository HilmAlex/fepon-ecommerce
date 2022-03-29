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
import { productScreenProps } from "@utils/types";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { urlFor } from "@utils/image";

export default function ProductScreen(props) {
  const { slug } = props;

  const [state, setState] = useState<productScreenProps>({
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

  return (
    <Layout title={product?.title}>
      {loading && <CircularProgress />}
      {error && !loading && <Alert variant="error">{error}</Alert>}
      {!error && !loading && (
        <Box>
          <Box sx={classes.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>back to result</Typography>
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
                <ListItem>Category: {product?.category}</ListItem>
                <ListItem>Brand: {product?.brand}</ListItem>
                <ListItem>
                  <Rating value={product?.rating} readOnly></Rating>
                  <Typography sx={classes.smallText}>
                    ({product?.numReviews} reviews)
                  </Typography>
                </ListItem>
                <ListItem>Description: {product?.description}</ListItem>
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
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product?.countInStock > 0
                            ? "In Stock"
                            : "Unavailable"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained">
                      Add to cart
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
