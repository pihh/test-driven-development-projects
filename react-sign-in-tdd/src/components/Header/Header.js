import './Header.css'
import { Link } from "react-router-dom";


const Header = function ({ location }) {
  const currentPath = location.pathname;
  let links = [];
  if (currentPath == "/") {
    links = [{ name: "post-1", to: "/post/1", test:"app-header--navbar-link-post"}];
  } else {
    links = [{ name: "home", to: "/", test:"app-header--navbar-link-home"}];
  }
  return (
    <header data-testid="component-header--wrapper">
      <nav data-testid="component-header--navbar" className="app-header--navbar">
        <section>&nbsp;</section>
        <section>
          <h1 data-testid="app-header--navbar-title">App 
            <span>
                {currentPath}
            </span>
            </h1>
        </section>
        <section>
          {links.map((el) => (
            <Link to={el.to} key={el} data-testid={el.test}>
              <button>{el.name}</button>
            </Link>
          ))}
        </section>
      </nav>
    </header>
  );
};

export default Header;
