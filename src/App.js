import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Matches from './Matches';
import { Container } from '@mui/material';

function App() {
  const [showEditor, setShowEditor] = useState(false)
  const [fixture_id, setFixtureId] = useState()
  const [data, setEditorData] = React.useState(null);

  const showEditorHandler = (editorData) => {
    setEditorData(editorData)
    setShowEditor(true)
  }

  const hideEditor = () => {
    setShowEditor(false)
  }

  return (
    <div className="App">
      <Container fixed sx={{ padding: 5, backgroundColor: 'white'}}>
        {!showEditor && <Matches showEditorClick={showEditorHandler} />}
        {showEditor && <Editor data={data} hideEditor={hideEditor} />}
      </Container>
    </div>
  );
}

export default App;
