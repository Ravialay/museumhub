import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExhibitsList from './pages/ExhibitsList';
import ExhibitDetails from './pages/ExhibitDetails';
import ExhibitForm from './pages/ExhibitForm';

function WithLayout({ children, maxWidth }) {
  return <Layout maxWidth={maxWidth}>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная — приветствие */}
        <Route
          path="/"
          element={
            <WithLayout maxWidth={1100}>
              <Home />
            </WithLayout>
          }
        />

        {/* Список экспонатов */}
        <Route
          path="/exhibits"
          element={
            <WithLayout maxWidth={1400}>
              <ExhibitsList />
            </WithLayout>
          }
        />

        {/* Создание */}
        <Route
          path="/exhibits/new"
          element={
            <WithLayout maxWidth={700}>
              <ExhibitForm />
            </WithLayout>
          }
        />

        {/* Редактирование (важно: до /exhibits/:id) */}
        <Route
          path="/exhibits/:id/edit"
          element={
            <WithLayout maxWidth={700}>
              <ExhibitForm />
            </WithLayout>
          }
        />

        {/* Детали */}
        <Route
          path="/exhibits/:id"
          element={
            <WithLayout maxWidth={1100}>
              <ExhibitDetails />
            </WithLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}