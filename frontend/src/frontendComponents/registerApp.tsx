import { Box, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { config } from "../config/config";
import LoginApp from "./loginApp";
interface Prop {
      open: boolean,
      setOpen: () => void,
}
const RegisterApp = ({ open, setOpen }: Prop) => {
      const [user, setUser] = useState({ name: "", email: "", password: "", address: "" });

      const registerFunction = async () => {
            if (!user.name) return alert("Please enter your name");
            if (!user.email) return alert("Please enter your email");
            if (!user.address) return alert("Please enter your address");
            if (!user.password) return alert("Please enter your password");
            const response = await fetch(`${config.apiBaseUrl}/register`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ name: user.name, email: user.email, password: user.password, address: user.address })
            });
            if (response.ok) {
                  // setUser({ ...user, name: "", email: "", password: "", address: "" });
                  const responseData = await response.json();
                  const AccessToken = responseData.accessToken
                  localStorage.setItem("accessToken", AccessToken);
                  setOpen();
            }
      }
      return (
            <Dialog open={open} onClose={setOpen}>
                  <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 450 }}>
                        <Typography variant="h5">Register Page</Typography>
                        <Box sx={{ fontFamily: "sans-serif", marginY: 4, display: "flex", }}>
                              <Typography sx={{ fontFamily: "sans-serif", bgcolor: "#0b9d58", paddingX: 2, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, color: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }} variant="h4">G</Typography>
                              <Typography sx={{ bgcolor: "#db4537", paddingX: 2, width: 30, height: 50 }} variant="h4"></Typography>
                              <Typography sx={{ bgcolor: "#ffcd3f", paddingX: 2, borderTopRightRadius: 5, borderBottomRightRadius: 5, width: 30, height: 50 }} variant="h4"></Typography>
                        </Box>
                        <div style={{ minWidth: 350, height: "1px", background: "gray" }}></div>
                        <TextField value={user.name} onChange={(evt) => setUser({ ...user, name: evt.target.value })} sx={{ minWidth: 300, m: 1, mt: 5 }} type="text" placeholder="Enter full name" />
                        <TextField sx={{ minWidth: 300, m: 1 }} type="date" placeholder="Enter birthday" />
                        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 300, m: 1 }}>
                              <Box sx={{ mb: 1 }}><input type="radio" /><span>Male</span></Box>
                              <Box><input type="radio" /><span>Femal</span></Box>
                        </Box>
                        <TextField value={user.address} onChange={(evt) => setUser({ ...user, address: evt.target.value })} sx={{ minWidth: 300, m: 1 }} placeholder="Enter address" />
                        <TextField value={user.email} onChange={(evt) => setUser({ ...user, email: evt.target.value })} sx={{ minWidth: 300, m: 1 }} type="email" placeholder="Enter email or phone number" />
                        <TextField value={user.password} onChange={(evt) => setUser({ ...user, password: evt.target.value })} sx={{ minWidth: 300, m: 1, mb: 3 }} type="password" placeholder="Enter password" />
                        <Button onClick={registerFunction} variant="contained" sx={{ mb: 5 }}>Register</Button>
                        <div style={{ minWidth: 350, height: "1px", background: "gray" }}></div>
                        <Typography onClick={() => setOpen()} sx={{ color: "blue", fontFamily: "sans-serif", marginY: 3, borderBottom: "1px solid", cursor: "pointer" }}>login</Typography>
                  </DialogContent>
            </Dialog>
      )
};
export default RegisterApp;