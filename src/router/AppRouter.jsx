import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';

export const AppRouter = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  // El Hook "useEffect" ejecuta codigo la primera vez que el componente se monta, y despues cada vez que el componente se renderiza
  useEffect(() => {

    // Función de Firebase para detectar cuando cambia la autenticación, hay que pasarle el auth "FirebaseAuth"
    onAuthStateChanged( FirebaseAuth, async( user ) => {

      // console.log( user.uid );

      // Si no existe el usuario, mando a llamar el logout
      if ( !user ) return dispatch( logout() );

      // Si existe el usuario, mando a llamar el login, pasando la informacion
      const { uid, email, displayName, photoURL } = user;
      dispatch( login({ uid, email, displayName, photoURL }) );

    });

  }, [])


  // Si el estado de la app es "checking" muestra el componente de loading "CheckingAuth"
  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        ( status === 'authenticated' )
          // Si estoy autenticado muestro el JournalApp
          ? <Route path='/*' element={ <JournalRoutes /> } />

          // Si no estoy autenticado, solo muestro el Login y Registro
          : <Route path='/auth/*' element={ <AuthRoutes /> } />
      }

      {/* Cualquier ruta que no haya sido definida anteriormente, mandara al usuario al login */}
      <Route path='/*' element={ <Navigate to='/auth/login/' /> } />

    </Routes>
  )
}
