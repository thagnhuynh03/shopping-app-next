"use client";
import { Box, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const paymentMethods = [
    { id: 1, name: "Online" },
    { id: 2, name: "COD" }
  ];

export default function PaymentSelector({ value, onChange }: { value: number, onChange: (val: number) => void }) {
  return (
    <Box>
      <FormLabel>Thanh toán</FormLabel>
      <RadioGroup
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      >
        {paymentMethods.map(pm => (
          <FormControlLabel key={pm.id} value={pm.id} control={<Radio />} label={pm.name} />
        ))}
      </RadioGroup>
    </Box>
  );
}