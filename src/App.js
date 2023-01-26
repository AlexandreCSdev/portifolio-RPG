import React from 'react';
import Reset from './assets/Reset';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Room } from './pages/Room';
import { Annotation } from './pages/Annotation';

export function App() {
  return (
    <>
      <Reset />
      <Router>
        <Routes>
          <Route path="/" element={<Room />} />
          <Route path="/annotation" element={<Annotation />} />
          <Route index path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}
