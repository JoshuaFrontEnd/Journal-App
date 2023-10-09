import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { ImageGallery } from '../components';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }


  return (
    <JournalLayout>

      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit aspernatur porro dignissimos quo veniam commodi voluptas nobis maiores pariatur adipisci omnis, cumque natus amet, qui tempora nostrum ducimus et delectus.</Typography> */}

      <NothingSelectedView></NothingSelectedView>

      {/* <NoteView></NoteView>

      <ImageGallery></ImageGallery> */}

      <IconButton
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
