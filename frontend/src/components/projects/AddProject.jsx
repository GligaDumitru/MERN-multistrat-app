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
import {
  registerAsync,
  selectState,
} from "../../features/auth/authSlice";
import Textarea from "@material-tailwind/react/Textarea";

const AddProject = () => {
  const [values, setValues] = useState({
    name: "Project EMS9",
    email: "gligadumitru98@gmail.com",
    description: "",
    logo: "",
    password: "parola111",
  });

  const { status } = useSelector(selectState);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    dispatch(registerAsync({ name, email, password }));
  };

  return (
    <div className="m-4 mx-auto">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader color="lightBlue">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Add project
            </H5>
          </CardHeader>

          <CardBody>
            <div className="mb-10 px-4">
              <InputIcon
                type="text"
                color="lightBlue"
                placeholder="Project Name"
                iconName="account_tree"
                value={values.name}
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="text"
                color="lightBlue"
                placeholder="Project Logo Url"
                iconName="image"
                value={values.logo}
                name="logo"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-10 px-4">
              <Textarea
                color="lightBlue"
                placeholder="Description"
                value={values.description}
                name="description"
                onChange={handleInputChange}
              ></Textarea>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                color="lightBlue"
                buttonType="outline"
                size="lg"
                ripple="dark"
                type="submit"
              >
                {status === "loading" ? "Loading" : "Create"}
              </Button>
            </div>
            <div className="mt-4 pt-2 border-t-2">
              <Paragraph color="blueGray">
                A project will be created and will be able to see it on projects list <br />
              </Paragraph>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddProject;
