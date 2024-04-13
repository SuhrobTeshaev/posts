import { useState } from "react";
import classes from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useGetUserQuery, useLoginUserMutation } from "../../futuries/userSlice/authSlice";


interface LoginProps {
  setIsAuthenticated: (value:boolean) => void;
}

const modalElement = document.getElementById("modal");

const Login = ({ setIsAuthenticated }:LoginProps) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const [loginUser] = useLoginUserMutation()



 
const { data } = useGetUserQuery();

//    const user = data.find(
//      (user) => user.email === email && user.password === password
//    );
//  const handleLogin = async (e: any) => {
//    e.preventDefault();
   
//  if (user) {
//    console.log("Login successful");
//    toast.success("Login successful!");
//   setIsAuthenticated(true)
  
//    navigate('/posts')
//  } else {
//    setErrorMessage("Invalid email or password");
//    toast.error("Invalid email or password");
//  }
//  };
// console.log(data);

// const handleLogin = async (e: any) => {
//   e.preventDefault();

//   try {
//     const userData = await loginUser({
//       email,
//       password,
//     }).unwrap(); // Используем unwrap для обработки успешного или неудачного исхода

//     localStorage.setItem("token", userData.access_token);
//     toast.success(`Login successful! Welcome, ${userData.name}!`);
//     setIsAuthenticated(true);
//     navigate("/posts");
//   } catch (error) {
//     // В error содержится ответ от сервера, например, через error.data или error.status
//     const errorMessage = error.data?.message || "Invalid email or password";
//     setErrorMessage(errorMessage);
//     toast.error(errorMessage);
//   }
// };

  const handleLogin = async (e:any) => {
    e.preventDefault();

    // if (isLoading) return; // Подождите, пока данные не загрузятся

    const user = data?.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      try {
        const result = await loginUser({ email, password }).unwrap();
        localStorage.setItem("token", result.access_token);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        navigate("/posts");
      } catch (error) {
        setErrorMessage("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } else {
      setErrorMessage("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  return modalElement
    ? createPortal(
       

        <div className={classes.overlay}>
          <div className={classes.auth}>
            <div className={classes.auth__title}>log In</div>
           
              <form className={classes.auth__form} onSubmit={handleLogin}>
                <div className={classes.form__input}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className={classes.form__input}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
                <div
                  className={classes.form__link}
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </div>
                <button type="submit" className={classes.form__submit}>
                  Login
                </button>
                {errorMessage && <div>{errorMessage}</div>}
              </form>
        
          </div>
        </div>,

        modalElement
      )
    : null;
  
};

export default Login;
