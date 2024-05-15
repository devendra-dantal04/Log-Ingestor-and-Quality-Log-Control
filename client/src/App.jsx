import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QueryResponse from "./pages/QueryResponse";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QueryResponse />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
