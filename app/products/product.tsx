"use client";

import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import { API_URL } from "../constants/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../components/loader";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(`/products/${product.id}`);
  };

  return (
    <>
      {loading && <Loader />}
      <CardActionArea onClick={handleClick}>
        <Card sx={{ height: 400 }}>
          <Stack gap={1}>
            {product.imageExists && (
              <CardMedia
                component="img"
                alt="Picture of the product"
                sx={{
                  height: 250,
                  objectFit: "cover"        // Đảm bảo hình ảnh không bị méo, cắt cho vừa khung
                }}
                image={`${API_URL}/images/products/${product.id}.jpg`}
              />
            )}
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  height: 70,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical"
                }}
              >
                {product.name}
              </Typography>
              <Typography>${product.price}</Typography>
            </CardContent>
          </Stack>
        </Card>
      </CardActionArea>
    </>
  );
}