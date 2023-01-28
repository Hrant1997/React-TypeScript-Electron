import { Alert, AppBar, Box, Button, Container, Modal, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  p: 4,
};

const MESSAGE_INITIAL_STATE = {
  errored: false,
  content: '',
}

type State = {
  errored: boolean,
  content: string,
}

type Action = {
  errored: boolean,
  content: string,
}


const Editor = () => {
  const [editorState, setEditorState] = useState<string>('');
  const [initialized, setInitialized] = useState<boolean>(true);
  const [message, setMessage] = useReducer((state: State, action: Action) => ({
    ...state,
    ...action,
  }), MESSAGE_INITIAL_STATE)

  useEffect(() => {
    window.api.handleReadme((readme) => {
      setEditorState(readme)
      setInitialized(true)
    })
    window.api.handleReadmeNotFound(() => setInitialized(false))
    window.api.getReadme()
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      window.api.updateReadme(JSON.stringify(JSON.parse(editorState)))
      setMessage({ errored: false, content: 'Updated successfully' })
    } catch (error) {
      console.log(error);
      setMessage({ errored: true, content: String(error) })
    }
  };

  const createReadme = () => window.api.createReadme()

  const handleLogout = () => {
    localStorage.removeItem('credentials')
    window.location.reload()
  }

  if (!initialized) {
    return <>
      <Modal
        open
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ mb: 2 }} id="modal-modal-title" variant="h6" component="h2">
            readme.json not found, please submit to create.
          </Typography>
          <Button variant='contained' onClick={createReadme}>Create</Button>
        </Box>
      </Modal>
    </>
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 3}}>
        <AppBar position="static">
          <Toolbar sx={{justifyContent: 'end'}}>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ padding: '20px 10px' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            id="outlined-multiline-static"
            label="Enter your json"
            multiline
            onChange={e => {
              if (message.content) setMessage(MESSAGE_INITIAL_STATE)
              setEditorState(e.target.value)
            }}
            value={editorState}
            minRows={5}
            sx={{ width: '100%'}}
          />
          {
            message.content && <Alert severity={message.errored ? 'error' : 'success'}>{message.content}</Alert>
          }
          
          <Button
            type='submit'
            sx={{ mt: 1 }}
            variant='contained'
          >Update</Button>
        </Box>
      </Container>
    </>
  );
}

export default Editor