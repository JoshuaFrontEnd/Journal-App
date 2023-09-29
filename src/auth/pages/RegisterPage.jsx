// Al importar el componente 'Link' desde 'react-router-dom' se genera un conflicto debido al alcance de nombre con el componente 'Link' de 'MUI', para solucionar esto uso un alias, asignando el nombre 'RouterLink' al 'Link' de 'react-router-dom'
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

// Seteo datos por defecto del formulario
const formData = {
  email: '',
  password: '',
  displayName: ''
}

// Seteo las validaciones de los campos del formulario, lo que estoy haciendo, es que por cada valor, mando una función de validación, y el mensaje a mostrar dependiendo del resultado de la validación
const formValidations = {
  email: [ ( value ) => value.includes( '@' ), 'El correo debe de tener un @'],
  password: [ ( value ) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ ( value ) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  // Controlando que las validaciones solo se muestren la primera vez que se hace onSubmit en el formulario
  const [ formSubmitted, setFormSubmitted ] = useState( false );

  // Obteniendo el mensaje de error desde el store
  const { status, errorMessage } = useSelector( state => state.auth );

  // Deshabilitar el boton de "Crear cuenta" cuando este verificando si la cuenta a registrar ya existe o no
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  // Utilizo el Hook personalizado "useForm", para obtener los campos del formulario que necesito
  const {
    formState,
    isFormValid,
    email,
    emailValid,
    password,
    passwordValid,
    displayName,
    displayNameValid,
    onInputChange,
  } = useForm( formData, formValidations );

  // console.log( displayNameValid);

  // Evento "onSubmit" para enviar el formulario
  const onSubmit = ( event ) => {
    event.preventDefault();

    setFormSubmitted( true );

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword( formState ) );

   }

  return (

    <AuthLayout title='Crear cuenta'>

      <h1>FormValid: { isFormValid ? 'Válido' : 'Incorrecto' }</h1>

      <form onSubmit={ onSubmit }>

        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid
              item
              xs={12}
              display={ !!errorMessage ? '' : 'none' }
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={ isCheckingAuthentication }
                type="submit"
                variant="contained"
                fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>

  )
}
