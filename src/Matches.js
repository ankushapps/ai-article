import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CreateContentButton from './CreateContentButton';

const Matches = ({ showEditorClick }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.post('https://w3u2jlhyj6.execute-api.us-east-1.amazonaws.com/prod/get-matches', {
            "sport": "cricket",
            "mobile_number": "8420755591"
        })
            .then(function (response) {
                setLoading(false)
                console.log(response.data);
                setMatches(response.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            });
    }, [])

   

    return (
        <div style={{marginLeft: '30%'}}>
            {loading ? <h1>Matches Loading...</h1> : <><h2 style={{marginLeft: '20px'}}>Upcoming Cricket Matches</h2>
            {matches?.map((match) => {
                return (<Card elevation={6} key={match.fixture_id} sx={{ width: 400, margin: 2, textAlign: 'center', borderRadius: 5}} >
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            {match.league_name}
                        </Typography>
                        <Typography variant="h5">
                            {match.home_team_name_short} vs {match.away_team_name_short}
                        </Typography>
                    </CardContent>
                    <CardActions>
                       <CreateContentButton showEditorClick={showEditorClick} fixture_id={match.fixture_id} />
                    </CardActions>
                </Card>)
            })}</>}
        </div>
    )
}

export default Matches;