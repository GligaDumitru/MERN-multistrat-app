import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import Icon from "@material-tailwind/react/Icon";
import H4 from "@material-tailwind/react/Heading4";
import H6 from "@material-tailwind/react/Heading6";
import LeadText from "@material-tailwind/react/LeadText";
import Paragraph from "@material-tailwind/react/Paragraph";
import StatusCard from "./StatusCard";
import Teamwork from "../../assets/img/teamwork.jpeg";

export default function WorkingSection() {
  return (
    <section className="pb-20 bg-gray-100 -mt-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap relative z-50">
          <StatusCard color="red" icon="stars" title="Timesheets Management">
            Divide details about your work
          </StatusCard>
          <StatusCard
            color="lightBlue"
            icon="autorenew"
            title="Requests Manageent"
          >
            Keep you user engaged by providing meaningful information.
          </StatusCard>
          <StatusCard color="teal" icon="fingerprint" title="Company overview">
            See everything about the company
          </StatusCard>
        </div>

        <div className="flex flex-wrap items-center mt-32">
          <div className="w-full md:w-5/12 px-4 mx-auto">
            <div className="flex justify-center items-center">
              <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white mr-4">
                <Icon name="people" size="3xl" />
              </div>
              <H4 color="gray">Working with us is a pleasure</H4>
            </div>
            <LeadText color="blueGray">
              People are the key to workplace excellence. If you give HR
              knowledge and time to work with people, they can build the kind of
              culture, policies, and people practices that set entire
              organizations free to be better at what they do.
            </LeadText>
            <LeadText color="blueGray">
              And when you give employees the power to help themselves, they
              feel more valued and capable as contributors rather than simple
              assets. EMS is designed to do both. That’s what makes us
              different.
            </LeadText>
          </div>

          <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
            <Card>
              <CardImage alt="Card Image" src={Teamwork} />
              <CardBody>
                <H6 color="gray">We’re easy to adopt & even easier to use.</H6>
                <Paragraph color="blueGray">
                  That’s why we built EMS to be intuitive, clear, and easy to
                  use.
                </Paragraph>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
