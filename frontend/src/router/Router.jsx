import { Routes, Route } from "react-router-dom";

// importaciones de las paginas
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { NovedadesPage } from "../pages/NovedadesPage";
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/novedades" element={<NovedadesPage />} />
      </Routes>
    </>
  );
};
