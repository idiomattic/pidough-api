// import axios from 'axios'

// export const setAuthToken = token => {
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = token
//   } else {
//     delete axios.defaults.headers.common['Authorization']
//   }
// }

// export const signin = user => (
//   axios.post('/api/users/signin', user)
// )

// export const signup = user => (
//   axios.post('/api/users/signup', user)
// )

// export const signOut = () => (
//   $.ajax({
//     method: 'DELETE',
//     url: '/api/session'
//   })
// )

import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/signup', userData);
};

export const signin = (userData) => {
  return axios.post('/api/users/signin', userData);
};