import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:noteActive } = useSelector( state => state.journal );
  const { body, title, date, onInputChange, formState } = useForm( noteActive );

  // Memorizar la fecha de la nota y convertirla a un formato legible, usamos el Hook "useMemo" para no tener que realizar esta operacion cada vez que se monte el componente
  const dateString = useMemo(() => {
    const newDate = new Date( date );
    const formatDate = new Intl.DateTimeFormat('es-CL', { dateStyle: 'full', timeStyle: "short" }).format( newDate );
    return formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  }, [ date ])

  // Cada vez que el "formState" se actualice se va a despachar "setear" la nueva nota de manera "activa", en otras palabras: cada vez que la nota activa "cambie" (se edite el contenido de la nota) sera actualizada su información en el store
  useEffect(() => {
    dispatch( setActiveNote( formState ) );
  }, [ formState ])

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  return (
    <Grid
    // className='animate__animated animate__fadeIn animate__slower'
    container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>

      <Grid item>
        <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
      </Grid>

      <Grid item>
        <Button
          onClick={ onSaveNote }
          color='primary'
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={ title }
          onChange={ onInputChange }
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió en el día de hoy?'
          minRows={ 5 }
          name='body'
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <ImageGallery />

    </Grid>
  )
}
