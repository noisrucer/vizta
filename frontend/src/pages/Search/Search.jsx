import * as React from "react";
import { useState, useContext, forwardRef, useEffect, useRef } from "react";
import { UserContext } from "../../UserContext";
import { useParams } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
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
import { ColorModeContext, tokens } from "../../theme";

const baseURL = process.env.REACT_APP_BASEURL;
const temp_color = "#1D2630";
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
      width: "88ch",
      "&:focus": {
        width: "85ch",
      },
    },
  },
}));

const getFilteredCourses = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter(
    (courses) =>
      courses.course_id.toLowerCase().includes(query.toLowerCase()) ||
      courses.name.toLowerCase().includes(query.toLowerCase())
  );
};

const Main = () => {
  const navigate = useNavigate();
  const params = useParams();
  const faculty = params.faculty;

  const { UserToken, UserData, IsAuth } = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;
  const [isAuth, setIsAuth] = IsAuth;

  const [courses, setCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesChanged, setFavoritesChanged] = useState(false);
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/courses/${faculty}/${userData}`,
          headers: userToken["headers"],
        })
        .then((response) => {
          const data = response.data;
          console.log(`response from /courses/${faculty}/${userData}: `, data);
          setCourses(data);
        })
        .catch((error) => {
          navigate("/")
        });
    };
    fetchCourseData();
  }, [favoritesChanged]);

  const filteredCourses = getFilteredCourses(query, courses);

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

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const handlePageChange = (event, page) => {
    console.log(page);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const slicedCourses = filteredCourses.slice(pagination.from, pagination.to);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "20px",
        height: "100%",
      }}
    >
      <Box sx={{ width: { xs: "400px", md: "600px", lg: "700px" } }}>
        <Item
          sx={{
            boxShadow: 6,
            backgroundColor: colors.primary[400],
          }}
        >
          <Box>
            <Search
              sx={{
                marginRight: "5px",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by course code…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Search>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            {slicedCourses.length > 0 ? (
              <List>
                {slicedCourses.map((value) => (
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
                        {value.is_favorite ? (
                          <FavoriteIcon
                            sx={{ color: colors.greenAccent[400] }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            sx={{ color: colors.greenAccent[400] }}
                          />
                        )}
                      </IconButton>
                      <ListItemButton
                        onClick={() => handleListItemClick(value.course_id)}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          alignItems: "flex-start",
                        }}
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
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginLeft: { xs: "30px", md: "0px" },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: colors.primary[400],
                      }}
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
                count={Math.ceil(filteredCourses.length / pageSize)}
                variant="outlined"
                shape="rounded"
                size="large"
                onChange={handlePageChange}
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
  );
};

export default Main;
