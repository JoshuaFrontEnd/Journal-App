import { TurnedInNot } from '@mui/icons-material';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth }) => {

  //Para obtener datos/estado del "store" en React/Redux se usa el Hook "useSelector", y se le pasa como parametro un callback, esta función tiene como primer argumento el "state" que tiene acceso a los "reducers" declarados en el "store" y estos a su vez acceden al valor del "state" actual, en este caso desestructuro "displayName" del "state", "state" creado en "thunks.js"
  const { displayName } = useSelector( state => state.auth );

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
            ['Enero','Febrero','Marzo','Abril'].map( text => (
              <ListItem key={ text } disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={ text } />
                    <ListItemText secondary={ 'Exercitationem beatae minima alias autem' } />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

      </Drawer>

    </Box>

  )
}
