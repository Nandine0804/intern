import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar";
import Popular from "./Popular";
import Story from "./Story";
import About from "./About";
import Journel from "./Journel";
import Quotes from "./Quote";
import Footer from "./Footer";
function App() {
  return (
    <div className="App">
      <Navbar />

      <About />

      <Journel />
      <Quotes />
      {/* <Popular /> */}
      <Story />

      <Footer />
    </div>
  );
}

export default App;
