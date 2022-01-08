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
import { Link } from "react-router-dom";
import DefaultFooter from "../components/DefaultFooter";
import { useSelector, useDispatch } from "react-redux";
import { registerAsync, selectState } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Alert from "@material-tailwind/react/Alert";

export default function Register() {
  const [values, setValues] = useState({
    name: "admin",
    email: "gligadumitru98@gmail.com",
    password: "parola111",
    confirmPassword: "parola111",
  });
  // successRegister
  const { status, errors, message, isLoggedIn } = useSelector(selectState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    // TODO: handle information validation
    dispatch(registerAsync({ name, email, password }));
  };

  return (
    <>
      <Page className="static">
        <DefaultNavbar />
        <div className="absolute bottom-2 right-2">
          {errors && errors.length > 0 && (
            <Alert color="red">{`${message} | ${errors[0]}`}</Alert>
          )}
            {message && errors.length === 0 &&  (
            <Alert color="red">{`${message}`}</Alert>
          )}
        </div>
        <Container>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="lightBlue">
                <H5 color="white" style={{ marginBottom: 0 }}>
                  Create an account
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
                    type="password"
                    color="lightBlue"
                    placeholder="Password"
                    iconName="lock"
                    value={values.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4 px-4">
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
                <div className="flex justify-center">
                  <Button
                    color="lightBlue"
                    buttonType="outline"
                    size="lg"
                    ripple="dark"
                    type="submit"
                  >
                    {status === "loading" ? "Loading" : "Register"}
                  </Button>
                </div>
                <div className="mt-4 pt-2 border-t-2">
                  <Paragraph color="blueGray">
                    Already an account? Please{" "}
                    <Link
                      to="/login"
                      className="inline-block text-blue-700 hover:text-blue-900 p-2 pl-0"
                    >
                      login
                    </Link>
                  </Paragraph>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Container>
      </Page>
      <DefaultFooter />
    </>
  );
}
