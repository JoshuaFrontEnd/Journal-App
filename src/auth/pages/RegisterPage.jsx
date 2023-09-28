// Al importar el componente 'Link' desde 'react-router-dom' se genera un conflicto debido al alcance de nombre con el componente 'Link' de 'MUI', para solucionar esto uso un alias, asignando el nombre 'RouterLink' al 'Link' de 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

// Seteo datos por defecto del formulario
const formData = {
  email: 'ioshi@gmail.com',
  password: '123456',
  displayName: 'Joshua Torres'
}

export const RegisterPage = () => {

  // Utilizo el Hook personalizado "useForm", para obtener los campos del formulario que necesito
  const { email, password, displayName, onInputChange, formState } = useForm( formData );

  // Evento "onSubmit" para enviar el formulario
  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log( formState );
   }

  return (

    <AuthLayout title='Crear cuenta'>

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
            <Grid item xs={12}>
              <Button
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
