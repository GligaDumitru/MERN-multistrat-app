import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import React, { useState } from "react";
import { createArrayOfAlphabeticallyGrouped } from "../../utils";
import Modal from "../Modal";
import AddProject from "./AddProject";
import ViewProject from "./ViewProject";

const projects = [
  {
    name: "AlphaBank",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "EMSOne",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "EMSTwo",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "EMSTwo",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "EMSTwo",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "EMSTwo",
    logo: "https://via.placeholder.com/350x350",
  },
];

const RenderItem = ({
  name = "Name Here",
  logo = "https://via.placeholder.com/350x350",
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center p-2 ml-4 mb-2 border border-gray-100 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <img src={logo} alt={name} className="w-8 h-8 rounded-full" />
      <span className="inline-block pl-2">{name}</span>
    </li>
  );
};

const ProjectsOverview = () => {
  const [searchedProject, setSearchedProject] = useState("");
  const [selectUser, setSelectUser] = useState({});
  const groupedElementsArray = createArrayOfAlphabeticallyGrouped(projects);
  const [showModal, setShowModal] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  const handleOnChangeInput = (e) => {
    e.preventDefault();
    setSearchedProject(e.target.value);
  };

  const renderListOfProjects = () => {
    return groupedElementsArray.map((el, index) => {
      const [letter, firstLetterElements] = el;
      return (
        <div key={index}>
          <h1>{letter}</h1>
          <ul>
            {firstLetterElements.map((lU, idx) => {
              const showEl = lU.name
                .toLowerCase()
                .includes(searchedProject.toLowerCase());
              return showEl ? (
                <RenderItem
                  onClick={() => {
                    setSelectUser({
                      ...selectUser,
                      ...lU,
                    });
                    setShowModal(true);
                  }}
                  key={idx}
                  {...lU}
                />
              ) : null;
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <>
      <div className="relative my-4">
        <div className="flex justify-between">
          <input
            type="text"
            name="project"
            onChange={handleOnChangeInput}
            placeholder="Search project"
            className="border border-gray-400 rounded-lg p-2 pl-4 mb-4 mr-4"
          />
          <Button
            color="blue"
            ripple="light"
            rounded={true}
            onClick={() => setShowAddProject(true)}
            iconOnly={true}
          >
            <Icon name="add" />
          </Button>
        </div>
        <Modal
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
        >
          <ViewProject/>
        </Modal>
        <Modal
          isOpen={showAddProject}
          handleClose={() => setShowAddProject(false)}
        >
          <AddProject />
        </Modal>
        {renderListOfProjects()}
      </div>
    </>
  );
};

export default ProjectsOverview;
