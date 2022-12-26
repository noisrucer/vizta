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
    // color: "white"
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: "white",
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
    // document.body.style.backgroundColor = "#110F44"

    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        axios.request({
          method: 'get',
          url: `${baseURL}/courses/All`,
          })
          .then(response => {
            const data = response.data
            setCourses(data)
          })
      };
      fetchData();

      
    },[])

    const filteredCourses = getFilteredCourses(query, courses)

    const handleListItemClick = (e) => {
      console.log("key: ", e)
    }

    const [favorite, setFavorite] = useState(false)

    const setFavorites = (e) => {
      setFavorite(!favorite)
    }

    return (
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box>
          <Box 
            sx={{
              // backgroundColor: "secondary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
            <Search sx={{marginTop: "100px",
                        marginRight: "5px"
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
                height: 1000,
                // backgroundColor: "primary.light",
                display: "flex",
                justifyContent: 'center',
                marginTop: "10px"
                }}>
              {filteredCourses.length > 0 ? 
              <List>
                  {filteredCourses.map((value) => (
                    <>
                      <ListItem alignItems="stretch" key={value.course_id}>
                        <IconButton onClick={() => setFavorites()}>
                            { favorite[value.course_id] ? 
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
              </List> : <List>No items to display</List>}
            </Box>
        </Box>
        <Box>
          <Typography variant="h5">Favorites</Typography>
          <Box sx= {{
                height: 900,
                width: 500,
                backgroundColor: "primary.dark",
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}>
          </Box>
        </Box>
      </Box>
    )
};

export default Main;
