"use client";
import { useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material";

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <Box boxShadow={1} display="flex" flexDirection="column" alignItems="center">
      <Image
        src={images[selected]}
        width={400}
        height={400}
        style={{ objectFit: "contain", background: '#fff' }}
        className="w-full sm:w-3/4 h-auto"
        sizes="100vw"
        alt="Picture of the product"
      />
      {/* Thumbnails */}
      <Box display="flex" gap={1} mt={2}>
        {images.map((img, idx) => (
          <Box
            key={idx}
            border={2}
            borderColor={selected === idx ? "primary.main" : "#eee"}
            borderRadius={1}
            p={0.5}
            sx={{ cursor: "pointer", opacity: selected === idx ? 1 : 0.7 }}
            onClick={() => setSelected(idx)}
          >
            <Image src={img} width={60} height={60} alt={`Thumbnail ${idx+1}`} style={{ objectFit: "cover", borderRadius: 4 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
} 