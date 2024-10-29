// import React from 'react'

import { Password } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [render, setRender] = useState(false);
  async function postData(e) {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/user", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    console.log(response);
    let item =
      response.username === data.username &&
      response.password === data.password;

    if (item) {
      navigate("/book-list");
      setRender(true);
      localStorage.setItem("login", "true");
    } else setshow(true);
  }
  function getInputData(e) {
    var { name, value } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
    console.log(data);
  }
  return (
    <>
      <Box
        component="form"
        onSubmit={(e) => postData(e)}
        sx={{
          mt: "3%",
          // padding: "0 5px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          // height: "500px",
          // bgcolor: "pink",
        }}
      >
        <Box
          sx={{
            // height: "550px",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            // bgcolor: "white",
          }}
          className={"responsive"}
        >
          <Box
            width={"100%"}
            // bgcolor={"ButtonFace"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          <Box>
            {show ? (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  marginTop: "20px",
                }}
              >
                <i>* Enter correct username and password !!!</i>
              </div>
            ) : null}
          </Box>
          <Box display={"flex"} flexDirection={"column"} mt={"8px"}>
            <TextField
              label="User Name"
              type="text"
              variant="outlined"
              name="username"
              className="mt-3"
              required
              onChange={getInputData}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              className="mt-5 mb-3"
              required
              onChange={getInputData}
            />

            <Button
              type="submit"
              className="bg-primary"
              variant="contained"
              fullWidth
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
