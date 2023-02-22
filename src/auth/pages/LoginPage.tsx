import { Google } from '@mui/icons-material'
import { Grid, TextField, Button, Link, Alert } from '@mui/material'
import React from 'react'
import { Link as RouterLink, Navigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store/store'
import { AuthLayout } from '../layout/AuthLayout'
import { clearState } from '../../store/authSlice'
import { loginUserWithEmailPassword, startGoogleSingIn } from '../../store/thunks'
export const LoginPage = () => {

  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state: RootState) => state.auth);
  const isCheckingAuthentication = React.useMemo(() => status === 'checking', [status]);

  const { FormState, onInputChange, onReset, email, password } = useForm({
    email: 'chechomens@gmail.com',
    password: 'checho05'
  }, {});

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginUserWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  }

  const toRegister = () => {
    dispatch( clearState() );
  }

  return (
    <>
      <AuthLayout title='Iniciar sesión'>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
          <Grid container direction="column" spacing={'16px'}>
            <Grid item xs={12} md={12}>
              <TextField placeholder='Email' type={'email'} onChange={onInputChange} value={FormState.email} name="email" fullWidth autoFocus={true}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField placeholder='Password' type={'password'} onChange={onInputChange} value={FormState.password} name="password" fullWidth></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ marginTop: '16px' }} display={ (!!errorMessage) ? '' : 'none' }>
              <Alert severity='error'> { errorMessage } </Alert>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '16px' }} spacing={'16px'} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Button disabled={status === 'checking'} type='submit' fullWidth>Entrar</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={status === 'checking'} onClick={onGoogleSignIn} className='btn-gradient' variant='contained' fullWidth><Google sx={{ fontSize: '25px' }}></Google> oogle</Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent="center" sx={{ marginTop: '16px' }}>
            <Grid item>
              <Link onClick={ toRegister } component={RouterLink} variant={'caption'} underline="hover" to={'/auth/register'}>¿No tienes cuenta? Create una aqui.</Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  )
}
