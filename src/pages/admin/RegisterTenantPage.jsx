import { Box, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import { useSelector } from "react-redux";

const RegisterTenantPage = () => {
    const [tenantData, setTenantData] = useState({
        full_name: "",
        location: "",
        email: "",
        password: "",
        description: ""
    });
    const [tenantDataError, setTenantDataError] = useState();
    const { accountData } = useSelector((state) => state.auth)

    console.log(accountData)

    const handleTenantDataChange = (e) => {
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
            const data = await response?.data
            console.log(data)
        } catch (err) {
            console.log(err?.response?.data)
        }
    }

    return (
        <Box>
            <form onChange={handleTenantDataChange} onSubmit={handleTenantDataSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <TextField
                            label="Tenant Name"
                            variant="standard"
                            type="text"
                            required={true}
                            fullWidth
                            name="full_name"
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            variant="standard"
                            type="email"
                            required={true}
                            name="email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            variant="standard"
                            type="text"
                            name="password"
                            required={true}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default RegisterTenantPage;