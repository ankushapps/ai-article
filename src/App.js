import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Matches from './Matches';
import { Container } from '@mui/material';

function App() {
  const [showEditor, setShowEditor] = useState(false)
  const [fixture_id, setFixtureId] = useState()
  const [data, setEditorData] = React.useState(null);

  const showEditorHandler = (editorData, fixture_id) => {
    setEditorData(editorData)
    setShowEditor(true)
    setFixtureId(fixture_id)
  }

  const hideEditor = () => {
    setShowEditor(false)
  }

  return (
    <div className="App">
      <Container fixed sx={{ padding: 5, backgroundColor: 'white'}}>
        {!showEditor && <Matches showEditorClick={showEditorHandler} />}
        {showEditor && <Editor data={data} hideEditor={hideEditor} fixture_id={fixture_id} />}
      </Container>
    </div>
  );
}

export default App;
