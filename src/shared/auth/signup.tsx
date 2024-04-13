import classes from "./auth.module.scss";
import { useCreateUserMutation } from "../../futuries/userSlice/authSlice";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  setIsAuthenticated: (value: boolean) => void;
}

const modalElement = document.getElementById("modal");


const Signup = ({ setIsAuthenticated }:SignupProps) => {
  const [createUser] = useCreateUserMutation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleAlreadyHaveAccountClick = () => {
    navigate("/login");
  };

 const handleSubmit = async (e: any) => {
   e.preventDefault();

   try {
     const result = await createUser({ email, name, password }).unwrap();
     setIsAuthenticated(true);
    
     console.log("Registration successful", result);
   } catch (error) {
     console.error("Registration error", error);
     alert("Registration failed"); 
   }
 };

  return modalElement
    ? createPortal(
        <div className={classes.overlay}>
          <div className={classes.auth}>
            <div className={classes.auth__title}>Sign Up</div>
            <form className={classes.auth__form} onSubmit={handleSubmit}>
              <div className={classes.form__input}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="off"
                  required
                />
              </div>

              <div className={classes.form__input}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoComplete="off"
                  required
                />
              </div>
              <div className={classes.form__input}>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="off"
                  required
                />
              </div>

              <div
                className={classes.form__link}
                onClick={handleAlreadyHaveAccountClick}
              >
                I already have an account
              </div>
              <button type="submit" className={classes.form__submit}>
                Create an account
              </button>
            </form>
          </div>
        </div>,

        modalElement
      )
    : null;
    // </section>
  
};

export default Signup;
