import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './';

export const SideBar = ({ drawerWidth }) => {

  //Para obtener datos/estado del "store" en React/Redux se usa el Hook "useSelector", y se le pasa como parametro un callback, esta función tiene como primer argumento el "state" que tiene acceso a los "reducers" declarados en el "store" y estos a su vez acceden al valor del "state" actual, en este caso desestructuro "displayName" del "state", "state" creado en "thunks.js"
  const { displayName } = useSelector( state => state.auth );

  // Obteniendo del estado las notas guardadas en CloudFirestore
  const { notes, active } = useSelector( state => state.journal );

  console.log( notes, active );

  return (

    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0} } }
    >

      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >

        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            notes.map( note => (
              <SideBarItem key={ note.id } { ...note } />
            ))
          }
        </List>

      </Drawer>

    </Box>

  )
}
