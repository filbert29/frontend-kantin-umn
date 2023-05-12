import { Box, Button, Container, Modal, TextField, Typography } from "@mui/material"
import Header from "../../component/Header"
import IconLocation from "../../assets/icon-location.png"
import JusJeruk from "../../assets/jus-jeruk.png"
import NasiGoreng from "../../assets/pic-food.png"
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import BASE_URL from "../../config/BASE_URL"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import NoImage from "../../assets/No_Image_Available.jpg"
import axios from "axios"
import "../../assets/style/styleOrderConfirmation.css"

function OrderConfirmation() {
  const title = "Order Confirmation"

  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState()
  const [amount, setAmount] = useState(1)
  const [message, setMessage] = useState('')

  const handleOpen = (menu) => {
    setOpen(true)
    setSelectedMenu(menu)
    setAmount(menu?.quantity)
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedMenu(undefined)
  }

  const { accountData } = useSelector((state) => state.auth)

  const { id } = useParams();

  const url = `${BASE_URL}/cart/${id}`

  const { data: cart, isLoading, error, mutate } = useSWR(url, (url) => fetcher(url, accountData?.access_token))

  if (isLoading) return <div>loading...</div>
  if (error) return <div>failed to load</div>

  // console.log(selectedMenu?.menu?._id)

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
  };

  const handleChangeAmount = async (e) => {
    e.preventDefault();

    const menu_id = selectedMenu?.menu?._id;
    const quantity = amount;

    console.log(menu_id)

    if (amount == 0) {
      try {
        const remove_item = { menu_id };
        const response = await axios.delete(BASE_URL + `/cart/${id}`, remove_item, {
          headers: {
            Authorization: `Bearer ${accountData?.access_token}`
          },
          data: remove_item
        })
        handleClose();
        setMessage('*Success remove from cart');
      } catch (err) {
        setMessage('*Cannot remove from cart');
      }
    } else {
      try {
        const change_quantity = { menu_id, quantity };
        const response = await axios.patch(BASE_URL + `/cart/${id}`, change_quantity, {
          headers: {
            Authorization: `Bearer ${accountData?.access_token}`
          },
        })
        handleClose();
        setMessage('*Success change amount');
      } catch (err) {
        setMessage('*Cannot change amount');
      }
    }

  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Box sx={{
            display: "grid",
            gap: "10px"
          }}>
            <img src={selectedMenu?.image || NoImage} width={"100%"} alt="" />
            <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>{selectedMenu?.menu?.title}</Typography>
            <Typography variant="p">Rp. {selectedMenu?.menu?.price.toLocaleString("id-ID")}</Typography>
            <Box display={"flex"}>
              <Button onClick={() => setAmount(amount > 0 ? amount - 1 : amount)}>minus</Button>
              <TextField type="number" value={amount}></TextField>
              <Button onClick={() => setAmount(amount + 1)}>plus</Button>
            </Box>
            <Button onClick={handleChangeAmount}>Change Amount</Button>
          </Box>
        </Box>
      </Modal>
      <Container
        sx={{
          maxWidth: { md: "md", sm: "md" }
        }}>
        <Box
          className="order-detail"
          sx={{
            backgroundColor: "#fffffe",
            boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
            minHeight: "97.5vh",
            padding: { sm: "20px 20px", xs: "20px 0px" },
            color: "#5F6C7B",
            paddingBottom: "120px"
          }}>
          <Header title={title} />
          <Box className="detail-makanan" display={"grid"} gap={"15px"} mt={"30px"}>
            <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Price</Typography>
            <Box className="shadow-box"
              sx={{
                padding: { sm: "30px 60px 30px 50px", xs: "20px 20px" },
                fontSize: { sm: "18px", xs: "14px" },
                borderRadius: "10px",
                display: "grid",
                gap: { sm: "25px", xs: "15px" },
              }}>
              {cart.items.map(menus => (
                <Box sx={{
                  paddingX: { sm: "40px", xs: "0px" }
                }}>
                  <Box>
                    <Typography variant="p"><Typography variant="span" sx={{ fontWeight: "bold", padding: "5px 7px", marginRight: { sm: "15px", xs: "8px" }, borderRadius: "5px", border: "1px solid #D9D9D9" }}>{menus.quantity}x</Typography> {menus.menu.title}  </Typography>
                    <Typography variant="p" sx={{ float: "right" }}>Rp. {(menus.menu.price * menus.quantity).toLocaleString("id-ID")}</Typography>
                  </Box>
                  <Button
                    onClick={() => handleOpen(menus)}
                    sx={{
                      backgroundColor: "white",
                      color: "#357DED",
                      margin: { sm: "5px 0px 0px 40px", xs: "5px 0px 0px 28px" }
                    }}>edit</Button>
                </Box>
              ))}
              <Box sx={{ borderBottom: "1px solid black" }} />
              <Box sx={{
                paddingX: { sm: "40px", xs: "0px" }
              }}>
                <Typography variant="p" fontWeight={"bold"}>Total</Typography>
                <Typography variant="p" fontWeight={"bold"} sx={{ float: "right", color: "#094067" }}>Rp. {cart?.total.toLocaleString("id-ID")}</Typography>
              </Box>
            </Box>
          </Box>
          <Box className="tenant-name" display={"grid"} gap={"15px"} mt={"30px"}>
            <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Foods Detail</Typography>
            <Box className="shadow-box"
              sx={{
                padding: { sm: "30px 60px 30px 50px", xs: "20px 20px" },
                fontSize: { sm: "18px", xs: "14px" },
                borderRadius: "10px",
                display: "grid",
                gap: { sm: "25px", xs: "15px" },
              }}>
              <Box display={"flex"} alignItems={"center"}>
                <img className="img-order-confirm" src={IconLocation} alt="" />
                <Box display={"grid"} ml={"20px"}>
                  <Typography variant="p"
                    sx={{
                      fontSize: { sm: "20px", xs: "15px" },
                      fontWeight: "bold",
                    }}>{cart?.tenant?.full_name}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt={"50px"} display={"flex"}>
            <Button sx={{
              backgroundImage: "linear-gradient(270deg, #1A73E9, #6C92F4)",
              color: "white",
              padding: "15px 60px",
              fontSize: { sm: "18px", xs: "14px" },
              borderRadius: "8px",
              marginX: "auto",
              marginBottom: "80px"
            }}>ORDER</Button>
          </Box>
        </Box>
      </Container >
    </>
  )
}

export default OrderConfirmation