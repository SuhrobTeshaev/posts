import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import List from "./components/posts/post";
import Login from "./shared/auth/login";
import Signup from "./shared/auth/signup";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          {!isAuthenticated ? (
            <>
            
              <Route path="/" element={<Navigate replace to="/login" />} />
              
              
              <Route
                path="login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
           
              
              <Route
                path="signup"
                element={<Signup setIsAuthenticated={setIsAuthenticated} />}
                />
              <Route
                path="login/signup"
                element={<Navigate replace to="/signup" />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate replace to="/posts" />} />
              <Route path="posts" element={<List />} />
            </>
          )}
          {/* Redirect unknown routes to home/login or signup depending on authentication */}
          <Route
            path="*"
            element={
              <Navigate replace to={isAuthenticated ? "/posts" : "/login"} />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
