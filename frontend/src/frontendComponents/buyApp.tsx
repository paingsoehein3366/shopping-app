import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from "../config/config";
import LoginApp from "./loginApp";

interface Prop {
      open: boolean,
      setOpen: () => void,
      id: number
};

const BuyApp = ({ open, setOpen, id }: Prop) => {
      const [data, setData] = useState([{ id: 0, title: "", price: 0, url: "" }]);
      const [checkUserData, setCheckUserData] = useState([{ id: 0 }]);
      const [openLogin, setOpenLogin] = useState(false);
      const accessToken = localStorage.getItem("accessToken");

      useEffect(() => {
            home();
            checkUserFunction();
      }, [1])
      const home = async () => {
            const response = await fetch(`${config.apiBaseUrl}/shirt`, {
                  method: "GET",
                  headers: { "content-type": "application/json" },
            });
            if (response.ok) {
                  const responseJson = await response.json();
                  setData(responseJson);
            } else {
                  return alert("Error!")
            }
      };
      const checkUserFunction = async () => {
            const response = await fetch(`${config.apiBaseUrl}/checkUser`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ accessToken })
            });
            const responseJson = await response.json();
            setCheckUserData(responseJson);
      };
      //check shirt
      const checkData = data.filter(item => item.id === id);
      const sendTitle = checkData.map(item => item.title);
      const sendPrice = checkData.map(item => item.price);

      const buyFunction = async () => {
            if (!accessToken) return setOpenLogin(true);
            const response = await fetch(`${config.apiBaseUrl}/userOrder`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ id: checkUserData, title: sendTitle, price: sendPrice })
            });
            if (response.ok) {
                  console.log("order ok!");
                  setOpen();
            } else {
                  alert("Try again!");
                  setOpen();
            }

      }

      return (
            <Dialog open={open} onClose={setOpen} >
                  <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>Tshirt</DialogTitle>
                  <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {checkData.map(item => {
                              return (
                                    <Box key={item.id} sx={{ width: 200, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                          <img style={{ width: "100%", marginBottom: 20 }} src={`${config.apiBaseUrl}/images/${item.url}`} alt="" />
                                          <Typography sx={{ fontFamily: "sans-serif", fontSize: 18 }}>{item.title} </Typography>
                                          <Typography>{item.price} MMk</Typography>
                                          <Box>
                                                <button style={{ background: "blue", padding: 7, borderRadius: 5, border: "none", color: "#fff", margin: 2, marginTop: 8 }}>blue</button>
                                                <button style={{ background: "green", padding: 7, borderRadius: 5, border: "none", color: "#fff", margin: 2 }}>green</button>
                                                <button style={{ background: "yellow", padding: 7, borderRadius: 5, border: "none", color: "gray", margin: 2 }}>yellow</button>
                                                <button style={{ background: "red", padding: 7, borderRadius: 5, border: "none", color: "#fff", margin: 2 }}>red</button>
                                          </Box>
                                    </Box>
                              )
                        })}
                  </DialogContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", minWidth: 300, p: 2 }}>
                        <Button variant="outlined" onClick={setOpen}>cencel</Button>
                        <Button onClick={buyFunction} variant="contained" color="warning">Buy</Button>
                  </Box>
                  <LoginApp open={openLogin} setOpen={() => setOpenLogin(false)} />
            </Dialog>
      )
};
export default BuyApp;