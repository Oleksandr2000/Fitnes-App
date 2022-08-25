import React from 'react';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  Training,
  FullPrograms,
  Access,
} from './pages';
import { useDispatch } from 'react-redux';
import { fetchLogin } from './redux/slices/User';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLogin());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/training" element={<Training />} />
          <Route path="/programs/:id" element={<FullPrograms />} />
          <Route path="/access/:id" element={<Access />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
