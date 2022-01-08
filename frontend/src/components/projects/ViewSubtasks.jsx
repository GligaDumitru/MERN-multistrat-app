import React from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Table from "../shared/Table";
import Icon from "@material-tailwind/react/Icon";

const ViewSubtasks = () => {
  return (
    <Card>
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Project Subtasks</h2>
          <Button iconOnly rounded color="blue" ripple="light">
            <Icon name="edit" />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table />
      </CardBody>
    </Card>
  );
};

export default ViewSubtasks;
