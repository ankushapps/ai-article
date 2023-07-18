import React, {useState} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';

const CreateContentButton = ({fixture_id, showEditorClick}) => {

    const [isLoading, setLoading] = useState(false);

    const createContentHandler = (fixture_id) => {
        setLoading(true)
        axios.post('https://w3u2jlhyj6.execute-api.us-east-1.amazonaws.com/prod/get-cricket-articles',
            {
                "body": {
                    "fixture_id": fixture_id,
                    "topic": "Top 3 fantasy pics"
                }
            }).then(function (response) {
                setLoading(false)
                console.log(response.data.body);
                showEditorClick(response.data.body)

                // setMatches(response.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            });
    }

    return (
        <Button size="medium" variant='contained'
            onClick={() => createContentHandler(fixture_id)}>
                {isLoading 
                ? 'Please wait...' 
                : 'Create Content'}</Button>
    )
}

export default CreateContentButton;