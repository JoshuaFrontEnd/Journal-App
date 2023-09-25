// Al importar el componente 'Link' desde 'react-router-dom' se genera un conflicto debido al alcance de nombre con el componente 'Link' de 'MUI', para solucionar esto uso un alias, asignando el nombre 'RouterLink' al 'Link' de 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';

export const LoginPage = () => {

  // Cargo el "hook" "useDispatch" desde "react-redux", para poder "despachar" un "thunk", esto se hace cuando necesito "despachar" acciones asincronas
  const dispatch = useDispatch();

  // Datos de prueba formulario
  const { email, password, onInputChange, formState } = useForm({
    email: 'ioshi@gmail.com',
    password: '123456'
  });

  // Evento submit del boton del formulario
  const onSubmit = ( event ) => {
    event.preventDefault();

    // Despacho el "Thunk"
    dispatch( checkingAuthentication() );

  }

  // Boton para ingresar con Google
  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>

      <form onSubmit={ onSubmit }>

        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
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
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type='submit' variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={ onGoogleSignIn }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}
