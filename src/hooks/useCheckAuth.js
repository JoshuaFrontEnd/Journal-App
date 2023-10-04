import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';

export const useCheckAuth = () => {

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

  return status;

}
