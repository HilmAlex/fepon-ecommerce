import { Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>FEPON Store</title>
        <meta
          name="description"
          content="Tienda digital de la Federación de Estudiantes de Escuela Politécnica Nacional FEPON"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography component="h1" variant="h1">
        Tienda FEPON
      </Typography>
    </Layout>
  );
};

export default Home;
