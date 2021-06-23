import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";

import "./assets/css/demo.css";


import { Layout } from './components/Layout';
//import { NavigationBar } from './components/NavigationBar';
//import { Jumbotron } from './components/Jumbotron';
import AdminNavbar from "./components/Navbars/AdminNavBar";
import Sidebar from "./components/Sidebar/Sidebar"
import FixedPlugin from "./components/FixedPlugin/FixedPlugin.js";
import routes from "./components/routes";
import sidebarImage from "./assets/img/sidebar-3.jpg";

export default function App() {

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  //const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <React.Fragment>

        <Router>
        <Layout>
        <div className="wrapper">
        <Sidebar routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>

        </div>
      </div>






        </Layout>
    </Router>
    <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </React.Fragment>
  );
}







