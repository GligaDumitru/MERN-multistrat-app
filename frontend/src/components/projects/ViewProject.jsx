import React from "react";
import { Button, H3 } from "gpl-tailwind-theme";
import Image from "@material-tailwind/react/Image";
import Icon from "@material-tailwind/react/Icon";
import LeadText from "@material-tailwind/react/LeadText";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Table from "../shared/Table";
import { Link } from "react-router-dom";

const ViewProject = (props) => {
  const { id, logoURL, name, description, address, showOptions, subtasks } =
    props;

  return (
    <section className="overflow-y-scroll">
      <div className="container max-w-7xl mx-auto ">
        <div className="">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="w-40">
                    <Image src={logoURL} alt="Profile picture" raised rounded />
                  </div>
                </div>
              </div>
              {showOptions && (
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                  <Link to={`/projects/${id}`}>
                    <Button iconOnly rounded color="lightBlue" ripple="light">
                      <Icon name="edit" />
                    </Button>
                  </Link>

                  <Button
                    iconOnly
                    rounded
                    className="ml-4"
                    color="red"
                    ripple="light"
                  >
                    <Icon name="delete" />
                  </Button>
                </div>
              )}
            </div>
            <div className="text-center my-8">
              <H3 color="lightBlue">{name}</H3>
              <div className="mt-0 mb-2 text-gray-700 font-medium flex items-center justify-center gap-2">
                <Icon name="place" size="xl" />
                {address}
              </div>
            </div>

            <div className="mb-10 py-2 border-t border-gray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4 flex flex-col items-center">
                  <LeadText color="blueGray">{description}</LeadText>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader color="blue" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                  <h2 className="text-white text-2xl">Project Subtasks</h2>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  headers={[
                    {
                      label: "name",
                      title: "Task Name",
                    },
                    {
                      label: "createdAt",
                      title: "CreatedAt",
                    },
                    {
                      label: "updatedAt",
                      title: "UpdatedAt",
                    },
                  ]}
                  rows={subtasks}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

ViewProject.defaultProps = {
  id: "123",
  logoURL: "https://via.placeholder.com/350x350",
  name: "Project Name",
  address: "",
  showOptions: true,
  subtasks: [],
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga modi natus laborum esse voluptates, dolorem unde. Ex illo ratione eveniet vel similique? Magni tenetur alias explicabo vel recusandae minus omnis!",
};

export default ViewProject;
