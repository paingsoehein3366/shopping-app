import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { config } from "../config/config";
import RegisterApp from "./registerApp";
interface Prop {
      open: boolean,
      setOpen: () => void
};

const LoginApp = ({ open, setOpen }: Prop) => {
      const [registerOpen, setRegisterOpen] = useState(false);
      const [user, setUser] = useState({ email: "", password: "" });
      const loginFunction = async () => {
            if (!user.email) {
                  return alert("Enter email");
            } else if (!user.password) {
                  return alert("Enter password");
            }
            const response = await fetch(`${config.apiBaseUrl}/login`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ email: user.email, password: user.password })
            });
            if (response.ok) {
                  const responseData = await response.json();
                  const AccessToken = responseData.accessToken;
                  console.log("AccessToken: ", AccessToken);
                  localStorage.setItem("accessToken", AccessToken);
                  setOpen();
            }
      }
      return (
            <Dialog open={open} onClose={setOpen} >
                  <Typography variant="h5" sx={{ display: "flex", justifyContent: "center", marginY: 10 }}>Login Page</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", minWidth: 500, alignItems: "center", }}>
                        <TextField onChange={(evt) => setUser({ ...user, email: evt.target.value })} sx={{ minWidth: 300 }} type="email" placeholder="Enter email" />
                        <TextField onChange={(evt) => setUser({ ...user, password: evt.target.value })} sx={{ minWidth: 300, marginY: 3 }} type="password" placeholder="Enter password" />
                        <Button onClick={loginFunction} variant="contained" sx={{ mb: 5 }}>login</Button>
                        <div style={{ minWidth: 350, height: "1px", background: "gray" }}></div>
                        <Typography onClick={() => { setRegisterOpen(true); }} sx={{ color: "blue", fontFamily: "sans-serif", marginY: 5, borderBottom: "1px solid", cursor: "pointer" }}>register account</Typography>
                  </Box>
                  <RegisterApp open={registerOpen} setOpen={() => setRegisterOpen(false)} />
            </Dialog>
      )
};
export default LoginApp;