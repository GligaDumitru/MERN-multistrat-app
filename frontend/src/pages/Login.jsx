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
import { loginAsync, selectState } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

export default function Login() {
  const [values, setValues] = useState({
    email: "gligadumitru98@gmail.com",
    password: "parola98",
  });

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
    dispatch(loginAsync(values));
  };
  return (
    <>
      <Page className="static">
        <DefaultNavbar />
        <div className="absolute bottom-2 right-2">
          {errors && errors.length > 0 && (
            <Alert color="red">{`${message} | ${errors[0]}`}</Alert>
          )}
        </div>
        <Container>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="lightBlue">
                <H5 color="white" style={{ marginBottom: 0 }}>
                  Welcome back
                </H5>
              </CardHeader>
              <CardBody>
                <div className="mb-12 px-4 bg-bb">
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
                <div className="mb-2 px-4">
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
              </CardBody>
              <CardFooter>
                <div className="flex justify-center bg-bb">
                  <Button color="lightBlue" buttonType="outline" size="lg">
                    {status === "loading" ? "Loading" : "Login"}
                  </Button>
                </div>

                <div className="mt-4 pt-2 border-t-2">
                  <Paragraph color="blueGray">
                    Not having an account? Please{" "}
                    <Link
                      to="/register"
                      className="inline-block text-blue-700 hover:text-blue-900 p-2 pl-0"
                    >
                      register
                    </Link>
                  </Paragraph>
                </div>
                <div className="p-0 m-0">
                  <Paragraph color="blueGray">
                    <Link
                      to="/forgot-password"
                      className="inline-block text-gray-700 hover:text-blue-900 p-0"
                    >
                      Forgot Password?
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
