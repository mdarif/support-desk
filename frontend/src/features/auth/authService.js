import axios from 'axios'

const API_URL = '/api/users'

// Register user
const register = async userData => {
  // userData is an object with an email and password i.e {name: 'Hina', email: 'hina@*****.com', password: '******'}
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    // localStorage can only hold strings
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async userData => {
  // userData is an object with an email and password i.e {email: 'arif@*****.com', password: '******'}
  const response = await axios.post(API_URL + '/login', userData)

  if (response.data) {
    // localStorage can only hold strings
    // Save the user data to localStorage in a key called 'user'
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login
}

export default authService
