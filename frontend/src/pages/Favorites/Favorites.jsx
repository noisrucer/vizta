import * as React from "react";
import { useState, useContext, forwardRef, useEffect, useRef } from "react";
import { UserContext } from "../../UserContext";
import { useParams } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "../../components/Snackbar";
import ArchiveIcon from "@mui/icons-material/Archive";

const baseURL = process.env.REACT_APP_BASEURL;
const favColor = "#25323F";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#070809" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    borderRadius: 20,
}));

const Search = styled("div")(({ theme }) => ({
    marginTop: 10,
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "57ch",
            "&:focus": {
                width: "60ch",
            },
        },
    },
}));


const Favorites = () => {
    const navigate = useNavigate();
    const params = useParams();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { UserToken, UserData } = useContext(UserContext);
    const [userToken, setUserToken] = UserToken;
    const [userData, setUserData] = UserData;

    const [favorites, setFavorites] = useState([]);
    const [favoritesChanged, setFavoritesChanged] = useState(false);

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {

        const fetchFavoritesData = async () => {
            axios
                .request({
                    method: "get",
                    url: `${baseURL}/courses/favorites/${userData}`,
                    headers: userToken["headers"],
                })
                .then((response) => {
                    const favorites = response.data;
                    console.log(
                        `response from /courses/favorites/${userData}: `,
                        favorites
                    );
                    setFavorites(favorites);
                })
                .catch((error) => {
                    console.log("error in favorites: ", error);
                });
        };
        fetchFavoritesData();
    }, [favoritesChanged]);

    const handleFavoritesButtonClick = (id, isFavorites) => {
        setOpen(true);
        const data = {
            email: userData,
            course_id: id,
        };
        if (isFavorites === false) {
            const addFavorite = async () => {
                axios
                    .request({
                        method: "post",
                        url: `${baseURL}/courses/favorite`,
                        data,
                        headers: userToken["headers"],
                    })
                    .then((response) => {
                        console.log("response from /courses/favorite: ", response);
                    })
                    .catch((error) => {
                        console.log("error in addFavorite: ", error);
                    });
            };
            addFavorite();
            setAlertMessage("Successfully added to favorites!");
        } else {
            const deleteFavorite = async () => {
                axios
                    .request({
                        method: "delete",
                        url: `${baseURL}/courses/favorite/${userData}/${id}`,
                        headers: userToken["headers"],
                    })
                    .then((response) => {
                        console.log(
                            "response from /courses/favorite/email/courses delete: ",
                            response
                        );
                    })
                    .catch((error) => {
                        console.log("error in delete favorite: ", error);
                    });
            };
            deleteFavorite();
            setAlertMessage("Successfully removed from favorites!");
        }

        setFavoritesChanged(!favoritesChanged);
    };

    const handleListItemClick = (e) => {
        console.log("key: ", e);
        navigate(`/visualization/${e}`);
    };

    const pageSize = 5;

    const [favoritesPagination, setFavoritesPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize,
    });

    const handleFavoritesPageChange = (event, page) => {
        console.log(page);
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setFavoritesPagination({ ...favoritesPagination, from: from, to: to });
    };

    const slicedFavorites = favorites.slice(
        favoritesPagination.from,
        favoritesPagination.to
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <Box>
                <Item sx={{ boxShadow: 6, backgroundColor: colors.primary[400] }}>
                    <Typography variant="h5" sx={{ marginTop: "17px", color: "text.primary" }}>
                        Favorites
                    </Typography>
                    <Box
                        sx={{
                            marginTop: "10px",
                        }}
                    >
                        {slicedFavorites.length > 0 ? (
                            <List>
                                {slicedFavorites.map((value) => (
                                    <>
                                        <ListItem key={value.course_id}>
                                            <IconButton
                                                key={value.course_id}
                                                onClick={() =>
                                                    handleFavoritesButtonClick(
                                                        value.course_id,
                                                        value.is_favorite
                                                    )
                                                }
                                            >
                                                <FavoriteIcon sx={{ color: colors.greenAccent[400] }} />

                                            </IconButton>
                                            <ListItemButton
                                                onClick={() => handleListItemClick(value.course_id)}
                                            >
                                                <ListItemText
                                                    sx={{ marginLeft: "30px" }}
                                                    primary={
                                                        <React.Fragment>
                                                            <Typography component="span" color="text.primary">
                                                                {value.course_id}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: "inline" }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {value.name}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                                <ListItemText
                                                    secondary={`reviews: ${value.num_reviews}`}
                                                    style={{ position: "absolute", left: "460px" }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider
                                            variant="fullWidth"
                                            style={{ width: "620px", borderColor: colors.primary[400] }}
                                        />
                                    </>
                                ))}
                            </List>
                        ) : (
                            <>
                                <List>
                                    <ArchiveIcon sx={{ fontSize: "60px", color: "grey" }} />
                                    <h3 style={{ color: "grey" }}>No Items to display</h3>
                                </List>
                                <Divider
                                    variant="fullWidth"
                                    style={{ width: "620px", marginBottom: 10 }}
                                />
                            </>
                        )}
                        <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                            <Pagination
                                count={Math.ceil(favorites.length / pageSize)}
                                variant="outlined"
                                shape="rounded"
                                size="large"
                                onChange={handleFavoritesPageChange}
                            />
                        </Stack>
                    </Box>
                </Item>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Favorites