import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import H5 from "@material-tailwind/react/Heading5";
import Icon from "@material-tailwind/react/Icon";
import LeadText from "@material-tailwind/react/LeadText";
import PropTypes from "prop-types";

export default function ProfileCard(props) {
  const {
    name,
    imageLink,
    description,
    address,
    city,
    country,
    postalCode,
    position,
    companyName,
    manager,
    phoneNumber,
    email,
  } = props;
  const fullAddress = `${address}, ${city}, ${country}, ${postalCode}`;
  return (
    <Card>
      <div className="flex flex-wrap justify-center">
        <div className="w-48 px-4 -mt-24">
          <Image src={imageLink} rounded raised />
        </div>
      </div>
      <div className="text-center">
        <H5 color="gray">{name}</H5>
        <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
          <Icon name="place" size="xl" />
          {fullAddress}
        </div>
      </div>
      <div className="border-t border-lightBlue-200 m-4">
        <div className="text-gray-700 flex items-center justify-start my-2 mt-6 gap-2">
          <Icon name="work" size="xl" />
          {position} - {companyName}
        </div>
        <div className="text-gray-700 flex items-center justify-start my-2 gap-2">
          <Icon name="person" size="xl" />
          Manager - {manager}
        </div>
        <div className="text-gray-700 flex items-center justify-start my-2 gap-2">
          <Icon name="phone" size="xl" />
          {phoneNumber}
        </div>
        <div className="text-gray-700 flex items-center justify-start my-2 gap-2">
          <Icon name="mail" size="xl" />
          {email}
        </div>
      </div>
      <CardBody>
        <div className="border-t border-lightBlue-200 text-center px-2 ">
          <LeadText color="blueGray">{description}</LeadText>
        </div>
      </CardBody>
    </Card>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  position: PropTypes.string,
  companyName: PropTypes.string,
  manager: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  imageLink: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  postalCode: PropTypes.string,
};

ProfileCard.defaultProps = {
  name: "Name Here",
  description: "Lorem Ipsum",
  address: "City, Country",
  position: "Developer",
  companyName: "Company.yo",
  manager: "John Doe",
  phoneNumber: "0123123123",
  email: "john.doe@company.yp",
  imageLink: "https://via.placeholder.com/150",
  city: "",
  country: "",
  postalCode: "",
};
