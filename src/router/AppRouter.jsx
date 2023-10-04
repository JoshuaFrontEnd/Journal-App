import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {

  const status = useCheckAuth();

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
