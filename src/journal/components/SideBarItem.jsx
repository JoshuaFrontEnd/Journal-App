import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ( note ) => {

  const { title, body } =  note ;

  // console.log( note );

  const dispatch = useDispatch();

  const onClickNote = () => {
    dispatch( setActiveNote( note ) );
  }

  // Funcion para mostrar solo los primeros 17 caracteres del titulo, si tiene mas le asigna tres puntos (...) al final de la oracion
  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0,17) + '...'
      : title;
  }, [ title ])

  return (
    <ListItem disablePadding onClick={ onClickNote }>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
