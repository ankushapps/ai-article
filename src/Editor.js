import { default as React, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Table from '@editorjs/table';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
const DEFAULT_INITIAL_DATA = {
    "time": 1634236800,
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Texas Super Kings vs MI New York Dream11 pre-match analysis",
                "level": 1
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "The upcoming match between Texas Super Kings and MI New York is expected to be a thrilling encounter. As the teams gear up for the match, let's take a look at the Dream11 pre-match analysis and the players to watch out for."
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Players to Watch Out For",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "The following players have been performing consistently and are expected to make an impact in the upcoming match:"
            }
        },
        {
            "type": "table",
            "data": {
                "content": [
                    [
                        "Player Name",
                        "Position",
                        "Team",
                        "Selection %",
                        "Captain %",
                        "Vice Captain %",
                        "Avg. Points"
                    ],
                    [
                        "M Santner",
                        "AR",
                        "TSK",
                        "89.91",
                        "6.1",
                        "9.32",
                        "82"
                    ],
                    [
                        "D Bravo",
                        "AR",
                        "TSK",
                        "92.65",
                        "24.33",
                        "13.84",
                        "59"
                    ],
                    [
                        "D Conway",
                        "WK",
                        "TSK",
                        "90.81",
                        "19.39",
                        "13.27",
                        "59"
                    ],
                    [
                        "K Pollard",
                        "BAT",
                        "MINY",
                        "90.22",
                        "8.12",
                        "12.46",
                        "63"
                    ],
                    [
                        "T Boult",
                        "BOWL",
                        "MINY",
                        "95.27",
                        "4.83",
                        "9.68",
                        "56"
                    ]
                ]
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "These players have been in good form and are expected to contribute significantly to their respective teams in the upcoming match."
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Conclusion",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "The upcoming match between Texas Super Kings and MI New York is expected to be a closely contested encounter. The players mentioned in the Dream11 pre-match analysis are expected to make an impact and could be crucial in determining the outcome of the match. Fans can look forward to an exciting match between two strong teams."
            }
        }
    ]
};

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = ({ data, hideEditor, fixture_id }) => {
    const ejInstance = useRef();
    const [isLoading, setLoading] = useState(false);
    const [editorData, setEditorData] = React.useState(data);
    const [prompt, setPrompt] = React.useState('Top 3 fantasy pics');
    const [editorInstance, setEditorInstance] = useState(null)
    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            let instance = null;

            const initializeEditor = async () => {
                instance = new EditorJS({
                    holder: EDITTOR_HOLDER_ID,
                    logLevel: "ERROR",
                    data: editorData,
                    onReady: async () => {
                        ejInstance.current = instance;
                        setEditorInstance(instance)
                    },
                    onChange: async (editor) => {
                        let content = await editor.saver.save();
                        // Put your logic here to save this data to your DB
                        setEditorData(content);
                    },
                    // autofocus: true,
                    tools: {
                        header: Header,
                        table: Table
                    },
                });

                setEditorInstance(instance);
            };

            initializeEditor();

        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        }
    }, []);

    const generateNewContent = () => {
        if (editorInstance) {
            setLoading(true)
            axios.post('https://w3u2jlhyj6.execute-api.us-east-1.amazonaws.com/prod/get-cricket-articles',
                {
                    "body": {
                        "fixture_id": fixture_id,
                        "topic": prompt
                    }
                }).then(function (response) {
                    setLoading(false)
                    console.log(response.data.body);
                    editorInstance.isReady
                        .then(() => {
                            editorInstance.render(response.data.body);
                        })
                        .catch((error) => {
                            console.error('Error updating Editor data:', error);
                        });
                })
                .catch(function (error) {
                    setLoading(false)
                    console.log(error);
                });

        }
    }

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITTOR_HOLDER_ID,
            logLevel: "ERROR",
            data: editorData,
            onReady: async (edt) => {
                ejInstance.current = editor;
                setEditorInstance(editor)
            },
            onChange: async (editor) => {
                let content = await editor.saver.save();
                // Put your logic here to save this data to your DB
                setEditorData(content);
            },
            // autofocus: true,
            tools: {
                header: Header,
                table: Table
            },
        });
    };

    return (
        <React.Fragment>
            <Stack spacing={2}>
                <div style={{ margin: '0 auto' }}>
                    <Stack spacing={2} direction='row'><Button size='medium' variant='outlined' onClick={hideEditor}>
                        Back To Matches
                    </Button>
                        <TextField onChange={(e) => setPrompt(e.target.value)} id="outlined-basic" label="Prompt" variant="outlined" value={prompt} focused />
                        <Button size='medium' variant='contained' color='error' 
                        onClick={generateNewContent}>
                            {isLoading ? 'Generating New Content...' : 'Generate New Content'}
                        </Button>
                    </Stack>
                </div>
                <div id={EDITTOR_HOLDER_ID}> </div>
            </Stack>
        </React.Fragment>
    );
}

export default Editor;