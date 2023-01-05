import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api";
import { AUTH } from "../lib/auth";

import { Box, TextField, Button, Container } from '@mui/material'

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
    <Container className='Login'
      maxWidth='lg'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
      }}>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{ m: 0, width: '25ch' }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            className='formFields'
            label='Email'
            name='email'
            id='email'
            type='email'
            value={formFields.email}
            onChange={handleChange}
            error={error.email}
            sx={{ mb: 1 }}
          />
          <TextField
            className='formFields'
            label='Password'
            name='password'
            id='password'
            type='password'
            value={formFields.password}
            onChange={handleChange}
            error={error.password}
            sx={{ mb: 1 }}
          />
        </div>
        <Button
          variant="contained"
          type='submit'
          sx={{ pr: 7, pl: 7 }}
        >
          Login
        </Button>
      </Box>
    </Container >
  )
}