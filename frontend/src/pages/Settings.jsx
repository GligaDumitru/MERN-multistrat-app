/* eslint-disable react-hooks/exhaustive-deps */
import SettingsForm from "../components/SettingsForm";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectState,
  updateUserDataAsync,
  setField,
} from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { Alert } from "gpl-tailwind-theme";

export default function Settings() {
  const { user, errors, message, success } = useSelector(selectState);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    imageLink: "",
    username: "",
    email: "",
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    description: "",
  });

  useEffect(() => {
    setValues({
      ...values,
      ...user,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { imageLink, name, address, city, country, postalCode, description } =
      values;
    const { id } = user;
    const payload = {
      imageLink,
      name,
      address,
      city,
      country,
      postalCode,
      description,
    };
    dispatch(updateUserDataAsync({ id, payload }));
  };

  return (
    <>
      <Sidebar />

      {errors && errors.length > 0 && (
        <Alert
          color="red"
          icon="error"
          iconSize="xl"
          iconPosition="center"
          closeIcon="close"
          closeIconPosition="center"
          hideAfter={5000}
          className="fixed bottom-2 right-2 inline-block"
          handleClose={() => dispatch(setField({ name: "errors", value: [] }))}
        >
          {`${message} | ${errors[0]}`}
        </Alert>
      )}
      {success && (
        <Alert
          color="green"
          icon="check"
          iconSize="xl"
          iconPosition="center"
          closeIcon="close"
          className="fixed bottom-2 right-2 inline-block"
          closeIconPosition="center"
          hideAfter={2000}
          handleClose={() => dispatch(setField({ name: "success", value: "" }))}
        >
          {`${success}`}
        </Alert>
      )}
      <div className="md:ml-64 md:pt-64 bg-gray-100">
        <div className="px-3 md:px-8 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 xl:grid-cols-6">
              <div className="xl:col-start-1 xl:col-end-5 px-4 mb-16">
                <SettingsForm
                  values={values}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              </div>
              <div className="xl:col-start-5 xl:col-end-7 px-4 mb-16 mt-14">
                <ProfileCard {...values} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
