"use client";

import { alpha, InputBase, Stack, styled, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState, useEffect, useTransition } from "react";
import Loader from "../components/loader";

export default function SearchFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const min = Number(searchParams.get("minPrice")) || 0;
  const max = Number(searchParams.get("maxPrice")) || 1000;

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPriceRange([min, max]);
    setMounted(true);
  }, [min, max]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const range = newValue as number[];
    setPriceRange(range);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("minPrice", range[0].toString());
    params.set("maxPrice", range[1].toString());

    if (searchParams.get("query")) {
      params.set("query", searchParams.get("query")!);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 3,
        height: "400",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </Search>
      <Box sx={{ width: 300, ml: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', mr: 1 }}>
          Price(${priceRange[0]} - ${priceRange[1]})
        </Typography>
        {mounted && (
          <Slider
            getAriaLabel={() => 'Price range'}
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={300}
            step={10}
          />
        )}
        {isPending && <Loader />}
      </Box>
    </Stack>
  );
}

// ---------- Styled components ----------
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function valuetext(value: number) {
  return `$${value}`;
}
