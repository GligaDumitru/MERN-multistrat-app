import React, { useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import Button from "@material-tailwind/react/Button";
import Paragraph from "@material-tailwind/react/Paragraph";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import { getMondays } from "../../utils";
import InputIcon from "@material-tailwind/react/InputIcon";

const SelectTimesheetToCreate = ({ onCreate }) => {
  const [currentSelection, setCurrentSelection] = useState("");

  const mondays = getMondays().slice(0, 5);

  const handleOnClickDropdown = (val) => {
    setCurrentSelection(val);
  };

  return (
    <div className="m-4 mx-auto">
      <Card>
        <CardHeader color="lightBlue">
          <H5 color="white" style={{ marginBottom: 0 }}>
            Create Timesheet
          </H5>
        </CardHeader>

        <CardBody>
          <input className="hidden" id="currentTS" />

          <div className="flex">
            <div className="mr-4">
              <InputIcon
                type="text"
                color="lightBlue"
                placeholder="Timesheet start date"
                iconName="image"
                value={currentSelection}
                name="logo"
              />
            </div>

            <Dropdown
              color="lightBlue"
              placement="bottom-start"
              buttonText="Select Date"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              ripple="light"
            >
              {mondays.map((mon, index) => (
                <DropdownItem
                  onClick={() => handleOnClickDropdown(mon)}
                  key={index}
                  color="lightBlue"
                  ripple="light"
                >
                  {mon}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex justify-center">
            <Button
              color="lightBlue"
              buttonType="outline"
              size="lg"
              ripple="dark"
              className="w-full"
              onClick={() => onCreate(currentSelection)}
            >
              Create
            </Button>
          </div>
          <div className="mt-4 pt-2 border-t-2">
            <Paragraph color="blueGray">
              A timesheet will be created and you will be able to see it on
              timesheets list <br />
            </Paragraph>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SelectTimesheetToCreate;
