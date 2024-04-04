import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import List from "./components/posts/post";


function App() {
  return (
    <div className="app">
      <Toaster/>
      <Header />
      <List />
      <Footer />
    </div>
  );
}

export default App;
