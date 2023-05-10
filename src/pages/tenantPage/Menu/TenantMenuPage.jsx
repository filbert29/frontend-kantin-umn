import { Box, Button, Card, Container, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import DefaultImage from "../../../assets/No_Image_Available.jpg"
import { formatThousand } from "../../../helper/number";
import { Add, Delete, Edit, Upload } from "@mui/icons-material";
import DFlexJustifyContentBetween from "../../../component/general/DFlexJustifyContentBetween";
import { useRef, useState } from "react";
import { ModalStyle } from "../../admin/Tenant/TenantDetailPage";
import axios from "axios";
import { addNotification } from "../../../store/Notification";
import { mutate as mutateGlobal } from "swr";

const TenantMenuPage = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: allMenu, isLoading, error, mutate } = useSWR(`${BASE_URL}/tenant/menu`, (url) => fetcher(url, access_token))

    const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
    const [openModalAddCategory, setOpenModalAddCategory] = useState(false)
    const [menuSelected, setMenuSelected] = useState()

    const handleAddMenu = () => {
        setMenuSelected(undefined)
        setOpenModalAddEdit(true)
    }

    const handleEditMenu = (menu) => {
        setMenuSelected(menu)
        setOpenModalAddEdit(true)
    }

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
        <>
            <Container>
                {allMenu?.length > 0 ? (
                    <>
                        <DFlexJustifyContentBetween sx={{ mb: 3 }}>
                            <Typography variant="h5">({allMenu?.length}) Menu</Typography>
                            <Button onClick={handleAddMenu} variant="contained" color="success" startIcon={<Add />} size="small">Add Menu</Button>
                        </DFlexJustifyContentBetween>
                        <Box sx={{ display: "grid", rowGap: 3 }}>
                            {allMenu.map((item) => (
                                <Card key={item?._id} sx={{ display: "flex", gap: 2, p: 1.8 }}>
                                    <Box>
                                        <Box
                                            component={"img"}
                                            src={item?.image || DefaultImage}
                                            alt=""

                                            sx={{
                                                borderRadius: "10px",
                                                objectFit: "cover",
                                                minWidth: 110,
                                                minHeight: 110,
                                                width: 110,
                                                height: 110,
                                            }}
                                        />
                                        <br />
                                        <Typography textAlign={"center"} component={"p"} fontWeight={500} variant="p" fontSize={14}>Rp. {formatThousand(item?.price)}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
                                        <Box>
                                            <Typography variant="p" fontSize={13} >{item?.category?.title || "No Category"} │ {item?.prep_duration} Minutes</Typography>
                                            <Typography component="h3" fontSize={18} fontWeight={600} >{item?.title}</Typography>
                                            <Typography variant="p" sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: "2",
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                fontSize: 12,
                                                minHeight: "2ch"
                                            }}>{item?.description}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", columnGap: 2 }}>
                                            <Button color="error" variant="contained" size="small" endIcon={<Delete />} >
                                                Delete
                                            </Button>
                                            <Button onClick={() => handleEditMenu(item)} variant="contained" size="small" endIcon={<Edit />} >
                                                Edit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                    </>
                ) : (
                    <Typography variant="p" textAlign={"center"}>--- No Menu ---</Typography>
                )}
            </Container>

            {openModalAddEdit && <ModalAddEditMenu
                open={openModalAddEdit}
                handleClose={() => setOpenModalAddEdit(false)}
                menuSelected={menuSelected}
                mutate={mutate}
                addCategory={() => setOpenModalAddCategory(true)}
            />}

            {openModalAddCategory && <ModalAddCategory
                open={openModalAddCategory}
                handleClose={() => setOpenModalAddCategory(false)}
            />}
        </>
    );
}

export default TenantMenuPage;

const ModalAddEditMenu = ({ open, menuSelected, handleClose, mutate, addCategory }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: categories} = useSWR(`${BASE_URL}/menu/category`, (url) => fetcher(url, access_token))
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        title: menuSelected?.title || "",
        description: menuSelected?.description || "",
        price: menuSelected?.price || "",
        prep_duration: menuSelected?.prep_duration || "",
        category: menuSelected?.category?._id || "",
        image: menuSelected?.image || "",
    })
    const [menuImage, setMenuImage] = useState({ preview: undefined, raw: undefined })
    const imageFileRef = useRef()

    const handleChangeEditImage = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setMenuImage({
                    preview: event.target.result,
                    raw: file
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("title", form?.title)
            formData.append("description", form?.description)
            formData.append("price", form?.price)
            formData.append("prep_duration", form?.prep_duration)
            formData.append("category", form?.category)

            if (menuImage?.raw) {
                formData.append("image", menuImage?.raw)
            }

            const response = await axios.post(`${BASE_URL}/menu`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (response?.status === 200) {
                dispatch(addNotification({ message: "Add menu success", type: "success" }))
                handleClose()
            }
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClickAddImage = () => {
        imageFileRef.current.click()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...ModalStyle, overflowY: "auto", maxHeight: "80vh", width: { xs: 300, sm: 600 } }}>
                <Typography textAlign={"center"} variant="h5" mb={2} >{menuSelected ? "Edit" : "Add"} Menu</Typography>
                <Box component={"form"} sx={{ display: "flex", flexDirection: "column", rowGap: 2 }} onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {!menuImage.preview ? (
                            <Box
                                onClick={handleClickAddImage}
                                sx={{
                                    width: 300,
                                    height: 300,
                                    borderRadius: 2,
                                    border: "4px dashed rgba(0,0,0,0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    objectFit: "contain"
                                }}
                            >
                                <Box>

                                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                                        <Upload sx={{ fontSize: 80, color: "gray" }} />
                                        <br />
                                        Upload your image
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{
                                width: 300,
                                height: 300,
                                borderRadius: 2,
                                border: "4px dashed rgba(0,0,0,0.2)",
                                objectFit: "contain"
                            }} component={"img"} src={menuImage?.preview}></Box>
                        )}
                    </Box>
                    <input ref={imageFileRef} type="file" style={{ display: "none" }} onChange={handleChangeEditImage} />
                    <TextField
                        variant="standard"
                        name="title"
                        label="Menu Title"
                        placeholder="Enter Menu Tile"
                        value={form?.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        variant="standard"
                        name="description"
                        label="Menu Description"
                        placeholder="Enter Menu Description"
                        value={form?.description}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        name="price"
                        label="Menu Price"
                        placeholder="Enter Menu Price"
                        value={form?.price}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="number"
                    />
                    <TextField
                        variant="standard"
                        name="prep_duration"
                        label="Menu Preparation Duration (Menit)"
                        placeholder="Enter Menu Preparation Duration"
                        value={form?.prep_duration}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="number"
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <TextField
                            select
                            variant="standard"
                            name="category"
                            label="Menu Category"
                            placeholder="Enter Menu Category"
                            value={form?.category}
                            onChange={handleChange}
                            fullWidth
                        >
                            {categories?.length > 0 ? (
                                categories?.map((item) => (
                                    <MenuItem key={item?._id} value={item?._id}>{item?.title}</MenuItem>
                                ))
                            ) : (
                                <MenuItem value="" disabled={true}>No Category</MenuItem>
                            )}

                        </TextField>
                        <Button onClick={addCategory} variant="contained" color="primary" sx={{ mt: 1, width: 180 }}>Add Category</Button>
                    </Box>
                    {error && <Typography variant="p" color="error">Something went wrong</Typography>}
                    <Button variant="contained" color="success" type="submit" disabled={isLoading} sx={{ mt: 2 }}>
                        {isLoading ? "Loading..." : menuSelected ? "Edit Menu" : "Add Menu"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

const ModalAddCategory = ({ open, handleClose }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [title, setTitle] = useState("")

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await axios.post(`${BASE_URL}/menu/category`, { title }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response?.status === 200) {
                mutateGlobal(`${BASE_URL}/tenant/category`)
                handleClose()
            }
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...ModalStyle, overflowY: "auto", maxHeight: "80vh", width: { xs: 300, sm: 600 } }}>
                <Typography textAlign={"center"} variant="h5" mb={2} >Add Category</Typography>
                <Box component={"form"} sx={{ display: "flex", flexDirection: "column", rowGap: 2 }} onSubmit={handleSubmit}>
                    <TextField
                        variant="standard"
                        name="title"
                        label="Category Title"
                        placeholder="Enter Category Tile"
                        value={title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    {error && <Typography variant="p" color="error">Something went wrong</Typography>}
                    <Button variant="contained" color="success" type="submit" disabled={isLoading} sx={{ mt: 2 }}>
                        {isLoading ? "Loading..." : "Add Category"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

