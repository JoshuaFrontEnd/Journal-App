// Todas las tareas escritas acá tienen que ser asincronas

export const startNewNote = () => {
  return async( dispatch ) => {

    // Para grabar en Firebase usamos el 'UID' del usuario
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

  }
}