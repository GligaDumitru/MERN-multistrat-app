import React from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import Paragraph from "@material-tailwind/react/Paragraph";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRequest, selectState } from "../../features/auth/authSlice";
import Select from "../shared/Select";
import { getFieldFromArrObjsByValue } from "../../utils";
import { add } from "date-fns";

const RequestTypes = [
  {
    id: "1111",
    name: "Vacation",
    subtasks: [
      {
        name: "Vacation",
      },
    ],
  },
  {
    id: "1111",
    name: "Special Leave",
    subtasks: [
      {
        name: "Marriage",
      },
      {
        name: "Bird of Child",
      },
      {
        name: "Blood Donation",
      },
    ],
  },
];

const AddRequest = () => {
  const [values, setValues] = useState({
    startDate: "2022-01-12",
    nrOfDays: 2,
    days: ["8", "8"],
    requestType: "Special Leave",
    subtask: { name: "Blood Donation" },
  });

  const { status, user } = useSelector(selectState);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { startDate, days, requestType, subtask } = values;
    dispatch(
      createRequest({
        startDate,
        days,
        requestType,
        task: subtask.name,
        managedBy: user.managedBy,
        userId: user.id,
      })
    );
  };

  const { requestType, subtask } = values;

  const handleOnSelectType = ({ name }) => {
    setValues({
      ...values,
      requestType: name,
    });
  };
  const handleOnSelectSubtask = (task) => {
    setValues({
      ...values,
      subtask: task,
    });
  };

  const handleInputHoursChange = (e) => {
    const idx = e.target.name.split("-")[1];
    const _temp = [...values.days];
    _temp[idx] = e.target.value;
    setValues({
      ...values,
      days: [..._temp],
    });
  };

  return (
    <div className="m-4 mx-auto">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader color="lightBlue">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Create New Request
            </H5>
          </CardHeader>

          <CardBody>
            <div className="mb-10 px-4">User</div>
            <div className="mb-10 px-4">
              {/* <InputIcon
                type="date"
                color="lightBlue"
                placeholder="Start Date (MM/DD/YYYY)"
                iconName="date"
                value={values.startDate}
                name="startDate"
                onChange={handleInputChange}
              /> */}
              <input
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="number"
                min={1}
                max={8}
                color="lightBlue"
                placeholder="# of days"
                iconName="image"
                value={values.nrOfDays}
                name="nrOfDays"
                onChange={({ target: { value } }) => {
                  setValues({
                    ...values,
                    nrOfDays: value,
                    days: [...Array(Number(value)).fill(0)],
                  });
                }}
              />
            </div>
            <div className="mb-10 px-4">
              <span className="text-gray-500 font-xs">Request type</span>
              <Select
                options={RequestTypes}
                selected={
                  requestType
                    ? getFieldFromArrObjsByValue(
                        RequestTypes,
                        "name",
                        requestType
                      )
                    : { name: "Select..." }
                }
                onSelect={(item) => handleOnSelectType(item)}
              />
            </div>
            <div className="mb-10 px-4">
              <span className="text-gray-500 font-xs">Request task</span>
              <Select
                options={
                  requestType
                    ? getFieldFromArrObjsByValue(
                        RequestTypes,
                        "name",
                        requestType
                      ).subtasks
                    : { name: "Select..." }
                }
                selected={
                  requestType && subtask ? subtask : { name: "Select..." }
                }
                onSelect={(item) => handleOnSelectSubtask(item)}
              />
            </div>
            <div className="mb-10 px-4">
              {values.days.map((day, index) => {
                const currentDay = new Date(
                  add(new Date(values.startDate), { days: index })
                ).toDateString();
                return (
                  <div className="flex border-b-2 pb-2 justify-between">
                    <div className="p-2 px-4">{index + 1}.</div>
                    <div className="p-2 px-4 text-gray-500">{currentDay}</div>
                    <div className="">
                      <InputIcon
                        type="number"
                        min={1}
                        max={8}
                        color="lightBlue"
                        iconName="image"
                        value={day}
                        name={`hour-${index}`}
                        onChange={handleInputHoursChange}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                color="lightBlue"
                size="lg"
                ripple="dark"
                type="submit"
                className="w-full"
              >
                {status === "loading" ? "Loading" : "Create"}
              </Button>
            </div>
            <div className="mt-4 pt-2 border-t-2">
              <Paragraph color="blueGray">
                A request will be created and will be able to see it on requests
                list <br />
              </Paragraph>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddRequest;
