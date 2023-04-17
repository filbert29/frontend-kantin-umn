import { Box, Button, Container, Stack, Step, StepConnector, StepLabel, Stepper, Typography, stepConnectorClasses } from "@mui/material"
import Header from "../../component/Header"
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Check from "../../assets/check.png"
import IconLocation from "../../assets/icon-location.png"
import JusJeruk from "../../assets/jus-jeruk.png"
import NasiGoreng from "../../assets/pic-food.png"

function OrderConfirmation() {
  const title = "Order Confirmation"

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#357DED',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#357DED',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#357DED',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#357DED',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <img src={Check} alt="" width={35} />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  const steps = ['Sedang menunggu konfirmasi', 'Makanan sedang dibuat', 'Siap disajikan', 'Selesai'];

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
            <Box px={"40px"}>
              <Typography variant="p">Nasi Goreng</Typography>
              <Typography variant="p" sx={{ float: "right" }}>Rp. 15.000,00</Typography>
            </Box>
            <Box px={"40px"}>
              <Typography variant="p">Jus Jeruk</Typography>
              <Typography variant="p" sx={{ float: "right" }}>Rp. 7.000,00</Typography>
            </Box>
            <Box sx={{ borderBottom: "1px solid black" }} />
            <Box px={"40px"}>
              <Typography variant="p" fontWeight={"bold"}>Total</Typography>
              <Typography variant="p" fontWeight={"bold"} sx={{ float: "right", color: "#094067" }}>Rp. 22.000,00</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="tenant-name" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Foods Detail</Typography>
          <Box className="shadow-box" p={"20px 40px"} fontSize={"18px"} borderRadius={"10px"} display={"grid"} gap={"25px"}>
            <Box display={"flex"} alignItems={"center"}>
              <img src={IconLocation} alt="" width={"56px"} />
              <Box display={"grid"} ml={"20px"}>
                <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>Kedai Nasi Goreng</Typography>
                <Typography variant="p">Kantin UMN, Bagian Selasar Timur</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="minuman" mt={"30px"} display={"grid"} gap={"15px"}>
          <Box width={"100%"} mb="10px">
            <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Menus Detail</Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px"
          }}>
            <CardDetailMakanan menu={{ title: "Nasi Goreng", description: "nasi goreng dari kampung", image: NasiGoreng, price: 15000 }} />
            <CardDetailMakanan menu={{ title: "Jus Jeruk", description: "minuman dari jeruk", image: NasiGoreng, price: 15000 }} />
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