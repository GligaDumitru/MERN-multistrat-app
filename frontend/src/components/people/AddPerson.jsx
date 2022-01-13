/* eslint-disable react-hooks/exhaustive-deps */
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import Paragraph from "@material-tailwind/react/Paragraph";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmployee,
  selectState,
  setField,
} from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { Alert } from "gpl-tailwind-theme";
import Select from "../shared/Select";

const ROLES = [
  {
    name: "user",
  },
  {
    name: "admin",
  },
  {
    name: "manager",
  },
];

export default function AddPerson() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: {
      name: "user",
    },
  };
  const [values, setValues] = useState({
    ...initialValues,
  });

  const { successMessage, errors, message, user, loading } =
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
    const { name, email, password, role } = values;
    dispatch(
      createEmployee({
        name,
        role: role.name,
        email,
        password,
        managedBy: user.id,
      })
    );
  };

  useEffect(() => {
    if (!loading && successMessage) {
      setValues({
        ...initialValues
      });
    }
  }, [loading, successMessage]);

  return (
    <>
      <div className="absolute bottom-2 right-2">
        {(message || errors.length > 0) && (
          <Alert
            color="red"
            icon="error"
            iconSize="xl"
            iconPosition="center"
            closeIcon="close"
            closeIconPosition="center"
            hideAfter={10000}
            className="fixed bottom-2 right-2 inline-block"
            handleClose={() => {
              dispatch(setField({ name: "message", value: "" }));
              dispatch(setField({ name: "errors", value: [] }));
            }}
          >
            <span>
              {message && message} {errors && errors.length > 0 && errors[0]}
            </span>
          </Alert>
        )}
        {successMessage && (
          <Alert
            color="green"
            icon="check"
            iconSize="xl"
            iconPosition="center"
            closeIcon="close"
            closeIconPosition="center"
            hideAfter={10000}
            className="fixed bottom-2 right-2 inline-block"
            handleClose={() => {
              dispatch(setField({ name: "successMessage", value: "" }));
            }}
          >
            <span>{successMessage}</span>
          </Alert>
        )}
      </div>
      <div className="m-4 mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader color="lightBlue">
              <H5 color="white" style={{ marginBottom: 0 }}>
                Add new person
              </H5>
            </CardHeader>

            <CardBody>
              <div className="mb-10 px-4">
                <InputIcon
                  type="text"
                  color="lightBlue"
                  placeholder="Full Name"
                  iconName="account_circle"
                  value={values.name}
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-10 px-4">
                <InputIcon
                  type="email"
                  color="lightBlue"
                  placeholder="Email Address"
                  iconName="email"
                  value={values.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-10 px-4">
                <InputIcon
                  type="text"
                  color="lightBlue"
                  placeholder="Password"
                  iconName="lock"
                  value={values.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-10 px-4">
                <span>Select Role</span>
                <Select
                  options={ROLES}
                  selected={values.role}
                  onSelect={(option) => setValues({ ...values, role: option })}
                />
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
                  className="w-full"
                >
                  {loading === "loading" ? "Loading" : "Create"}
                </Button>
              </div>
              <div className="mt-4 pt-2 border-t-2">
                <Paragraph color="blueGray">
                  An email will be sent in order for the new user to <br />
                  change his password and start use the account
                </Paragraph>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
