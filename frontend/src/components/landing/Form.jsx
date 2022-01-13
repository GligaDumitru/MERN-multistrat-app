import H3 from "@material-tailwind/react/Heading3";
import Paragraph from "@material-tailwind/react/Paragraph";

export default function Form() {
  return (
    <div className="flex flex-wrap justify-center mt-24">
      <div className="w-full lg:w-8/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
          <div className="flex-auto p-5 lg:p-10">
            <div className="w-full text-center">
              <H3 color="gray">Contact us?</H3>
              <Paragraph color="blueGray">
                Send us an email to ems.employee2022@gmail.com and we will get
                back to you.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
