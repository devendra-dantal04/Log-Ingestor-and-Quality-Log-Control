import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QueryResponse from "./pages/QueryResponse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QueryResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
