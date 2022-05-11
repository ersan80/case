
import Main from "./pages/Main/Main";
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Route,
  Link,
  Routes
  // etc.
} from "react-router-dom";
import AddLink from './pages/AddLink/AddLink';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/add-link' element={<AddLink />} />
        </Routes>
      </div>
      <ToastContainer  toastStyle={{ backgroundColor: "crimson" }}></ToastContainer>

    </BrowserRouter>
  );
}
export default App;
