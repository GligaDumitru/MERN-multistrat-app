/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
import { createProject, selectState } from "../../features/auth/authSlice";
import Textarea from "@material-tailwind/react/Textarea";

const AddProject = ({ handleClose }) => {
  const initialValues = {
    name: "",
    description: "",
    imageLink: "",
    address: "",
  };
  const [values, setValues] = useState(initialValues);

  const { loading, successMessage, user } =
    useSelector(selectState);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, imageLink, description, address } = values;
    dispatch(
      createProject({
        name,
        imageLink,
        description,
        managedBy: user.id,
        subtasks: [],
        address,
      })
    );
  };

  useEffect(() => {
    if (!loading && successMessage) {
      setValues({
        ...initialValues,
      });
      handleClose();
    }
  }, [loading, successMessage]);

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
                value={values.imageLink}
                name="imageLink"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="text"
                color="lightBlue"
                placeholder="Project Address"
                iconName="add_location"
                value={values.address}
                name="address"
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
                size="lg"
                ripple="dark"
                type="submit"
                className="w-full"
              >
                {loading ? "Loading" : "Create"}
              </Button>
            </div>
            <div className="mt-4 pt-2 border-t-2">
              <Paragraph color="blueGray">
                A project will be created and will be able to see it on projects
                list <br />
              </Paragraph>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddProject;
