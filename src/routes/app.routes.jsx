import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { AdminPage } from "../pages/AdminPage"
import { AdminDetailsPage } from "../pages/AdminDetails"
import { AdminEdit } from "../pages/AdminEdit"

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/rastreio/:rastreio" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/details/:id" element={<AdminDetailsPage />} />
            <Route path="/edit/:id" element={<AdminEdit />} />
        </Routes>
    );
}