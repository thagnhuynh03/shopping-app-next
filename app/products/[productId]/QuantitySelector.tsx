"use client";
import { useState } from "react";
import { IconButton, Box, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantitySelectorProps {
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export default function QuantitySelector({ max = 99, value, onChange }: QuantitySelectorProps) {
  const [internalQuantity, setInternalQuantity] = useState(1);
  const quantity = value !== undefined ? value : internalQuantity;

  const setQuantity = (val: number) => {
    if (onChange) onChange(val);
    else setInternalQuantity(val);
  };

  const handleIncrement = () => {
    setQuantity(Math.min(max, quantity + 1));
  };

  const handleDecrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  return (
    <Box display="inline-flex" alignItems='center' border={1} borderColor="divider" borderRadius={1}>
      <IconButton size="small" onClick={handleDecrement} sx={{ width: 32, height: 39, borderRadius: 0 }}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <TextField
        value={quantity}
        onChange={handleInputChange}
        size="small"
        sx={{
            width: 50,
          '& .MuiOutlinedInput-root': {
            border: 'none',
            borderRadius: 0,
            textAlign: 'center',
          },
          '& .MuiOutlinedInput-input': {
            textAlign: 'center',
          },
        }}
        slotProps={{ htmlInput: { min: 1, style: { textAlign: 'center' }} }}
      />
      <IconButton size="small" sx={{ width: 32, height: 39, borderRadius: 0 }} onClick={handleIncrement}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
} 