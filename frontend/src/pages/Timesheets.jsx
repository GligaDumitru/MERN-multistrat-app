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
import { getTimesheets, selectState } from "../features/auth/authSlice";
import LoadingContainer from "../components/shared/LoadingContainer";

const column = [
  {
    field: "id",
    use: "ID",
  },
  {
    field: "startDate",
    use: "Start Date",
  },
  {
    field: "name",
    use: "Name",
  },
  {
    field: "user.name",
    use: "User",
  },
  {
    field: "hours",
    use: "# of hours",
  },
  {
    field: "status",
    use: "Status",
  },
];

export default function Timesheets() {
  const [addTimesheetModel, setAddTimesheetModal] = useState(false);

  const { timesheets = [] } = useSelector(selectState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

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

  const rowcheck = (row, column, display_value) => {
    if (column.field === "name") {
      return (
        <Link to={`/timesheets/${row.id}`}>
          <Button type="link" color="blue" ripple="light" className="m-0">
            <Icon name="visibility" /> {display_value}
          </Button>
        </Link>
      );
    }
    if (column.field === "created_at") {
      return <button className="border p-2">See button</button>;
    }

    if (column.field === "name") {
      return <b>{display_value}</b>;
    }

    return display_value;
  };

  const styling = {
    main: "p-2 my-4 rounded-lg min-h-screen",
    base_text_color: "text-blue-500",
    base_bg_color: "bg-gradient-to-tr from-light-blue-500 to-light-blue-700",
    table_head: {
      table_row:
        "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 shadow-md-light-blue rounded", // The <tr/> holding all <th/>
      table_data: "text-white", // each table head column
    },
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
            <SelectTimesheetToCreate />
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
