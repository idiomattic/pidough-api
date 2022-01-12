import axios from 'axios'

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const signIn = user => (
  axios.post('/api/users/signup', user)
)

export const signUp = user => (
  axios.post('/api/users/signin', user)
)

// export const signOut = () => (
//   $.ajax({
//     method: 'DELETE',
//     url: '/api/session'
//   })
// )

