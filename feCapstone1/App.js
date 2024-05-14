import Header from "./components/Header/Header";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App(props) {
  let param1 = useLocation();
  return (
    <>
      {param1["pathname"].includes("admin") ? null : <Header />}
      {/* <Header /> */}
      {props.children}
      {param1["pathname"].includes("admin") ||
      param1["pathname"].includes("findjob") ? null : (
        <Footer />
      )}
    </>
  );
}

export default App;
