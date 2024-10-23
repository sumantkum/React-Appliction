import React, { useEffect, useState } from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import { AppBar, Autocomplete, Box, Toolbar, TextField, Tabs, Tab } from '@mui/material';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';

const Header = () => {
  
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>

        <Link to="/">
          <Box display="flex" alignItems="center" width={"20%"}>
            <MovieIcon fontSize="large" />
          </Box>
        </Link>

        <Box width={"20%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search movie across world"
              />
            )}
          />
        </Box>
        <Box display={'flex'} justifyContent="flex-end" width={"30%"}>
          <Tabs
            value={value}
            textColor="inherit"
            indicatorColor="secondary"
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            <Tab LinkComponent={Link} to="/admin" label="Admin" />
            <Tab LinkComponent={Link} to="/auth" label="Auth" />

          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
