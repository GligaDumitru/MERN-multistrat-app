/* eslint-disable jsx-a11y/anchor-is-valid */
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { add, getDay, getDate } from "date-fns";
import { Button } from "gpl-tailwind-theme";
import Icon from "@material-tailwind/react/Icon";

const headers = [
  {
    field: "day-0",
    use: "17 Nov",
  },
  {
    field: "day-0",
    use: "18 Nov",
  },
  {
    field: "day-0",
    use: "19 Nov",
  },
  {
    field: "day-0",
    use: "19 Nov",
  },
  {
    field: "day-0",
    use: "19 Nov",
  },
  {
    field: "day-0",
    use: "19 Nov",
  },
  {
    field: "day-0",
    use: "19 Nov",
  },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateDaysArr = (startDate) => {
  return days.map((_, index) => {
    const currentDay = add(new Date(startDate), { days: index });
    return {
      day: getDay(currentDay),
      date: getDate(currentDay),
    };
  });
};

const calculateTotalHoursPerColumn = (tasks) => {
  if (!tasks || tasks <= 0) return [];
  return tasks.reduce((acc, task) => {
    const { days } = task;
    days.forEach((day, index) => {
      if (acc[index]) {
        acc[index] += Number(day);
      } else {
        acc.push(Number(day));
      }
    });
    return acc;
  }, []);
};

const TimesheetDetails = ({ timesheet, projects, onApprove }) => {
  const { startDate, tasks, status, id } = timesheet;
  const daysForTimesheetHeader = generateDaysArr(startDate);
  const totalHoursPerColumn = calculateTotalHoursPerColumn(tasks);

  const getSumArr = (arr) => arr.reduce((a, b) => a + Number(b), 0);
  const getFieldFromArrObjsByValue = (arr, fieldName, value) =>
    arr.find((arrItem) => arrItem[fieldName] === value);

  const totalHours = getSumArr(totalHoursPerColumn);

  return (
    <div className="mt-16">
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Timesheet Details</h2>
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
                      <th
                        scope="col"
                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Project
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Task
                      </th>
                      {daysForTimesheetHeader.map(({ day, date }, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-1 py-3 text-center text-xs font-medium text-blue-500 uppercase"
                        >
                          {`${date} ${days[day]}`}
                        </th>
                      ))}

                      <th
                        scope="col"
                        className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tasks.map(
                      ({ days: daysForTask, projectId, subtaskId }, idx) => (
                        <tr
                          key={idx}
                          className={`${
                            idx % 2 === 0
                              ? "bg-gray-100 hover:bg-gray-200"
                              : "bg-white hover:bg-gray-200"
                          }`}
                        >
                          <td className="px-1 py-4">
                            <span>
                              {projectId
                                ? getFieldFromArrObjsByValue(
                                    projects,
                                    "id",
                                    projectId
                                  ).name
                                : "-"}
                            </span>
                          </td>
                          <td className="px-1 py-4">
                            <span>
                              {subtaskId && projectId
                                ? getFieldFromArrObjsByValue(
                                    getFieldFromArrObjsByValue(
                                      projects,
                                      "id",
                                      projectId
                                    ).subtasks,
                                    "name",
                                    subtaskId
                                  ).name
                                : "-"}
                            </span>
                          </td>
                          {daysForTask.map((nrHoursPerDay, index) => (
                            <td key={index} className="px-1 py-4 text-center">
                              {Number(nrHoursPerDay) === 0 ? (
                                <span className="text-gray-500">0</span>
                              ) : (
                                <span>{Number(nrHoursPerDay).toFixed(2)}</span>
                              )}
                            </td>
                          ))}
                          <td className="px-1 py-4 text-center">
                            <span>{getSumArr(daysForTask)}h</span>
                          </td>
                          <td className="px-1 py-4 text-center">
                            <span> </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      ></th>
                      {headers.map((hd, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-1 py-3 text-center  font-medium text-dark"
                        >
                          {totalHoursPerColumn[index]}h
                        </th>
                      ))}

                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-dark"
                      >
                        <span>{totalHours}h</span>
                      </th>

                      <th
                        scope="col"
                        className="px-1 py-3 text-center  font-medium text-dark"
                      >
                        <Button
                          color="green"
                          ripple="light"
                          rounded={true}
                          iconOnly={true}
                          className="m-0 p-1 h-8 w-8"
                          title="Approve Timesheet"
                          onClick={() => onApprove(id)}
                        >
                          <Icon name="send" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
};

TimesheetDetails.defaultProps = {
  timesheet: {
    startDate: new Date(2022, 0, 17),
    tasks: [],
    status: "Approved",
  },
};

export default TimesheetDetails;
