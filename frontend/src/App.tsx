import { Routes, Route, useNavigate} from "react-router-dom";
import Sleep from "./pages/Sleep";
import Home from "./pages/Home";
import Steps from "./pages/Steps";
import Water from "./pages/Water";
import Weight from "./pages/Weight";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "../src/Layout.tsx";
import {useEffect} from "react";

export default function App() {
    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === 'false') {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            localStorage.setItem('loggedIn', 'false');
            event.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="sleep" element={<Sleep />} />
                <Route path="steps" element={<Steps />} />
                <Route path="water" element={<Water />} />
                <Route path="weight" element={<Weight />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}
