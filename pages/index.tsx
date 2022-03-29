import { Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
