import { Box, Button, Container, Stack, Step, StepConnector, StepLabel, Stepper, Typography, stepConnectorClasses } from "@mui/material"
import Header from "../../component/Header"
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Check from "../../assets/check.png"
import IconLocation from "../../assets/icon-location.png"
import JusJeruk from "../../assets/jus-jeruk.png"
import NasiGoreng from "../../assets/pic-food.png"
import "../../assets/style/styleOrderDetail.css"

function OrderDetail() {
  const title = "Order Detail"

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
        <Box className="status-order" display={"grid"} gap={"15px"}>
          <Typography ml={"20px"} variant="p" 
          sx={{
            fontSize: { sm: "24px", xs: "20px" },
            fontWeight: "bold",
            color: "#094067"
          }}>Status Order</Typography>
          <Box className="shadow-box" py={"20px"} borderRadius={"10px"}>
            <Stack sx={{ width: '100%' }} spacing={4}>
              <Stepper alternativeLabel activeStep={2} connector={<QontoConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </Box>
        </Box>
        <Box className="detail-makanan" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p"
            sx={{
              fontSize: { sm: "24px", xs: "20px" },
              fontWeight: "bold",
              color: "#094067"
            }}
          >Foods Detail</Typography>
          <Box className="shadow-box"
            sx={{
              padding: { sm: "30px 60px 30px 50px", xs: "20px 30px" },
              fontSize: { sm: "18px", xs: "14px" },
              borderRadius: "10px",
              display: "grid",
              gap: { sm: "25px", xs: "15px" },
            }}>
            <Box>
              <Typography variant="p">Order time</Typography>
              <Typography variant="p" sx={{ float: "right" }}>15.02.2023 - 11.31</Typography>
            </Box>
            <Box>
              <Typography variant="p">Queue number</Typography>
              <Typography variant="p" sx={{ float: "right" }}>12</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="detail-makanan" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p"
            sx={{
              fontSize: { sm: "24px", xs: "20px" },
              fontWeight: "bold",
              color: "#094067"
            }}>Price</Typography>
          <Box className="shadow-box"
            sx={{
              padding: { sm: "30px 60px 30px 50px", xs: "20px 30px" },
              fontSize: { sm: "18px", xs: "14px" },
              borderRadius: "10px",
              display: "grid",
              gap: { sm: "25px", xs: "15px" },
            }}>
            <Box sx={{ paddingX: { sm: "40px", xs: "0px" } }}>
              <Typography variant="p">Nasi Goreng</Typography>
              <Typography variant="p" sx={{ float: "right" }}>Rp. 15.000,00</Typography>
            </Box>
            <Box sx={{ paddingX: { sm: "40px", xs: "0px" } }}>
              <Typography variant="p">Jus Jeruk</Typography>
              <Typography variant="p" sx={{ float: "right" }}>Rp. 7.000,00</Typography>
            </Box>
            <Box sx={{ borderBottom: "1px solid black" }} />
            <Box sx={{ paddingX: { sm: "40px", xs: "0px" } }}>
              <Typography variant="p" fontWeight={"bold"}>Total</Typography>
              <Typography variant="p" fontWeight={"bold"} sx={{ float: "right", color: "#094067" }}>Rp. 22.000,00</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="tenant-name" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p"
            sx={{
              fontSize: { sm: "24px", xs: "20px" },
              fontWeight: "bold",
              color: "#094067"
            }}>Foods Detail</Typography>
          <Box className="shadow-box" sx={{
            padding: { sm: "30px 60px 30px 50px", xs: "20px 30px" },
            fontSize: { sm: "18px", xs: "14px" },
            borderRadius: "10px",
            display: "grid",
            gap: { sm: "25px", xs: "15px" },
          }}>
            <Box display={"flex"} alignItems={"center"}>
              <img src={IconLocation} alt="" width={"56px"} />
              <Box display={"grid"} ml={"20px"}>
                <Typography variant="p"
                  sx={{
                    fontSize: { sm: "20px", xs: "15px" },
                    fontWeight: "bold",
                  }}
                >Kedai Nasi Goreng</Typography>
                <Typography variant="p"
                  sx={{
                    fontSize: { sm: "20px", xs: "15px" }
                  }}>Kantin UMN, Bagian Selasar Timur</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="tenant-name" display={"grid"} gap={"15px"} mt={"30px"}>
          <Typography ml={"20px"} variant="p"
            sx={{
              fontSize: { sm: "24px", xs: "20px" },
              fontWeight: "bold",
              color: "#094067"
            }}>Payment Method</Typography>
          <Box className="shadow-box" sx={{
            padding: { sm: "30px 60px 30px 50px", xs: "20px 30px" },
            fontSize: { sm: "18px", xs: "14px" },
            borderRadius: "10px",
            display: "grid",
            gap: { sm: "25px", xs: "15px" },
          }}>
            <Typography variant="p" sx={{ fontSize: { sm: "24px", xs: "20px" } }}>e-Katar</Typography>
          </Box>
        </Box>
        <Box className="minuman" mt={"30px"} display={"grid"} gap={"15px"}>
          <Box width={"100%"} mb="10px">
            <Typography ml={"20px"} variant="p"
              sx={{
                fontSize: { sm: "24px", xs: "20px" },
                fontWeight: "bold",
                color: "#094067"
              }}>Menus Detail</Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px"
          }}>
            <CardDetailMakanan menu={{ title: "Nasi Goreng", description: "Tes", image: NasiGoreng, price: 1000000 }} />
            <CardDetailMakanan menu={{ title: "Jus Jeruk", description: "Tes", image: JusJeruk, price: 2000000 }} />
          </Box>
        </Box>
        <Box mt={"50px"} display={"flex"}>
          <Button sx={{
            backgroundImage: "linear-gradient(270deg, #1A73E9, #6C92F4)",
            color: "white",
            padding: "15px 30px",
            fontSize: {sm: "18px", xs: "14px"},
            borderRadius: "8px",
            marginX: "auto",
            marginBottom: "80px"
          }}>ALL ORDERS READY TO PICK UP</Button>
        </Box>
      </Box>
    </Container >
  )
}

export default OrderDetail

const CardDetailMakanan = ({ menu }) => {
  return (
    <Box className="card-lebar shadow-box"
      sx={{
        padding: {sm: "30px", xs: "0px"},
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        width: "50%",
        flex: "50"
      }}>
      <img className="img-card-order" src={menu?.image} alt="" />
      <Box className="deskripsi" ml={"25px"} display={"grid"}>
        <Typography variant="p"
          sx={{
            fontSize: {sm: "18px", xs: "14px"},
            fontWeight: "bold"
          }}
        >{menu?.title}</Typography>
        <Typography variant="p"
          sx={{
            fontSize: {sm: "14px", xs: "12px"}
          }}
        >{menu?.description}</Typography>
        <Typography variant="p"
          sx={{
            fontSize: {sm: "18px", xs: "14px"},
            fontWeight: "bold"
          }}
        >Rp.{menu?.price}</Typography>
      </Box>
    </Box>
  )
}