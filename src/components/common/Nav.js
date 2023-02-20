import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { useAuthenticated } from '../hooks/useAuthenticated';
import '../../styles/Nav.scss'
import { AUTH } from '../lib/auth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function Nav() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated()

  const { userId } = AUTH.getPayload()

  const logout = () => {
    AUTH.logout()
    setIsLoggedIn(false)
    navigate('/')
  }
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link className='link' to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 4,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.05rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                U.F.
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="white"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className='link' to='/shop' >
                    <Typography
                      textAlign="center"
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.05rem',
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      shop
                    </Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              LOGO WHEN SMALL
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link className='link' to='/shop' >
                <Typography
                  onClick={handleCloseNavMenu}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.05rem',
                    color: 'white',
                  }}
                >
                  shop
                </Typography>
              </Link>

            </Box>
            {isLoggedIn ? (
              <>
                <Box>
                  <Link className='link' to={`/basket/${userId}`}>
                    <IconButton
                      aria-label="add to shopping cart"
                      sx={{ mr: 2 }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </Link>
                </Box>
                <Box>
                  <Link className='link' to='/' onClick={logout}>
                    <Typography
                      variant="h6"
                      color="inherit"
                      component="div"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.05rem',
                        color: 'white',
                        alignItem: 'center'
                      }}
                    >
                      logout
                    </Typography>
                  </Link>
                </Box>
              </>
            ) : (
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Link className='link' to='/register' >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.05rem',
                      color: 'white',
                      alignItem: 'center'
                    }}
                  >
                    register
                  </Typography>
                </Link>
                <Link className='link' to='/login' >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.05rem',
                      color: 'white',
                      alignItem: 'center'
                    }}
                  >
                    login
                  </Typography>
                </Link>
              </Box>
            )
            }
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider >
  );
}

export default Nav