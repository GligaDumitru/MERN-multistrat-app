import { Link } from "react-router-dom";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import { useDispatch, useSelector } from "react-redux";
import { selectState, logout } from "../features/auth/authSlice";
import Image from "@material-tailwind/react/Image";

const NavbarList = [
  {
    to: "/profile",
    name: "Profile",
    icon: "account_circle",
  },
  {
    to: "/settings",
    name: "Settings",
    icon: "settings",
  },
];

const CurrentUserDropdown = () => {
  const { user } = useSelector(selectState);
  const dispatch = useDispatch();

  return (
    <Dropdown
      color="transparent"
      size="sm"
      buttonType="link"
      buttonText={
        <div className="py-2.5 font-medium flex items-center">
          <div className="w-12">
            <Image src={user?.imageLink} rounded />
          </div>
          <span className="ml-2">{user?.name}</span>
        </div>
      }
      ripple="light"
    >
      {NavbarList.map(({ to, name, icon }, idx) => (
        <Link key={idx} to={to}>
          <DropdownItem color="lightBlue">
            <div className="flex items-center text-dark">
              <Icon name={icon} size="xl" />{" "}
              <span className="inline-block pl-4">{name}</span>
            </div>
          </DropdownItem>
        </Link>
      ))}

      <Link to="/" onClick={() => dispatch(logout())}>
        <div className="border-t-2 border-gray-100">
          <DropdownItem color="lightBlue">
            <div className="flex items-center text-dark">
              <Icon name="logout" size="xl" />{" "}
              <span className="inline-block pl-4">Logout</span>
            </div>
          </DropdownItem>
        </div>
      </Link>
    </Dropdown>
  );
};

export default CurrentUserDropdown;
