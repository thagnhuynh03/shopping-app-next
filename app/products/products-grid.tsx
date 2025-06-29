"use client";

import Grid from "@mui/material/Grid";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/get-authentication";
import { Typography, Box } from "@mui/material";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL!,
        {
          auth: {
            Authentication: await getAuthentication(),
          },
        }
      );

      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);


  return (
    <>
      {products?.length > 0 ? (
        <Grid container spacing={3} >
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
        </Box>
      )}
    </>
  );
}