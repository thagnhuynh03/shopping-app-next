import { Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";
import Grid from "@mui/material/Grid";
import Checkout from "@/app/checkout/checkout";

export default async function SingleProduct({ params }:  {params: Promise<{ productId: string }>}) {
  const { productId } = await params;

  const product = await getProduct(+productId);

  return (
    <Grid container marginBottom={"2rem"} rowGap={3}>
      {product.imageExists && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Image
            src={getProductImage(product.id)}
            width={0}
            height={0}
            className="w-full sm:w-3/4 h-auto"
            sizes="100vw"
            alt="Picture of the product"
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">${product.price}</Typography>
          <Checkout productId={product.id}/>
        </Stack>
      </Grid>
    </Grid>
  );
}