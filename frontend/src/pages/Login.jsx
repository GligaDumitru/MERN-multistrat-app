import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Checkbox from "@material-tailwind/react/Checkbox";
import Button from "@material-tailwind/react/Button";
import DefaultNavbar from "../components/DefaultNavbar";
import Page from "../components/login/Page";
import Container from "../components/login/Container";
import Paragraph from "@material-tailwind/react/Paragraph";
import { Link } from "react-router-dom";
import DefaultFooter from "../components/DefaultFooter";

export default function Login() {
  return (
    <>
      <Page>
        <DefaultNavbar />
        <Container>
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
                />
              </div>
              <div className="mb-8 px-4">
                <InputIcon
                  type="password"
                  color="lightBlue"
                  placeholder="Password"
                  iconName="lock"
                />
              </div>
              <div className="mb-4 px-4">
                <Checkbox color="lightBlue" text="Remember Me" id="remember" />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center bg-bb">
                <Button color="lightBlue" buttonType="outline" size="lg">
                  Login
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
            </CardFooter>
          </Card>
        </Container>
      </Page>
      <DefaultFooter />
    </>
  );
}
