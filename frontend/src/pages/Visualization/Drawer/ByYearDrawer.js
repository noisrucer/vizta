import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));
  
  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

export const ByYearDrawer = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const getYearlyTrend = async () => {
        axios.request({
            method: 'get',
            url: `${baseURL}/visualization/${courseId}/by_years`,
            headers: userToken['headers']
        })
        .then(response => {
            console.log("getYearlyTrends: ", response.data)
        })
        .catch(error => {
            console.log("error from /visualization/course_id/by_years: ", error)
        })
    };
    getYearlyTrend();
    }, [])

    return (
        <>
            <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ width: "100%" }}>
                View By Year
            </Button>
            <Drawer 
            anchor="bottom"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            sx={{
                height: "80%",
                }}
            >

            <Box 
                textAlign='center' 
                role='presentation' 
                sx={{
                    backgroundColor: "white",
                    borderTopRightRadius: 20
                    }} >
                <Typography variant="h5" component='div'>
                By Year
                </Typography>
            </Box>
            <Box p={2} textAlign='center' role='presentation' >
                <Typography variant="h5" component='div'>
                By Year
                </Typography>
            </Box>
            </Drawer>
        </>
    )}