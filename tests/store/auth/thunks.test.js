import { checkingAuthentication, checkingCredentials } from "../../../src/store/auth";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

  const dispatch = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('debe de invocar el checkingCredentials', async () => {

    await checkingAuthentication()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

  })

});