export const initialState = {
  status: 'checking', // 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticatedState = {
  status: 'authenticated', // 'not-authenticated', 'authenticated'
  uid: '123ABC',
  email: 'demo@Google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg',
  errorMessage: null
}

export const notAuthenticatedState = {
  status: 'not-authenticated', // 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const demoUser = {
  uid: '123ABC',
  email: 'demo@Google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg'
}