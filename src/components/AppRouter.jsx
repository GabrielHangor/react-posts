import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from './../pages/About';
import Posts from './../pages/Posts';
import Error from './../pages/Error';
import PostIdPage from './PostIdPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/error" element={<Error />} />
      <Route path="/posts/:id" element={<PostIdPage />} />
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  );
}

export default AppRouter;
