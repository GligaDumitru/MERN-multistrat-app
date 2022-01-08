/* eslint-disable jsx-a11y/anchor-is-valid */
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Select from "../shared/Select";
import { Button } from "gpl-tailwind-theme";
import Icon from "@material-tailwind/react/Icon";
import { add, getDay, getDate } from "date-fns";

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

const projects = [
  {
    id: "11111",
    name: "EMSOne",
    subtasks: [
      {
        label: "frontend_development",
        name: "Frontend Development",
      },
      {
        label: "backend_development",
        name: "Backend Development",
      },
      {
        label: "testing_development",
        name: "Testing Development",
      },
      {
        label: "devops_development",
        name: "Devops Development",
      },
    ],
  },
  {
    id: "22222",
    name: "Tinka Group",
    subtasks: [
      {
        label: "frontend_development",
        name: "Frontend Development",
      },
      {
        label: "backend_development",
        name: "Backend Development",
      },
      {
        label: "testing_development",
        name: "Testing Development",
      },
      {
        label: "devops_development",
        name: "Devops Development",
      },
    ],
  },
  {
    id: "33333",
    name: "Emag Fintech Group",
    subtasks: [
      {
        label: "frontend_development",
        name: "Frontend Development",
      },
      {
        label: "backend_development",
        name: "Backend Development",
      },
      {
        label: "testing_development",
        name: "Testing Development",
      },
      {
        label: "devops_development",
        name: "Devops Development",
      },
    ],
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

const EditTimesheet = ({
  timesheet,
  onChangeInput,
  onAddRow,
  onDeleteRow,
  onSelectProject,
  onSelectSubtask,
  onSave,
}) => {
  const { startDate, tasks } = timesheet;
  const daysForTimesheetHeader = generateDaysArr(startDate);
  const totalHoursPerColumn = calculateTotalHoursPerColumn(tasks);

  const getSumArr = (arr) => arr.reduce((a, b) => a + Number(b), 0);
  const getFieldFromArrObjsByValue = (arr, fieldName, value) =>
    arr.find((arrItem) => arrItem[fieldName] === value);

  const getSubtaskByLabel = (subtasks, label) =>
    subtasks.find((subtask) => subtask.label === label);

  const totalHours = getSumArr(totalHoursPerColumn);

  return (
    <div className="mt-16">
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Edit Timesheet</h2>
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
                      >
                        Options
                      </th>
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
                            <Select
                              options={projects}
                              selected={
                                projectId
                                  ? getFieldFromArrObjsByValue(
                                      projects,
                                      "id",
                                      projectId
                                    )
                                  : { name: "Select..." }
                              }
                              onSelect={(project) =>
                                onSelectProject(idx, project)
                              }
                            />
                          </td>
                          <td className="px-1 py-4">
                            <Select
                              options={
                                projectId
                                  ? getFieldFromArrObjsByValue(
                                      projects,
                                      "id",
                                      projectId
                                    ).subtasks
                                  : []
                              }
                              selected={
                                subtaskId && projectId
                                  ? getFieldFromArrObjsByValue(
                                      getFieldFromArrObjsByValue(
                                        projects,
                                        "id",
                                        projectId
                                      ).subtasks,
                                      "label",
                                      subtaskId
                                    )
                                  : { name: "Select..." }
                              }
                              onSelect={(subtask) =>
                                onSelectSubtask(idx, subtask)
                              }
                            />
                          </td>
                          {daysForTask.map((nrHoursPerDay, index) => (
                            <td key={index} className="px-1 py-4 text-center">
                              <input
                                type="number"
                                min="0"
                                name={`day-${idx}-${index}`}
                                onChange={onChangeInput}
                                value={nrHoursPerDay}
                                max="8"
                                className="text-center w-12 border border-gray-400 rounded-lg inline-block p-2"
                              />
                            </td>
                          ))}
                          <td className="px-1 py-4 text-center">
                            <span>{getSumArr(daysForTask)}</span>
                          </td>
                          <td className="px-1 py-4 text-center w-24">
                            <Button
                              color="red"
                              ripple="light"
                              rounded={true}
                              iconOnly={true}
                              onClick={() => onDeleteRow(idx)}
                              className="m-0 p-1 h-8 w-8"
                            >
                              <Icon name="delete" size="xs" />
                            </Button>
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
                          className="px-1 py-3 text-center  font-medium text-dark uppercase"
                        >
                          {totalHoursPerColumn[index]}
                        </th>
                      ))}

                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-dark uppercase"
                      >
                        <span>{totalHours}</span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-dark uppercase"
                      >
                        <div className="flex items-center justify-center m-0 p-0">
                          <Button
                            color="lightBlue"
                            ripple="light"
                            rounded={true}
                            iconOnly={true}
                            className="m-0 p-1 h-8 w-8 mr-2"
                            onClick={onAddRow}
                            title="Add New Row"
                          >
                            <Icon name="add" />
                          </Button>
                          <Button
                            color="lightGreen"
                            ripple="light"
                            rounded={true}
                            iconOnly={true}
                            className="m-0 p-1 h-8 w-8 mr-2"
                            onClick={() => onSave({ submit: false })}
                            title="Save"
                          >
                            <Icon name="check" />
                          </Button>
                          <Button
                            color="green"
                            ripple="light"
                            rounded={true}
                            iconOnly={true}
                            className="m-0 p-1 h-8 w-8"
                            title="Save & Submit"
                            onClick={() => onSave({ submit: true })}
                          >
                            <Icon name="send" />
                          </Button>
                        </div>
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

EditTimesheet.defaultProps = {
  onChangeInput: () => undefined,
  onAddRow: () => undefined,
  onDeleteRow: () => undefined,
  onSelectProject: () => undefined,
  onSelectSubtask: () => undefined,
  onSave: () => undefined,
  timesheet: {
    startDate: new Date(2022, 0, 17),
    tasks: [],
  },
};

export default EditTimesheet;
