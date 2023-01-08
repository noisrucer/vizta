import * as React from 'react';
import { useState, useContext , useEffect } from "react";
import {UserContext} from "../../UserContext";
import { styled, alpha, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import TextField from "../../components/TextField";
import Typography from '@mui/material/Typography';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


const baseURL = 'http://127.0.0.1:8000';

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
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

  const getFilteredCourses = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((courses) => courses.course_id.includes(query));
  };

function Main(){
    const navigate = useNavigate();

    // document.body.style.backgroundColor = "#110F44"
    const {UserToken, UserData} = useContext(UserContext);
    const [userToken, setUserToken] = UserToken;
    const [userData, setUserData] = UserData;

    const [courses, setCourses] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoritesChanged, setFavoritesChanged] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
      const fetchCourseData = async () => {
        axios.request({
          method: 'get',
          url: `${baseURL}/courses/All/${userData}`,
          headers: userToken['headers']
          })
          .then(response => {
            const data = response.data
            console.log(`response from /courses/All/${userData}: `, data)
            setCourses(data)
          })
      };
      fetchCourseData();

      const fetchFavoritesData = async () => {
        axios.request({
          method: 'get',
          url: `${baseURL}/courses/favorites/${userData}`,
          headers: userToken['headers']
        })
        .then(response => {
          const favorites = response.data
          console.log(`response from /courses/favorites/${userData}: `, favorites)
          setFavorites(favorites)
        })
        .catch(error => {
          console.log("error in favorites: ", error)
        })
      }
      fetchFavoritesData();
    },[favoritesChanged])

    const filteredCourses = getFilteredCourses(query, courses)

    const handleFavoritesButtonClick = (id, isFavorites) => {
      console.log("course id: ", id)
      console.log("is favorites: ", isFavorites)
      const data = {
        "email": userData,
        "course_id": id
      }
      if (isFavorites === false){
        const addFavorite = async () => {
          axios.request({
            method: 'post',
            url: `${baseURL}/courses/favorite`, 
            data,
            headers: userToken['headers']
          })
          .then(response => {
            console.log("response from /courses/favorite: ", response)
          })
          .catch(error => {
            console.log("error in addFavorite: ", error)
          })
        };
        addFavorite();
      } 
      else {
        const deleteFavorite = async () => {
          axios.request({
            method: 'delete',
            url: `${baseURL}/courses/favorite/${userData}/${id}`,
            headers: userToken['headers']
          })
          .then(response => {
            console.log("response from /courses/favorite/email/courses delete: ",response)
          })
          .catch(error => {
            console.log("error in delete favorite: ", error)
          })
        };
        deleteFavorite();
      }

      setFavoritesChanged(!favoritesChanged);

    }

    const handleListItemClick = (e) => {
      console.log("key: ", e)
      navigate(`/visualization/${e}`)
    }

    const pageSize = 5;

    const [pagination, setPagination] = useState({
      count: 0,
      from: 0,
      to: pageSize
    })

    const [favoritesPagination, setFavoritesPagination] = useState({
      count: 0,
      from: 0,
      to: pageSize
    })

    const handlePageChange = (event, page) => {
      console.log(page)
      const from = (page - 1) * pageSize;
      const to = (page - 1) * pageSize + pageSize;
      setPagination({...pagination, from: from, to: to})
    }

    const handleFavoritesPageChange = (event, page) => {
      console.log(page)
      const from = (page - 1) * pageSize;
      const to = (page - 1) * pageSize + pageSize;
      setFavoritesPagination({...favoritesPagination, from: from, to: to})
    }

    const slicedCourses = filteredCourses.slice(pagination.from, pagination.to)
    const slicedFavorites = favorites.slice(favoritesPagination.from, favoritesPagination.to)

    return (
      <Box display="flex" justifyContent="space-around" >
        <Box>
          <Box 
            sx={{
              }}>
            <Search sx={{marginTop: "100px",
                        marginRight: "5px",
                        }}>
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
                marginTop: "10px"
                }}>
              {slicedCourses.length > 0 ? 
              <List>
                  {slicedCourses.map((value) => (
                    <>
                      <ListItem  
                        key={value.course_id}
                        >
                        <IconButton key={value.course_id} onClick={() => handleFavoritesButtonClick(value.course_id, value.is_favorite)}>
                            { value.is_favorite ? 
                            <StarIcon/> : <StarBorderRoundedIcon/>
                            }
                        </IconButton>
                        <ListItemButton onClick={() => handleListItemClick(value.course_id)}>
                          <ListItemText sx={{marginLeft: "30px"}}
                            primary={value.course_id}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
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
                            style={{position: "absolute", left: "460px"}} 
                            />
                        </ListItemButton>
                      </ListItem>
                      <Divider variant="fullWidth" style={{width: "600px"}}/>
                    </>
                  ))}
              </List> :
              <>
                <List>No Items to display</List>
                <Divider variant="fullWidth" style={{width: "600px"}}/>
              </>
              }
              <Stack spacing={2} sx={{display: "flex", alignItems: "center"}}>
                <Pagination 
                  count={Math.ceil(filteredCourses.length / pageSize)}
                  variant="outlined" 
                  shape="rounded" 
                  size="large" 
                  onChange={handlePageChange}
                />
              </Stack>
            </Box>
        </Box>
        <Box>
          <Typography variant="h5" sx={{marginTop: "105px"}}>Favorites</Typography>
          <Box sx= {{
                marginTop: "10px"
                }}>
              {slicedFavorites.length > 0 ?
              <List>
                  {slicedFavorites.map((value) => (
                    <>
                      <ListItem 
                        key={value.course_id}
                        >
                        <IconButton key={value.course_id} onClick={() => handleFavoritesButtonClick(value.course_id, value.is_favorite)}>
                            { value.is_favorite ? 
                            <StarIcon/> : <StarBorderRoundedIcon/>
                            }
                        </IconButton>
                        <ListItemButton onClick={() => handleListItemClick(value.course_id)}>
                          <ListItemText sx={{marginLeft: "30px"}}
                            primary={value.course_id}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
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
                            style={{position: "absolute", left: "460px"}} 
                            />
                        </ListItemButton>
                      </ListItem>
                      <Divider variant="fullWidth" style={{width: "600px"}}/>
                    </>
                  ))}
              </List> :
              <>
                <List>No Items to display</List>
                <Divider variant="fullWidth" style={{width: "600px"}}/>
              </>
              }
              <Stack spacing={2} sx={{display: "flex", alignItems: "center"}}>
                <Pagination 
                  count={Math.ceil(favorites.length / pageSize)}
                  variant="outlined" 
                  shape="rounded" 
                  size="large" 
                  onChange={handleFavoritesPageChange}
                />
              </Stack>
          </Box>
        </Box>
      </Box>
    )
};

export default Main;
