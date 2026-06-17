import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SlotsPage from './pages/slots/SlotsPage';
import BookPage from './pages/book/BookPage';
import MyBookingsPage from './pages/my-bookings/MyBookingsPage';
import ThemeToggle from './components/ThemeSwitcher';

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/slots" element={<SlotsPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </>
  );
}