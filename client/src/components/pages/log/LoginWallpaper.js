import React from "react";
import LoginWallpaperImage from "../../../images/LoginWallpaper.jpg";

const LoginWallpaper = () => {
  return (
    <div className=" h-screen w-2/4 flex justify-center items-center ">
      <img
        className=" w-9/12 "
        alt="Login Wallpaper"
        src={LoginWallpaperImage}
      />
    </div>
  );
};

export default LoginWallpaper;
