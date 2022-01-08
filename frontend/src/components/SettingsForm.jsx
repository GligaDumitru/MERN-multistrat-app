import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";

export default function SettingsForm(props) {
  const { values, handleSubmit, handleInputChange } = props;

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader color="lightBlue" contentPosition="none">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">My Account</h2>
            <Button type="submit" color="lightBlue" ripple="dark">
              Save
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <h6 className="text-green-500 text-sm mt-3 mb-6 font-light uppercase">
            User Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <Input
                type="email"
                color="purple"
                disabled
                placeholder="Email Address"
                className="text-gray-100 disabled"
                style={{ color: "gray", cursor: "not-allowed" }}
                value={values.email}
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Full Name"
                value={values.name}
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full pr-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Image Link"
                value={values.imageLink}
                name="imageLink"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h6 className="text-green-500 text-sm my-6 font-light uppercase">
            Contact Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-12/12 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Address"
                value={values.address}
                name="address"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="City"
                value={values.city}
                name="city"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Country"
                value={values.country}
                name="country"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Postal Code"
                value={values.postalCode}
                name="postalCode"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h6 className="text-green-500 text-sm my-6 font-light uppercase">
            About Me
          </h6>
          <div className="flex flex-wrap mt-10 font-light">
            <Textarea
              color="purple"
              placeholder="About Me"
              value={values.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>
        </CardBody>
      </form>
    </Card>
  );
}
