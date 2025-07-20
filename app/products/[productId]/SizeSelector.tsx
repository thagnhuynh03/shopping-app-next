"use client";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

interface SizeSelectorProps {
  sizes: string[];
  selected: string | null;
  onChange: (value: string | null) => void;
  disabledSizes?: string[];
}

export default function SizeSelector({ sizes, selected, onChange, disabledSizes = [] }: SizeSelectorProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={selected}
      onChange={(_, value) => onChange(value === selected ? null : value)}
      sx={{ display: 'flex', gap: 2 }}
    >
      {sizes.map(size => (
        <ToggleButton
          key={size}
          value={size}
          disabled={disabledSizes.includes(size)}
          sx={{
            minWidth: 30,
            fontWeight: 'bold',
            transition: 'background 0.2s, color 0.2s, filter 0.2s',
            filter: disabledSizes.includes(size) ? 'brightness(50%) contrast(80%)' : 'none',
            '&.Mui-selected': {
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #181510',
              boxShadow: 2,
            },
            '&:not(.Mui-selected)': {
              backgroundColor: 'background.paper',
              color: 'text.primary',
            },
          }}
        >
          {size}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
} 