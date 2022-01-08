import { Button } from "gpl-tailwind-theme";
import LayoutPage from "./LayoutPage";
import { useState } from "react";
import SearchPerson from "./SearchPerson";
import Icon from "@material-tailwind/react/Icon";
import Modal from "../Modal";
import AddPerson from "./AddPerson";
import Breadcrumb from "../shared/Breadcrumb";

export default function ViewPeople() {
  const [showModal, setShowModal] = useState(false);

  const routesBreadcrumb = [
    {
      name: "",
      icon: "home",
      urlTo: "/",
    },
    {
      name: "People",
      icon: "people",
      urlTo: "/people",
    },
  ];
  return (
    <LayoutPage>
      <div className="p-8">
        <Breadcrumb routes={routesBreadcrumb} />
        <div className="py-4 flex items-center">
          <Button
            color="blue"
            ripple="light"
            onClick={() => setShowModal(true)}
          >
            <Icon name="add" /> Add New Employee
          </Button>
        </div>
        <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
          <AddPerson />
        </Modal>
        <SearchPerson />
      </div>
    </LayoutPage>
  );
}
