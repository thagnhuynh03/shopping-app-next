"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../auth/auth-context";
import { MouseEvent, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { routes, unauthenticatedRoutes } from "../constants/routes";
import { useRouter } from "next/navigation";
import Loader from "./loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { getCarts } from "../cart/get-carts";
import { notoSerif } from "../constants/fonts";

interface HeaderProps {
  logout: () => Promise<void>;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Header({ logout }: HeaderProps) {
  const isAuthenticated = useContext(AuthContext);
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchCartCount() {
      try {
        const data = await getCarts();
        setCartCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setCartCount(0);
      }
    }
    fetchCartCount();
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = isAuthenticated ? routes : unauthenticatedRoutes;

  return (
    <AppBar position="static" className="!bg-transparent !shadow-none border-b !border-b-[#f1edea]">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBasketIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            className="!text-[#181510] dark:!text-[#ffffff]"
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            className="!text-[#181510] dark:!text-[#ffffff]"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: notoSerif.style.fontFamily,
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            Shoppy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              className="!text-[#181510] dark:!text-[#ffffff]"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    router.push(page.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingBasketIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            className="!text-[#181510] dark:!text-[#ffffff]"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            className="!text-[#181510] dark:!text-[#ffffff]"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: notoSerif.style.fontFamily,
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            Shoppy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  router.push(page.path);
                  handleCloseNavMenu();
                }}
                className="!text-[#181510] dark:!text-[#ffffff]"
                sx={{ my: 2, display: "block", 
                  fontWeight: 500,       // tương đương font-medium
                  fontSize: "0.875rem",  // tương đương text-sm
                  fontFamily: notoSerif.style.fontFamily, // nếu dùng custom font
                 }}
                 
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, mr: 2 }}>
            {isAuthenticated && (
              <IconButton aria-label="cart" color="inherit" component={Link} href="/cart" className="!text-[#181510] dark:!text-[#ffffff]">
                <StyledBadge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            )}
          </Box>
          {isAuthenticated && <Settings logout={logout} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const Settings = ({ logout }: HeaderProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {loading && <Loader />}
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          key="Order"
          onClick={() => {
            handleCloseUserMenu();
            router.push("/order");
          }}
        >
          <Typography textAlign="center">Order</Typography>
        </MenuItem>
        <MenuItem
          key="Logout"
          onClick={async () => {
            setLoading(true);
            await logout();
            setLoading(false);
            handleCloseUserMenu();
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
