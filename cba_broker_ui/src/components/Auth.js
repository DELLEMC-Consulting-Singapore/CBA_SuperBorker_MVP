// import bcrypt from 'bcryptjs';

import { message } from "antd";

const errorMsg = (msg) => {
  message.error({
    content: msg,
    style: {
      marginTop: "5vh",
    },
    duration: 2,
  });
};

const Auth = {
  authenticate: async function (email, password) {
    if (email != "" && password != "") {
      try {
        localStorage.setItem("token1", true);
        localStorage.setItem("username1", email);
        await this.getUserProfile();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  isAuthenticated: function () {
    let session = localStorage.getItem("token1");
    if (!session) {
      return false;
    }
    return this.isValidtoken1();
  },
  getUserProfile: async function () {
    let token = localStorage.getItem("token1");
    let username = localStorage.getItem("username1");
    if (!token) {
      throw new Error("User Not Authenticated .");
    } else {
      return {
        token,
        username,
      };
    }
  },
  getUserProfile1: function () {
    return localStorage.getItem("username1");
  },
  isValidtoken1: function () {
    let session = localStorage.getItem("token1");
    return session ? true : false;
  },
  invalidate: function () {
    localStorage.removeItem("token1");
    localStorage.removeItem("username1");
  },
};

export default Auth;
