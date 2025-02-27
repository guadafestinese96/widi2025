import Footer from "../footer/Footer";
import Header from "../header/Header";
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
