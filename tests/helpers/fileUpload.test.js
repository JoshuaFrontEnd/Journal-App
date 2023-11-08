import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () => {

  test('debe de subir el archivo correctamente a cloudinary', async() => {

    const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';

    const resp = await fetch( imageUrl );

    const blob = await resp.blob();

    const file = new File( [blob], 'foto.jpg' );

    const url = await fileUpload( file );

    expect( typeof url ).toBe('string');

  });

})