import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchIcon from './assets/icons8-search-32.png'


function App() {

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="sm">
        <Box>
          <div className="App">
            <div className="search-section">
              <img src={SearchIcon} alt="" />
              <a href="#" style={{ marginLeft: '15px' }}>Cari Tenant atau Makanan kesukaan kamu disini</a>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default App
