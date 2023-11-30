// Leaderboard.js - Leaderboard Component using Material-UI
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import axios from 'axios'; 

const useStyles = makeStyles({
  container: {
    maxWidth: '800px',
    margin: 'auto',
    marginTop: '70px',
    marginBottom: '150px'
  },
});

const Leaderboard = () => {
  const classes = useStyles();
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('https://contest-hub-server-kappa.vercel.app/top-creators-details');
        setLeaderboardData(response.data); 
        
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={classes.container}>
      <h2>Leaderboard</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry?.creatorName}</TableCell>
                <TableCell align="right">{entry?.totalContests}</TableCell>
                {/* Add more table cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
