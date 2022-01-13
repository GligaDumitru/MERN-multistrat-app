/* eslint-disable react-hooks/exhaustive-deps */
import { sum } from "lodash";
import Table from "react-tailwind-table";
import { Button } from "gpl-tailwind-theme";
import Icon from "@material-tailwind/react/Icon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/DefaultFooter";
import Header from "../components/profile/Header";
import LayoutPage from "../components/people/LayoutPage";
import Breadcrumb from "../components/shared/Breadcrumb";
import Modal from "../components/Modal";
import {
  deleteRequest,
  getRequests,
  selectState,
  updateRequest,
} from "../features/auth/authSlice";
import LoadingContainer from "../components/shared/LoadingContainer";
import AddRequest from "../components/requests/AddRequest";

const column = [
  {
    field: "id",
    use: "ID",
  },
  {
    field: "userId",
    use: "User",
  },
  {
    field: "startDate",
    use: "Start Date",
  },
  {
    field: "daysTotal",
    use: "# of days",
  },
  {
    field: "hours",
    use: "# of hours",
  },
  {
    field: "requestType",
    use: "Request Type",
  },

  {
    field: "task",
    use: "Task",
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

export default function Requests() {
  const [showModal, setShowModal] = useState(false);

  const { requests = [] } = useSelector(selectState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  const handleOnDelete = (id) => {
    dispatch(deleteRequest(id));
  };

  const handleApproveRequst = (id) => {
    dispatch(
      updateRequest({
        id,
        payload: {
          status: "approved",
        },
      })
    );
  };

  const routesBreadcrumb = [
    {
      name: "",
      icon: "home",
      urlTo: "/",
    },
    {
      name: "Requests",
      icon: "add_to_queue",
      urlTo: "/requests",
    },
  ];

  const rowcheck = (row, column, display_value) => {
    if (column.field === "daysTotal") {
      return <span>{row.days.length}</span>;
    }
    if (column.field === "hours") {
      return <span>{sum(row.days)}</span>;
    }
    if (column.field === "options") {
      return (
        <div className="flex items-center justify-center m-0 p-0">
          <Button
            color="red"
            ripple="light"
            rounded={true}
            iconOnly={true}
            className="m-0 p-1 h-8 w-8 mr-2"
            onClick={() => handleOnDelete(row.id)}
            title="Save"
          >
            <Icon name="delete" />
          </Button>
          <Button
            color="green"
            ripple="light"
            rounded={true}
            iconOnly={true}
            className="m-0 p-1 h-8 w-8"
            onClick={() => handleApproveRequst(row.id)}
            title="Approve"
          >
            <Icon name="send" />
          </Button>
        </div>
      );
    }

    if (column.field === "id") {
      return (
        <Link to={`/requests/${row.id}`}>
          <Button type="link" color="blue" ripple="light" className="m-0">
            <Icon name="visibility" /> #{display_value}
          </Button>
        </Link>
      );
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
      table_data: "text-white",
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
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            <AddRequest />
          </Modal>
          <LoadingContainer>
            <Button
              color="blue"
              ripple="light"
              onClick={() => setShowModal(true)}
              className="my-4"
            >
              <Icon name="add" /> New Request
            </Button>
            <Table
              styling={styling}
              columns={column}
              rows={requests}
              per_page={5}
              table_header="Requests - All"
              row_render={rowcheck}
            />
          </LoadingContainer>
        </div>
      </LayoutPage>
      <DefaultFooter />
    </>
  );
}
