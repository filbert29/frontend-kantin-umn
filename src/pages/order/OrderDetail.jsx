import { Box, Container, Stack, Step, StepConnector, StepLabel, Stepper, Typography, stepConnectorClasses } from "@mui/material"
import Header from "../../component/Header"
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Check from "../../assets/check.png"

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
        maxWidth: { md: "md", sm: "sm" }
      }}>
      <Box
        className="Home"
        sx={{
          backgroundColor: "#fffffe",
          boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
          minHeight: "97.5vh",
          padding: "20px 20px",
          color: "#5F6C7B"
        }}>
        <Header title={title} />
        <Box className="status-order" display={"grid"} gap={"15px"}>
          <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Status Order</Typography>
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
          <Typography ml={"20px"} variant="p" fontSize="24px" fontWeight={"bold"} color={"#094067"}>Detail Makanan</Typography>
          <Box className="shadow-box" py={"20px"} borderRadius={"10px"}>

          </Box>
        </Box>
      </Box>
    </Container >
  )
}

export default OrderDetail