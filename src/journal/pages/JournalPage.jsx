import { Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { ImageGallery } from '../components';

export const JournalPage = () => {
  return (
    <JournalLayout>

      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit aspernatur porro dignissimos quo veniam commodi voluptas nobis maiores pariatur adipisci omnis, cumque natus amet, qui tempora nostrum ducimus et delectus.</Typography> */}

      {/* <NothingSelectedView></NothingSelectedView> */}

      {/* <NoteView></NoteView> */}

      <ImageGallery></ImageGallery>

    </JournalLayout>
  )
}
