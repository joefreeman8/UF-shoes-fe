import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../lib/api";
import { AUTH } from "../lib/auth";

import { Box, TextField, Button, Container, Card, Typography } from '@mui/material'


import '../../styles/Login.scss'



export default function Login() {

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })
  const [error] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        // console.log(data)
        AUTH.setToken(data.token)
        navigate('/shop')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 500
      }}>
      <Card
        sx={{
          padding: 5
        }}
      >
        <Typography
          sx={{ mb: 2, fontSize: "16px" }}
        >
          Please complete the fields below to Login.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
          }}>
            <TextField
              size="small"
              label='Email'
              name='email'
              id='email'
              type='email'
              value={formFields.email}
              onChange={handleChange}
              error={error.email}
              sx={{ width: '80%', mb: 1.2 }}
            />
            <TextField
              size="small"
              label='Password'
              name='password'
              id='password'
              type='password'
              value={formFields.password}
              onChange={handleChange}
              error={error.password}
              sx={{ width: "80%", mb: 1.2 }}
            />
            <Button
              variant="contained"
              type='submit'
              sx={{ width: "80%", mt: 1.2 }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Typography
          sx={{ width: "100%", mt: 2, mb: -1 }}
        >
          Don't have an account? click <Link to={"/register"}>here</Link> to Register.
        </Typography>
      </Card>
    </Container >
  )
}