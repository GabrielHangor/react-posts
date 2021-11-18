import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './../router/routes';
import { AuthContext } from './../context/context';
import Loader from './UI/Loader/Loader';

function AppRouter() {
  const { isUserAuthorised, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isUserAuthorised ? (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;
