import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sleep from "./pages/Sleep";
import Home from "./pages/Home";
import Steps from "./pages/Steps";
import Water from "./pages/Water";
import Weight from "./pages/Weight";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="sleep" element={<Sleep />} />
                <Route path="steps" element={<Steps />} />
                <Route path="water" element={<Water />} />
                <Route path="weight" element={<Weight />} />
            </Routes>
        </BrowserRouter>
    );
}
