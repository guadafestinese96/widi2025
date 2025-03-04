import Footer from "../footer/Footer";
import RedesContainer from "../redes/RedesContainer";
import Header2 from "./Header2";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="bodyLayout">
      <Header2/>
      <Footer/>
      
      <div className="childrenContainer">{children}</div>
      
    </div>
  );
}
