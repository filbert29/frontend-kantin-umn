import { Box, TextField, Grid, Button, Typography, Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import { useSelector } from "react-redux";
import { Store } from "@mui/icons-material";

const RegisterTenantPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tenantData, setTenantData] = useState({
        full_name: "",
        location: "",
        email: "",
        description: ""
    });
    const [tenantDataError, setTenantDataError] = useState();
    const { accountData } = useSelector((state) => state.auth)


    const handleTenantDataChange = (e) => {
        setTenantDataError(undefined)
        setTenantData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleTenantDataSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}/admin/tenant/register`, tenantData, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            await response?.data
            alert("Register Tenant Success")
            setModalOpen(false)
        } catch (err) {
            alert("Register Tenant Failed")
            setTenantDataError("Something went wrong")
        }
    }

    return (
        <>
            <Box sx={{ textAlign: "center" }}>
                <Button onClick={() => setModalOpen(true)} color="success" variant="contained" sx={{ textTransform: "capitalize", flexDirection: "column" }}>
                    <Typography fontSize={"24px"} >
                        Register New Tenant
                    </Typography>
                    <Box>
                        <Store sx={{ fontSize: "64px" }} />
                    </Box>
                </Button>
            </Box>
            <Modal open={modalOpen}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    px: 4,
                    maxHeight: "90vh",
                    overflowY: "auto"
                }}>
                    <Typography my={4} variant="h5" component="h1" textAlign={"center"}>
                        Create new Tenant
                    </Typography>
                    <form onChange={handleTenantDataChange} onSubmit={handleTenantDataSubmit}>
                        <Grid sx={{mb: 4}} container rowGap={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Tenant Name"
                                    variant="standard"
                                    type="text"
                                    required={true}
                                    fullWidth
                                    name="full_name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Location"
                                    variant="standard"
                                    type="text"
                                    name="location"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Tenant Description"
                                    variant="standard"
                                    name="password"
                                    type="text"
                                    fullWidth
                                    multiline
                                    minRows={1}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    type="email"
                                    required={true}
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => setModalOpen(false)} fullWidth variant="contained" color="secondary">
                                    Cancel
                                </Button>
                            </Grid>
                            {tenantDataError && <Typography textAlign={"center"} color="error">{tenantDataError}</Typography>}
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default RegisterTenantPage;