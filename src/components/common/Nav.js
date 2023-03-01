import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link, useNavigate } from "react-router-dom"
import { useAuthenticated } from '../hooks/useAuthenticated';
import { AUTH } from '../lib/auth';
import NavMobile from './NavMobile'

import '../../styles/Nav.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
})


function Nav() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated()

  const { userId } = AUTH.getPayload()

  const logout = () => {
    AUTH.logout()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* MOBILE VIEW */}
            <NavMobile />
            {/* NON MOBILE VIEW */}
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link className='link' to='/shop'>
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
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' }
                      }}
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
                <Link className='link' to='/register'>
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
                <Link className='link' to='/login'>
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
    </ThemeProvider>
  )
}

export default Nav