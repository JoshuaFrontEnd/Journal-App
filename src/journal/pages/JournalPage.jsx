import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal );

  // console.log( active );

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }


  return (
    <JournalLayout>

      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit aspernatur porro dignissimos quo veniam commodi voluptas nobis maiores pariatur adipisci omnis, cumque natus amet, qui tempora nostrum ducimus et delectus.</Typography> */}

      {
        // Acá tecnicamente lo qué está sucediendo, es que traigo el valor de nota activa "active", como es un objeto lo paso a booleano con doble negacion (!!), si tengo una nota activa se muestra la vista para escribir notas, si no tengo una activa se muestra la vista de notas vacias
        (!!active)
        ? <NoteView />
        : <NothingSelectedView />
      }

      <IconButton
        disabled={ isSaving }
        onClick={ onClickNewNote }
        size= 'large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
