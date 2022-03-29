import { Alert, CircularProgress, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Layout from "@components/Layout";
import { useEffect, useState } from "react";
import client from "@utils/client";
import { dataProps } from "@utils/types";
import ProductItem from "@components/ProductItem";

const Home: NextPage = () => {
  const [data, setData] = useState<dataProps>({
    products: [],
    error: "",
    loading: true,
  });

  const { loading, error, products } = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setData({ products, loading: false });
      } catch (err) {
        setData({ error: (err as Error).message, loading: false });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {loading && <CircularProgress />}

      {error && !loading && <Alert variant="danger">{error}</Alert>}

      {!error && !loading && (
        <Grid container spacing={3}>
          {products?.map((product) => (
            <Grid item md={4} key={product.slug.current}>
              <ProductItem product={product}></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
