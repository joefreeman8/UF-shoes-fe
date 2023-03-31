import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { API } from "../lib/api"
import { AUTH } from '../lib/auth'

import { Container, Box, TextField, Button, Card, Typography } from '@mui/material'

import '../../styles/Register.scss'


export default function Register() {
  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [error] = useState(false)

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.POST(API.ENDPOINTS.register, formFields)
      const loginData = await API.POST(
        API.ENDPOINTS.login,
        {
          email: formFields.email,
          password: formFields.password
        }
      )
      AUTH.setToken(loginData.data.token)
      navigate('/shop')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 500,
      }}>
      <Card
        sx={{
          padding: 5
        }}
      >
        <Typography
          sx={{ mb: 2, fontSize: "16px" }}
        >
          Please complete the fields below to Register.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              size="small"
              label='Username'
              name='username'
              id='username'
              type='username'
              required={true}
              value={formFields.username}
              onChange={handleChange}
              error={error.username}
              sx={{ width: "100%", mb: 1.2 }}
            />
          </Box>
          <Box>
            <TextField
              size="small"
              label='Email'
              name='email'
              id='email'
              type='email'
              required={true}
              value={formFields.email}
              onChange={handleChange}
              error={error.email}
              sx={{ width: "100%", mb: 1.2 }}
            />
          </Box>
          <Box>
            <TextField
              size="small"
              label='Password'
              name='password'
              id='password'
              type='password'
              required={true}
              value={formFields.password}
              onChange={handleChange}
              error={error.password}
              sx={{ width: "100%", mb: 1.2 }}
            />
          </Box>
          <Box>
            <TextField
              size="small"
              label='Password Confirmation'
              name='passwordConfirmation'
              id='passwordConfirmation'
              type='password'
              required={true}
              value={formFields.passwordConfirmation}
              onChange={handleChange}
              error={error.passwordConfirmation}
              sx={{ width: "100%", mb: 1.2 }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
            <Button variant="contained" type='submit'
              sx={{ width: "100%", mt: 1.2 }}>
              CREATE ACCOUNT</Button>
          </Box>
        </form>
        <Typography
          sx={{ width: "100%", mt: 2, mb: -1 }}
        >
          Already have an account? click <Link to={"/login"}>here</Link> to Login
        </Typography>
      </Card>
    </Container>
  )
}