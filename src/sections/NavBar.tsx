import React, { useEffect, useMemo } from "react";
import pokeballIcon from "../assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  // Define the navigation routes using useMemo to memoize the routes array
  const navigationRoutes = useMemo(
    () => [
      {
        name: "Search",
        route: "/search",
      },
      {
        name: "Compare",
        route: "/compare",
      },
      {
        name: "Pokemon",
        route: "/pokemon",
      },
      {
        name: "My List",
        route: "/list",
      },
      {
        name: "About",
        route: "/about",
      },
    ],
    []
  );

  useEffect(() => {
    // Find the index of the current route in the navigationRoutes array
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );
    // Call the ul function to update the underlines based on the current index
    ul(index);
  }, [location.pathname, navigationRoutes]);

  function ul(index: number) {
    // Get all elements with class "underline"
    const underlines = document.querySelectorAll<HTMLElement>(".underline");
    for (let i = 0; i < underlines.length; i++) {
      // Translate the underlines horizontally based on the current index
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
    }
  }

  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="pokeball icon" />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          <div className="underline"></div>
          <div className="underline"></div>

          {navigationRoutes.map(({ name, route }, index) => {
            return (
              <Link to={route} key={index}>
                <li>{name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
}

export default NavBar;
