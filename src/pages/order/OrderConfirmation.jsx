import { Box, Button, Container, Typography } from "@mui/material"
import Header from "../../component/Header"
import IconLocation from "../../assets/icon-location.png"
import JusJeruk from "../../assets/jus-jeruk.png"
import NasiGoreng from "../../assets/pic-food.png"
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import BASE_URL from "../../config/BASE_URL"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

function OrderConfirmation() {
  const title = "Order Confirmation"

  const { accountData } = useSelector((state) => state.auth)

  const { id } = useParams();

  const url = `${BASE_URL}/cart/${id}`

  const { data: cart, isLoading, error, mutate } = useSWR(url, (url) => fetcher(url, accountData?.access_token))

  if (isLoading) return <div>loading...</div>
  if (error) return <div>failed to load</div>

  console.log(cart)

  return (
    <Container
      sx={{
        maxWidth: { md: "md", sm: "sm" }
      }}>
      <Box
        className="order-detail"
        sx={{
          backgroundColor: "#fffffe",
          boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
          minHeight: "97.5vh",
          padding: "20px 20px",
          color: "#5F6C7B",
          paddingBottom: "120px"
        }}>
        <Header title={title} />
        <Box className="detail-makanan" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Price</Typography>
          <Box className="shadow-box" p={"30px 40px 30px 30px"} fontSize={"18px"} borderRadius={"10px"} display={"grid"} gap={"25px"}>
            {cart.items.map(menus => (
              <Box px={"40px"}>
                <Typography variant="p">{menus.quantity}<span style={{fontWeight: "bold"}}>x</span> {menus.menu.title}  </Typography>
                <Typography variant="p" sx={{ float: "right" }}>Rp. {(menus.menu.price*menus.quantity).toLocaleString("id-ID")}</Typography>
              </Box>
            ))}
            <Box sx={{ borderBottom: "1px solid black" }} />
            <Box px={"40px"}>
              <Typography variant="p" fontWeight={"bold"}>Total</Typography>
              <Typography variant="p" fontWeight={"bold"} sx={{ float: "right", color: "#094067" }}>Rp. {cart?.total.toLocaleString("id-ID")}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="tenant-name" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Foods Detail</Typography>
          <Box className="shadow-box" p={"20px 40px"} fontSize={"18px"} borderRadius={"10px"} display={"grid"} gap={"25px"}>
            <Box display={"flex"} alignItems={"center"}>
              <img src={IconLocation} alt="" width={"56px"} />
              <Box display={"grid"} ml={"20px"}>
                <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>{cart?.tenant?.full_name}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={"50px"} display={"flex"}>
          <Button sx={{
            backgroundImage: "linear-gradient(270deg, #1A73E9, #6C92F4)",
            color: "white",
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            marginX: "auto"
          }}>ALL ORDERS READY TO PICK UP</Button>
        </Box>
      </Box>
    </Container >
  )
}

export default OrderConfirmation

const CardDetailMakanan = ({ menu }) => {
  return (
    <Box className="card-lebar shadow-box"
      sx={{
        padding: "30px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        width: "45%",
        flex: "50"
      }}>
      <img src={menu?.image} alt="" width={"150px"} />
      <Box className="deskripsi" ml={"25px"} display={"grid"}>
        <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>{menu?.title}</Typography>
        <Typography variant="p" fontSize={"14px"}>{menu?.description}</Typography>
        <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Rp.{menu?.price}</Typography>
      </Box>
    </Box>
  )
}