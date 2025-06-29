"use client";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

interface ColorSelectorProps {
  colors: { id: number; name: string }[];
  onChange?: (colorId: number | null) => void;
}

export default function ColorSelector({ colors, onChange }: ColorSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleChange = (_: React.MouseEvent<HTMLElement>, value: number | null) => {
    setSelected(value === selected ? null : value);
    if (onChange) onChange(value === selected ? null : value);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={selected}
      onChange={handleChange}
      sx={{ gap: 2 }}
    >
      {colors.map(color => (
        <ToggleButton
          key={color.id}
          value={color.id}
          sx={{
            minWidth: 40,
            fontWeight: 'bold',
            '&.Mui-selected': {
              backgroundColor: 'white',
              color: 'black',
              boxShadow: 2,
            },
            '&:not(.Mui-selected)': {
              backgroundColor: 'background.paper',
              color: 'text.primary',
            },
          }}
        >
          {color.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
} 