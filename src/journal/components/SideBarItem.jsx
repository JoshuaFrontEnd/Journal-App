import { useMemo } from 'react';
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export const SideBarItem = ({ title = '', body, id }) => {

  // Funcion para mostrar solo los primeros 17 caracteres del titulo, si tiene mas le asigna tres puntos (...) al final de la oracion
  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0,17) + '...'
      : title;
  }, [ title ])

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ 'Exercitationem beatae minima alias autem' } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
