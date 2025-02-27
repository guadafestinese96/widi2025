import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="bodyLayout">
      <Header /> 
      <Footer />
      <div className="childrenContainer">{children}</div>
    </div>
  );
}
