
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bhasha from "./pages/Bhasha";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Bhasha />} />
        </Routes>
      </Router>
    </>
  )
}
