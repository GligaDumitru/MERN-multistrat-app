import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { add, getDate, getDay } from "date-fns";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const headersTable = [
  {
    name: "#",
  },
  {
    name: "Date(MM/DD/YYYY)",
  },
  {
    name: "# of hours",
  },
  {
    name: "Request Type",
  },
  {
    name: "Task",
  },
];

const generateRequestDays = (startDate, days = []) => {
  return days.map((_, index) => {
    const currentDay = add(new Date(startDate), { days: index });
    return {
      day: getDay(currentDay),
      date: getDate(currentDay),
      fullDate: new Date(currentDay).toLocaleDateString(),
    };
  });
};

const RequestDetails = ({ request }) => {
  const { startDate, days, requestType, task, status } = request;

  const currentRequestDays = generateRequestDays(startDate, days);

  return (
    <div className="mt-16">
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Request Details</h2>
          <h2 className="text-white text-2xl uppercase">{status}</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 ">
              <div className="sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {headersTable.map(({ name }, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentRequestDays.map(({ fullDate, day }, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? "bg-gray-100 hover:bg-gray-200"
                              : "bg-white hover:bg-gray-200"
                          }`}
                        >
                          <td className="px-1 py-4 text-center">
                            <span>{index + 1}</span>
                          </td>
                          <td className="px-1 py-4 text-center">
                            <span>{`${DAYS[day]} ${fullDate}`}</span>
                          </td>
                          <td className="px-1 py-4 text-center">
                            <span>{days[index]}</span>
                          </td>
                          <td className="px-1 py-4 text-center">
                            <span>{requestType}</span>
                          </td>
                          <td className="px-1 py-4 text-center">
                            <span>{task}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {currentRequestDays.length === 0 && (
                  <div className="w-full bg-gray-50 p-2 text-center text-gray-700">
                    No data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
};

RequestDetails.defaultProps = {
  request: {
    startDate: new Date(2022, 0, 17),
    days: [8, 8, 8],
    status: "Approved",
    user: {
      userId: "123",
      name: "Daniel Gliga",
    },
    requestType: "Special Leave",
    task: "Blood Donation",
  },
};

export default RequestDetails;
