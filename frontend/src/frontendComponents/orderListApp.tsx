import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config/config";

interface Prop {
      open: boolean,
      setOpen: () => void
}

const OrderListApp = ({ open, setOpen }: Prop) => {
      const [order, setOrder] = useState([{ id: 0, name: "", price: 0, color: "" }]);
      const accessToken = localStorage.getItem("accessToken");

      useEffect(() => {
            orderListFunction();
      }, [1])
      const orderListFunction = async () => {
            const response = await fetch(`${config.apiBaseUrl}/orderList`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ accessToken })
            });
            const responseJson = await response.json();
            setOrder(responseJson);
      }
      return (
            <Dialog open={open} onClose={setOpen}>
                  <DialogContent sx={{ width: 300 }}>
                        <Typography variant="h5">ORDER LIST</Typography>
                        {order.map(item => {
                              return (
                                    <Box key={item.id}>
                                          <Box sx={{ display: "flex", justifyContent: "space-between", }}>
                                                <Box>
                                                      <Typography >{item.name}</Typography>
                                                      <Typography color="gray">{item.color}</Typography>
                                                </Box>
                                                <Typography >{item.price} MMK</Typography>
                                          </Box>
                                    </Box>
                              )
                        })}
                        <Box sx={{ minWidth: 200, height: "1px", bgcolor: "gray", marginY: 2 }}></Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", }}>
                              <Typography >Total</Typography>
                              <Typography >MMK</Typography>
                        </Box>
                        <Box sx={{ minWidth: 200, height: "1px", bgcolor: "gray", marginY: 2 }}></Box>
                        {/* pay money */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <Typography sx={{ mb: 3, color: "#fea816" }}>Pay Money</Typography>
                              <Box sx={{ display: "flex" }}>
                                    <Link style={{ padding: 10, background: "#4285f4", color: "#fff", borderRadius: 10, textDecoration: "none" }} to="/">Kpay</Link>
                                    <Link style={{ padding: 10, color: "blue", borderRadius: 10, textDecoration: "none", border: "1px solid", marginLeft: 10, fontFamily: "initial" }} to="/">Vasa</Link>
                              </Box>
                        </Box>
                  </DialogContent>
            </Dialog>
      )
};
export default OrderListApp;