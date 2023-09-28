import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

  const [formState, setFormState] = useState(initialForm);

  /* ----------------------------------------------------------------

  Si se dispara un error en el formulario, necesito que se vuelva a dibujar el componente para mostrar los mensajes de error, o si se deja de mostrar el error, tengo que borrar los mensajes de error.

  En otras palabras: cuando estamos hablando de realizar cambios en el HTML que requieran renderizarse nuevamente, tenemos que usar algun tipo de Hook que maneje el estado

  ---------------------------------------------------------------- */
  // Seteando el estado de la validacion
  const [formValidation, setFormValidation] = useState({});

  // Cada vez que haya un cambio en los datos del formulario "(formState)" voy a mandar a llamar la funcion "createValidators"
  useEffect(() => {
    createValidators();
  }, [ formState ])

  // Para que el formulario sea valido, todas las funciones de validacion deben retornar "null", con que una no retorne este valor sera considerado invalido y mostrara el error correspondiente
  const isFormValid = useMemo(() => {

    for ( const formValue of Object.keys( formValidation ) ) {

      if ( formValidation[ formValue ] !== null ) return false;

    }

    return true;

  }, [ formValidation ])


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onResetForm = () => {
    setFormState(initialForm);
  }

  const createValidators = () => {

    const formCheckedValues = {};

    // Recorro el arreglo que declare en "RegisterPage" con los valores, condiciones y mensajes de error
    for ( const formField of Object.keys(formValidations) ) {

      // Desestructuro el arreglo obteniendo la función de validación y el mensaje de error basado en el "formField"
      const [ fn, errorMessage ] = formValidations[formField];

      // console.log( fn( formState[formField] ), errorMessage, formField );

      /* ----------------------------------------------------------------
        Acá estoy creando de manera dinamica un objeto que va construyendo los nombres de las propiedades tomando el valor que venga en el "formField" y sumandole a ese valor una cadena de texto de valor "Valid" y como valor de las propiedades, le asigno el valor de la ejecucion de la funcion "validacion" que le estoy enviando "(fn)", si el valor es "true", setea como valor de la propiedad el mensaje de error, si el valor es "false", setea como valor el objeto null

        Ejemplo si el valor de "formField" fuese 'email' y el valor de ejecucion de la validacion es true:
        {
          emailValid: 'El correo debe de tener un '@'
        }

        Valores obtenidos del arreglo de "RegisterPage"
        const formValidations = {
          email: [ ( value ) => value.includes( '@' ), 'El correo debe de tener un @'],
        }
      ---------------------------------------------------------------- */
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

    }

    // El nuevo valor de la validacion sera el objeto "formCheckedValues"
    setFormValidation( formCheckedValues );

    console.log( formCheckedValues );

  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}