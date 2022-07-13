import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainHeader } from "./components/main-header/main-header";
import { Home } from "./pages/home/home";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
