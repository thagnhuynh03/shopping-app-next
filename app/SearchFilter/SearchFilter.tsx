  "use client";

  import { alpha, InputBase, Stack, styled } from "@mui/material";
  import SearchIcon from '@mui/icons-material/Search';
  import { usePathname, useSearchParams, useRouter } from "next/navigation";
  import { useDebouncedCallback } from 'use-debounce';

  export default function SearchFilter(){

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if(term){
        params.set('query', term);
      }
      else{
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
      return (
          <Stack 
              direction="row"
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
          </Stack>
      );
  }

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
        // vertical padding + font size from searchIcon
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