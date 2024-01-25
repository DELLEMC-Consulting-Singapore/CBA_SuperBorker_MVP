// import bcrypt from 'bcryptjs';

import { message } from 'antd'

const errorMsg = (msg) => {
  message.error({
    content: msg,
    style: {
      marginTop: '5vh',
    },
    duration: 2,
  })
}

const Auth = {
  authenticate: async function (email, password) {
    if (email != '' && password != '') {
      try {
        localStorage.setItem('token', true)
        localStorage.setItem('username', email)
        await this.getUserProfile()
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  },
  isAuthenticated: function () {
    let session = localStorage.getItem('token')
    if (!session) {
      return false
    }
    return this.isValidToken()
  },
  getUserProfile: async function () {
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    if (!token) {
      throw new Error('User Not Authenticated .')
    } else {
      return {
        token,
        username,
      }
    }
  },
  isValidToken: function () {
    let session = localStorage.getItem('token')
    return session ? true : false
  },
  invalidate: function () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  },
}

export default Auth
