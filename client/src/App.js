import "./App.css";
import Login from "./components/pages/log/Login";
import LoginWallpaper from "./components/pages/log/LoginWallpaper";

function App() {
  return (
    <div className=" flex">
      <LoginWallpaper />
      <Login />
    </div>
  );
}

export default App;
