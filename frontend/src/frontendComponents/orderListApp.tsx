import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
                  </DialogContent>
            </Dialog>
      )
};
export default OrderListApp;