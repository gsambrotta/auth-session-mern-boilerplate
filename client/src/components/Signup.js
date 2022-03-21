import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  Paper,
  Container,
  Link,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
  Typography,
  TextField,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from '@mui/material'
import {
  Face as FaceIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import theme from '../styles/theme'

function Signup({}) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleShowPassword = (showPasswordField) => {
    setValues({
      ...values,
      [showPasswordField]: !values[showPasswordField],
    })
  }

  return (
    <>
      <Container sx={{ marginTop: 'calc(100vh - 45%)' }} maxWidth='sm'>
        <Paper elevation={6}>
          <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: '0px 0px 8px rgba(131,153,167,0.99)',
              }}>
              <FaceIcon sx={{ fontSize: 70 }} />
            </Avatar>
            <h2>Register a new account</h2>
          </Container>
          <Stack
            component='form'
            spacing={6}
            sx={{ bgcolor: '#f5f5f6', padding: '40px' }}>
            <TextField
              variant='filled'
              type='email'
              label='Email'
              onChange={handleChange('email')}
              // error={errorState}
            />

            <FormControl variant='filled'>
              <InputLabel htmlFor='password-field'>Password</InputLabel>
              <FilledInput
                id='password-field'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => handleShowPassword('showPassword')}
                      edge='end'>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant='filled'>
              <InputLabel htmlFor='password-repeat-field'>
                Repeat password
              </InputLabel>
              <FilledInput
                id='password-repeat-field'
                type={values.showRepeatPassword ? 'text' : 'password'}
                value={values.repeatPassword}
                onChange={handleChange('repeatPassword')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => handleShowPassword('showRepeatPassword')}
                      edge='end'>
                      {values.showRepeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                variant='contained'
                size='large'
                sx={{
                  minWidth: '70%',
                }}>
                Sign me up!
              </Button>
            </Box>
            <Divider />
            <Typography paragraph align='center'>
              Already have an account?{' '}
              <Link component={RouterLink} to='/'>
                Login here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default Signup
