import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@material-tailwind/react/Navbar";
import clsx from "clsx";
import { useLocation } from 'react-router-dom';
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Icon from "@material-tailwind/react/Icon";

const NavbarList = [
  {
    to: "/profile",
    name: "Profile",
    icon: "account_circle",
  },
  {
    to: "/login",
    name: "Account",
    icon: "person",
  },
  {
    to: "/dashboard",
    name: "Dashboard",
    icon: "dashboard",
  },
];
export default function DefaultNavbar() {
  const location = useLocation().pathname;
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar
      color="transparent"
      navbar
      className="bg-gray-900 lg:bg-transparent"
    >
      <NavbarContainer>
        <NavbarWrapper>
          <Link to="/">
            <NavbarBrand>EMS</NavbarBrand>
          </Link>
          <NavbarToggler
            onClick={() => setOpenNavbar(!openNavbar)}
            color="white"
          />
        </NavbarWrapper>
        <NavbarCollapse open={openNavbar}>
          <Nav>
            {NavbarList.map(({ to, name, icon }, index) => (
              <NavbarWrapper key={index} className="mx-2">
                <Link to={to}>
                  <div
                    className={clsx(
                      "flex justify-center items-center w-full  p-3 font-medium cursor-pointer whitespace-no-wrap rounded-md text-gray-900 text-white hover:bg-light-blue-500 hover:shadow-md-light-blue transition-all duration-300",
                      location === to && "text-white bg-gradient-to-tr from-light-blue-500 to-light-blue-700 shadow-md-light-blue transition-all duration-300"
                    )}
                  >
                    <Icon name={icon} size="2xl" color="white" />
                    <span className="ml-2">{name}</span>
                  </div>
                </Link>
              </NavbarWrapper>
            ))}
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
}
