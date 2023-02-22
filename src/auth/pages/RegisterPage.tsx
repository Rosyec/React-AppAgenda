import { Alert, Button, Grid, Link, TextField } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthLayout } from '../layout/AuthLayout'
import { useState } from 'react';
import { registerUserWithEmailPassword } from '../../store/thunks';
import { RootState } from '../../store/store';
import React from 'react';
import { clearState } from '../../store/authSlice';

export const RegisterPage = () => {

  const dispatch = useAppDispatch();

  const { status, errorMessage } = useAppSelector( (state:RootState) =>state.auth );
  const isCheckingAuthentication = React.useMemo( () => status === 'checking', [status] );

  const formValidations: Type = {
    name: [ (val) => val.length>0, 'El nombre es requerido.' ],
    email: [ (val) => val.includes('@'), 'El email no tiene el formato correcto.' ],
    password: [ (val) => val.length>6, 'El password debe ser mayor a 6 carácteres.' ],
  }

  const [FormSubmited, setFormSubmited] = useState(false);
  const { FormState, onInputChange, onReset, Validator, isFormValid } = useForm({
    name: '',
    email: '',
    password: ''
}, formValidations);

const onSubmit = ( evt: React.FormEvent<HTMLFormElement> ) => {
  evt.preventDefault();
  setFormSubmited(true);
  if ( !isFormValid ) return;
  dispatch( registerUserWithEmailPassword(FormState) );
}

const toLogin = () => {
  dispatch( clearState() );
}

  return (
    <>
      <AuthLayout title='Registrarme'>
        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn">
          <Grid container direction="column" spacing={'16px'}>
            <Grid item xs={12} md={12}>
              <TextField error={ !!Validator['nameValid'] && FormSubmited } helperText={ (Validator['nameValid'] && FormSubmited) && Validator['nameValid'] } placeholder='Nombre completo' onChange={ onInputChange } value={ FormState.name } name="name" type={'text'} fullWidth autoFocus={true}></TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField error={ !!Validator['emailValid'] && FormSubmited } helperText={ (Validator['emailValid'] && FormSubmited) && Validator['emailValid'] } placeholder='Email' onChange={ onInputChange } value={ FormState.email } name="email" type={'email'} fullWidth></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField error={ !!Validator['passwordValid'] && FormSubmited } helperText={ (Validator['passwordValid'] && FormSubmited ) && Validator['passwordValid'] } placeholder='Password' onChange={ onInputChange } value={ FormState.password } name="password" type={'password'} fullWidth></TextField>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '16px' }} spacing={'16px'}>
            <Grid item xs={12} sm={12} display={ (!!errorMessage) ? '' : 'none' }>
              <Alert severity='error'> { errorMessage } </Alert>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button disabled={ isCheckingAuthentication } type='submit' className='btn-gradient' variant='contained' fullWidth>Crear cuenta</Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent="center" sx={{ marginTop: '16px' }}>
            <Grid item>
              <Link onClick={ toLogin } component={RouterLink} variant={'caption'} underline="hover" to={'/auth/login'}>¿Ya tienes cuenta? Ingresa aqui.</Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  )
}

interface Type {
  [ key: string ]: [(val: string) => boolean, string]
}