"use client";

import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import { API_URL } from "../constants/api";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card>
            <Stack gap={1}>
              { product.imageExists && (
                  <CardMedia
                  component="img"
                  alt= "Picture of the product"
                  sx={{
                    height: 300,
                    objectFit: "cover"        // Đảm bảo hình ảnh không bị méo, cắt cho vừa khung
                  }}
                
                  image={`${API_URL}/images/products/${product.id}.jpeg`} />
              )}
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{
                    height: 100,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
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
    
  );
}