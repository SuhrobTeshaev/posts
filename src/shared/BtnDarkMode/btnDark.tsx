import { useEffect } from "react";
import { useLocalStorage } from "./../utils/useLocalStorage";
import sun from "./sun.svg";
import moon from "./moon.svg";
import "./btnDark.module.scss";
import detectDarkMode from "./../utils/detectDarkMode";

const BtnDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", detectDarkMode());
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")   
      .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";
        setDarkMode(newColorScheme);
      });
  }, [setDarkMode]);

  useEffect(() => {
    if (darkMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
  const toggleDarkMode = () => {
    console.log("hello");
    setDarkMode((currentValue:string) => {
      return currentValue === "light" ? "dark" : "light";
    });
  };
  // const btnNormal = "dark-mode-btn";
  // const btnActive = "dark-mode-btn dark-mode-btn--active";

  return (
    <button
      className={`relative flex  justify-between items-center w-15 h-6 px-1 rounded-full transition-colors duration-300 ${
        darkMode === "dark" ? "bg-gray-500" : "bg-white"
      } focus:outline-none`}
      onClick={toggleDarkMode}
    >
      <span
        className={`absolute right-5 w-6 h-6  rounded-full bg-white/45 dark:bg-gray-800 transform transition-transform duration-300 ${
          darkMode === "dark" ? "translate-x-5" : ""
        }`}
      ></span>
      <div className="icons flex flex-row  justify-between gap-2">
        <img
          src={sun}
          alt="Light mode"
          className="dark-mode-btn__icon rounded-full invert-0 "
        />
        <img
          src={moon}
          alt="Dark mode"
          className="dark-mode-btn__icon invert-0"
        />
      </div>
    </button>
  );
};

export default BtnDarkMode;
