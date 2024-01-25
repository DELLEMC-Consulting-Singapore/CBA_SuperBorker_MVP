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
    let session = localStorage.getItem('token')
    if (!session) {
      throw new Error('User Not Authenticated .')
    } else {
      session = JSON.parse(session)
      if (session.profile) {
        return session.profile
      } else {
        throw new Error('User Cannot Be Retrieved')
      }
    }
  },
  isValidToken: function () {
    let session = localStorage.getItem('token')
    return session ? true : false
  },
  invalidate: function () {
    localStorage.removeItem('token')
  },
}

export default Auth
