import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {

  //Para obtener datos/estado del "store" en React/Redux se usa el Hook "useSelector", y se le pasa como parametro un callback, esta función tiene como primer argumento el "state" que tiene acceso a los "reducers" declarados en el "store" y estos a su vez acceden al valor del "state" actual, en este caso desestructuro "status" del "state", "state" creado en "thunks.js"
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

      // Cargando las notas del usuario
      dispatch( startLoadingNotes() );

    });

  }, [])

  return status;

}
