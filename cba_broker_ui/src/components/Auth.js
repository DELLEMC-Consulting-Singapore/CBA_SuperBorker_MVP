import axios from "axios";
// import bcrypt from 'bcryptjs';
import { SERVICE_API, AuthRequired } from "../config/config";
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
      //try {
      if (AuthRequired == true) {
        var data = JSON.stringify({
          username: email,
          password: password,
        });

        var config = {
          method: "post",
          url: `${SERVICE_API}/ldap/validate-user-group`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        await axios(config)
          .then((response) => {
            if (response["status"] == 200) {
              sessionStorage.setItem("username", email);
            }
          })
          .catch(function (error) {
            if (error["response"]["status"] == 401) {
              errorMsg("Unauthorized access");
              return;
            } else if (error["response"]["status"] == 500) {
              errorMsg("Something went wrong! Please contact administrator");
              return;
            } else if (error["response"]["status"] == 404) {
              errorMsg("Services are unavailable, Please try after sometime");
              return;
            }
          });
      } else {
        sessionStorage.setItem("username", email);
      }

      await this.getUserProfile();

      // sessionStorage.setItem("username", email)
      // localStorage.setItem("token", true);
      // localStorage.setItem("username", email);
      //await this.getUserProfile();
      // } catch (err) {
      //   console.log(err);
      //   throw err;
      // }
    }
  },
  isAuthenticated: function () {
    let session = sessionStorage.getItem("username");
    if (!session) {
      return false;
    }
    return this.isValidToken();
  },
  getUserProfile: async function () {
    //let token = sessionStorage.getItem("token");
    let username = sessionStorage.getItem("username");
    if (!sessionStorage) {
      this.invalidate();
      throw new Error("User Not Authenticated .");
    } else {
      return {
        username,
      };
    }
  },
  getUserProfile1: function () {
    let username = sessionStorage.getItem("username");
    if (!username) {
      this.invalidate();
      throw new Error("User Not Authenticated .");
    } else {
      return username;
    }
  },
  isValidToken: function () {
    let session = sessionStorage.getItem("username");
    return session ? true : false;
  },
  invalidate: function () {
    sessionStorage.removeItem("username");
  },
};

export default Auth;
