import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import H3 from "@material-tailwind/react/Heading3";
import Icon from "@material-tailwind/react/Icon";
import LeadText from "@material-tailwind/react/LeadText";
import { useHistory } from "react-router-dom";

const Content = ({ user }) => {
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
    email,
  } = user;

  const fullAddress = `${address}, ${city}, ${country}, ${postalCode}`;
  const history = useHistory();
  return (
    <section className="relative py-16 bg-gray-100">
      <div className="container max-w-7xl px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="w-40 -mt-20">
                    <Image
                      src={imageLink}
                      alt="Profile picture"
                      raised
                      rounded
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                <Button
                  color="lightBlue"
                  onClick={() => history.push("/settings")}
                  ripple="light"
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="text-center my-8">
              <H3 color="gray">{name}</H3>
              <div className="m-1 text-gray-700 font-medium flex items-center justify-center gap-2">
                <Icon name="place" size="xl" />
                {fullAddress}
              </div>
              <div className="m-1 text-gray-700 font-medium flex items-center justify-center gap-2">
                <Icon name="work" size="xl" />
                {position} - EMS.ro
              </div>
              <div className="m-1 text-gray-700 font-medium flex items-center justify-center gap-2">
                <Icon name="person" size="xl" />
                Manager - Admin
              </div>
              <div className="m-1 text-gray-700 font-medium flex items-center justify-center gap-2">
                <Icon name="mail" size="xl" />
                {email}
              </div>
            </div>

            <div className="mb-10 py-2 border-t border-gray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4 flex flex-col items-center">
                  <LeadText color="blueGray">{description}</LeadText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Content.defaultProps = {
  user: {
    name: "Name Here",
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fuga modi natus laborum esse voluptates, dolorem unde. Ex
                    illo ratione eveniet vel similique? Magni tenetur alias
                    explicabo vel recusandae minus omnis!
    `,
    position: "Developer",
    companyName: "Company.yo",
    manager: "John Doe",
    phoneNumber: "0123123123",
    email: "john.doe@company.yp",
    imageLink: "https://via.placeholder.com/150",
    city: "Iasi",
    country: "Romania",
    postalCode: "700123",
    address: "Str.Strret",
  },
};

export default Content;
