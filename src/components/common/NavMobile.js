import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthenticated } from '../hooks/useAuthenticated'
import { AUTH } from '../lib/auth'

function NavMobile() {
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
    <>
      <Box sx={{ flexGrow: 1, direction: 'row', display: { xs: 'flex', md: 'none' } }}>
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
          <MenuList direction="row">
            <MenuItem onClick={handleCloseNavMenu}>
              <Link className='link small-screen-nav' to='/shop' >
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
                    fontSize: 14,
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  shop
                </Typography>
              </Link>
            </MenuItem>
            {isLoggedIn ? (
              <Box>
                <MenuItem>
                  <Link className='link small-screen-nav' to={`/basket/${userId}`}>
                    <Typography
                      variant="h6"
                      color="inherit"
                      component="div"
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.05rem',
                        fontSize: 14,
                        color: 'white',
                        alignItem: 'center'
                      }}
                    >
                      basket
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className='link' to='/' onClick={logout}>
                    <Typography
                      variant="h6"
                      color="inherit"
                      component="div"
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.05rem',
                        fontSize: 14,
                        color: 'white',
                        alignItem: 'center'
                      }}
                    >
                      logout
                    </Typography>
                  </Link>
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem>
                  <Link className='link small-screen-nav' to='/register' >
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
                        fontSize: 14,
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      register
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className='link small-screen-nav' to='/login' >
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
                        fontSize: 14,
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      login
                    </Typography>
                  </Link>
                </MenuItem>
              </Box>
            )}
          </MenuList>
        </Menu>

      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.05rem',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        Urban Footwear
      </Typography>
    </>
  )
}

export default NavMobile