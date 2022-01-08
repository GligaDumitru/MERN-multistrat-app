import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import DefaultNavbar from "../components/DefaultNavbar";
import Page from "../components/login/Page";
import Container from "../components/login/Container";
import Paragraph from "@material-tailwind/react/Paragraph";
import Alert from "@material-tailwind/react/Alert";
import { Link } from "react-router-dom";
import DefaultFooter from "../components/DefaultFooter";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { resetPasswordAsync, selectState } from "../features/auth/authSlice";
import { useState } from "react";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "parola111",
    confirmPassword: "parola111",
    token: "",
  });

  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const resetToken = query.get("token");

  const { status, message } = useSelector(selectState);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      password: values.password,
      token: resetToken,
    };
    dispatch(resetPasswordAsync(payload));
  };
  return (
    <>
      <Page className="static">
        <DefaultNavbar />
        <div className="absolute bottom-2 right-2">
          {message && <Alert color="red">{`${message}`}</Alert>}
        </div>
        <Container>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="lightBlue">
                <H5 color="white" style={{ marginBottom: 0 }}>
                  Reset Password
                </H5>
              </CardHeader>
              <CardBody>
                <div className="mb-12 px-4 bg-bb">
                  <InputIcon
                    type="password"
                    color="lightBlue"
                    placeholder="Password"
                    iconName="lock"
                    value={values.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-0 px-4 bg-bb">
                  <InputIcon
                    type="password"
                    color="lightBlue"
                    placeholder="Confirm Password"
                    iconName="lock"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onChange={handleInputChange}
                  />
                </div>
              </CardBody>
              <CardFooter>
                {status === "password-changed" ? (
                  <div className="flex justify-center bg-bb mb-4">
                    <Button type="reset" color="green" buttonType="outline" size="lg">
                      Password changed successfully
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center bg-bb mb-4">
                    <Button color="lightBlue" buttonType="outline" size="lg">
                      {status === "loading" ? "Loading" : "Reset Password"}
                    </Button>
                  </div>
                )}

                {status === "password-changed" ? (
                  <div className="p-0 m-0">
                    <Paragraph color="blueGray">
                      Please login with the new credentials {" "}
                      <Link
                        to="/login"
                        className="inline-block text-blue-700 hover:text-blue-900 p-0"
                      >
                        Login
                      </Link>
                    </Paragraph>
                  </div>
                ) : (
                  <div className="p-0 m-0">
                    <Paragraph color="blueGray">
                      Remember your password? {status}{" "}
                      <Link
                        to="/login"
                        className="inline-block text-blue-700 hover:text-blue-900 p-0"
                      >
                        Login
                      </Link>
                    </Paragraph>
                  </div>
                )}
              </CardFooter>
            </Card>
          </form>
        </Container>
      </Page>
      <DefaultFooter />
    </>
  );
};

export default ResetPassword;
