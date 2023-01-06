import { Routes, Route } from "react-router-dom";
import Frontpage from "../pages/Frontpage";
import Home from "../pages/Home/Home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
}

export default Router;
