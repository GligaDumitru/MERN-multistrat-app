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
import { forgotPasswordAsync, selectState } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [values, setValues] = useState({
    email: "gligadumitru98@gmail.com",
  });

  const { status, errors, message, isLoggedIn } = useSelector(selectState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push("/");
    }
    if (status === "emailSent") {
      history.push(`/email-sent?email=${values.email}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, history, status]);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAsync(values));
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
                  Oops!
                </H5>
              </CardHeader>
              <CardBody>
                <div className="mb-0 px-4 bg-bb">
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
              </CardBody>
              <CardFooter>
                <div className="w-full bg-bb">
                  <Button
                    color="lightBlue"
                    buttonType="outline"
                    className="w-full"
                  >
                    {status === "loading" ? "Loading" : "Get Reset Link"}
                  </Button>
                </div>

                <div className="mt-4 pt-2 border-t-2">
                  <Paragraph color="blueGray">
                    Remember the password? Please{" "}
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
