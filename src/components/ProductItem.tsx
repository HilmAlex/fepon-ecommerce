import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { urlForThumbnail } from "@utils/image";
import { productProps } from "@utils/types";
import NextLink from "next/link";
import React from "react";

export default function ProductItem({ product}: {product: productProps}){
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image)}
            title={product.name}
          />
          <CardContent>
            <Typography>{product.name}</Typography>
            <Typography>
              {product.rating} ({product.numReviews} reviews)
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
