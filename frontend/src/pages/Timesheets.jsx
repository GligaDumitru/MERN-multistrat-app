/* eslint-disable react-hooks/exhaustive-deps */
import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/DefaultFooter";
import Header from "../components/profile/Header";
import LayoutPage from "../components/people/LayoutPage";
import Breadcrumb from "../components/shared/Breadcrumb";
import Table from "react-tailwind-table";
import { Button } from "gpl-tailwind-theme";
import Icon from "@material-tailwind/react/Icon";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import SelectTimesheetToCreate from "../components/timesheets/SelectTimesheetToCreate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingContainer from "../components/shared/LoadingContainer";
import {
  createTimesheet,
  deleteTimesheet,
  getTimesheets,
  selectStateTimesheet,
} from "../features/data/timesheetSlice";
import { getPeople, selectState } from "../features/auth/authSlice";
import { calculateTotalHoursPerColumn } from "../utils";
import { sum } from "lodash";
import { add } from "date-fns";

const column = [
  {
    field: "id",
    use: "ID",
  },
  {
    field: "name",
    use: "Name",
  },
  {
    field: "startDate",
    use: "Start Date",
  },
  {
    field: "endDate",
    use: "End Date",
  },

  {
    field: "username",
    use: "Employee",
  },
  {
    field: "hours",
    use: "# of hours",
  },
  {
    field: "managedBy",
    use: "Approver",
  },
  {
    field: "status",
    use: "Status",
  },
  {
    field: "options",
    use: "Options",
  },
];

export default function Timesheets() {
  const [addTimesheetModel, setAddTimesheetModal] = useState(false);

  const { timesheets = [] } = useSelector(selectStateTimesheet);
  const { people = [], user } = useSelector(selectState);
  const dispatch = useDispatch();

  const getPersonById = (id) => people.find((person) => person.id === id);

  const { loading: loadingTimesheet, successMessage: successMessageTimesheet } =
    useSelector(selectStateTimesheet);

  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getPeople());
  }, []);

  useEffect(() => {
    if (!loadingTimesheet && successMessageTimesheet) {
      setAddTimesheetModal(false);
    }
  }, [loadingTimesheet, successMessageTimesheet]);

  const routesBreadcrumb = [
    {
      name: "",
      icon: "home",
      urlTo: "/",
    },
    {
      name: "Timesheets",
      icon: "access_time",
      urlTo: "/timesheets",
    },
  ];

  const handleOnDeleteTimesheet = (id) => {
    dispatch(deleteTimesheet(id));
  };

  const rowcheck = (row, column, display_value) => {
    const totalHoursPerColumn = calculateTotalHoursPerColumn(row.tasks);
    const totalHours = sum(totalHoursPerColumn);
    const endDate = add(new Date(row.startDate), {
      days: 6,
    }).toLocaleDateString();
    switch (column.field) {
      case "id":
        return (
          <Link to={`/timesheets/${row.id}`}>
            <Button
              type="link"
              color="blue"
              ripple="light"
              className="m-0 py-2 px-1"
            >
              <Icon name="visibility" />
              {row.id}
            </Button>
          </Link>
        );
      case "hours":
        return totalHours;
      case "options":
        return (
          <Button
            color="red"
            ripple="light"
            rounded={true}
            iconOnly={true}
            onClick={() => handleOnDeleteTimesheet(row.id)}
            className="m-0 p-1 h-8 w-8"
          >
            <Icon name="delete" size="xs" />
          </Button>
        );
      case "username":
        return getPersonById(row.userId)?.name;
      case "managedBy":
        return getPersonById(row.managedBy)?.name;
      case "endDate":
        return endDate;
      case "name":
        return `from ${row.startDate} to ${endDate}`;
      default:
        return display_value;
    }
  };

  const styling = {
    main: "p-2 my-4 rounded-lg min-h-screen",
    base_text_color: "text-blue-500",
    base_bg_color: "bg-gradient-to-tr from-light-blue-500 to-light-blue-700",
    table_head: {
      table_row:
        "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 shadow-md-light-blue rounded",
      table_data: "text-white",
    },
  };

  const handleOnCreate = (selectedDate) => {
    dispatch(
      createTimesheet({
        managedBy: user.managedBy || user.id,
        startDate: selectedDate,
        userId: user.id,
        tasks: [],
      })
    );
  };

  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <Header />
      <LayoutPage>
        <div className="p-8">
          <Breadcrumb routes={routesBreadcrumb} />

          <Modal
            isOpen={addTimesheetModel}
            handleClose={() => setAddTimesheetModal(false)}
          >
            <SelectTimesheetToCreate onCreate={handleOnCreate} />
          </Modal>
          <LoadingContainer>
            <Button
              color="blue"
              ripple="light"
              onClick={() => setAddTimesheetModal(true)}
              className="my-4"
            >
              <Icon name="add" /> New Timesheet Request
            </Button>
            <Table
              styling={styling}
              columns={column}
              rows={timesheets}
              per_page={5}
              table_header="Timesheets - All"
              row_render={rowcheck}
            />
          </LoadingContainer>
        </div>
      </LayoutPage>
      <DefaultFooter />
    </>
  );
}
