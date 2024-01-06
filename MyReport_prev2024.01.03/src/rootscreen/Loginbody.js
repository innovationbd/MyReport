import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaUserCircle } from "react-icons/fa";
import { Label } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import config from "../config";

const Loginbody = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  const [status, setStatus] = useState(undefined); // For message


  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    const res = axios
      .post(`${config.apiUrlLogin}`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("user_name", res.data.user_name);
       
       

        const userLogout =1;    
        const userLogoutdata = {userLogout };
        axios
          .patch(`${config.apiUrl}userInfo/` + res.data.user_id + "/", userLogoutdata)
          .then((Response) => Response.json())
          .then(() => {})
          .catch((error) => {});
          navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        // console.log(err);
        setStatus({ type: "error", error });
        swal("Error", "Check User Id & Password, Please try Again", "warning");
      });
  };


  return (
    <div className={styles.loginbody}>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col lg="8" className="gradient100">
            <div className={styles.usericonarea}>
              <span className={styles.usericon}>
                <FaUserCircle />
              </span>
            </div>
            <Row>
              <Col lg="6" md={{ span: 3, offset: 3 }}>
                <span className={styles.loginsignuptitle}>
                  Existing User? Login
                </span>
                <form onSubmit={userLogin}>
                  <div className={styles.inputitmdiv}>
                    <input
                      required="required"
                      type="text"
                      className={styles.inputitm}
                      placeholder="User ID"
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputitmdiv}>
                    <input
                      required="required"
                      type="Password"
                      className={styles.inputitm}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className={styles.remeber}>
                      <input type="checkbox"></input> Remeber Login
                    </span>
                    <span className={styles.forgot}> <a style={{color: 'white'}} href="https://reporting.smsamfund.se/HvOakN1AD9c2Stp/accounts/password_reset/">Forgot Password</a></span>
                  </div>

                  <div className={styles.inputitmdiv}>
                    <input
                      type="submit"
                      className={styles.inputitmbtn}
                      value="Login"
                    />
                    <div className={styles.loginbuttomarea}>
                      {/* <span>Don’t have an account?</span>
                      <br></br>
                      <span>Request an Account</span> */}
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Loginbody;
