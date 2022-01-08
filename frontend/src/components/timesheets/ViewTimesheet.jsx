/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectState, getTimesheetById } from "../../features/auth/authSlice";
import DefaultNavbar from "../DefaultNavbar";
import DefaultFooter from "../DefaultFooter";
import Header from "../profile/Header";
import Breadcrumb from "../shared/Breadcrumb";
import LoadingContainer from "../shared/LoadingContainer";
import EditTimesheet from "./EditTimesheet";

const ViewTimesheet = () => {
  const { id = null } = useParams();
  const { currentTimesheet = {} } = useSelector(selectState);
  const dispatch = useDispatch();

  const [values, setValues] = useState({});

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
    {
      name: `Timesheet ${id}`,
      icon: "access_time",
      urlTo: `/timesheets/${id}`,
    },
  ];

  useEffect(() => {
    dispatch(getTimesheetById(id));
  }, [id]);

  useEffect(() => {
    setValues({
      ...values,
      timesheet: {
        ...currentTimesheet,
      },
    });
  }, [currentTimesheet]);

  const handleOnChangeHourDay = ({ target: { name, value } }) => {
    const [_, row, idxRow] = name.split("-");
    const {
      timesheet: { tasks },
    } = values;

    let _tempTasks = [...tasks];
    let _tempRowTask = _tempTasks[Number(row)];
    let _tempRowDays = [..._tempRowTask.days];

    _tempRowDays[Number(idxRow)] = value;

    _tempRowTask = {
      ..._tempRowTask,
      days: [..._tempRowDays],
    };

    _tempTasks[Number(row)] = _tempRowTask;

    setValues({
      ...values,
      timesheet: {
        ...values.timesheet,
        tasks: _tempTasks,
      },
    });
  };

  const handleDeleteRow = (rowIndex) => {
    const {
      timesheet: { tasks },
    } = values;
    let _tempTasks = [...tasks];

    if (_tempTasks[rowIndex]) {
      _tempTasks.splice(Number(rowIndex), 1);
      setValues({
        ...values,
        timesheet: {
          ...values.timesheet,
          tasks: _tempTasks,
        },
      });
    }
  };

  const handleAddRow = () => {
    const {
      timesheet: { tasks },
    } = values;

    let _tempTasks = [...tasks];

    _tempTasks.push({
      projectId: null,
      subtaskId: null,
      days: ["", "", "", "", "", "", ""],
    });

    setValues({
      ...values,
      timesheet: {
        ...values.timesheet,
        tasks: _tempTasks,
      },
    });
  };

  const handleOnSelectProjectId = (rowIdx, { id }) => {
    const {
      timesheet: { tasks },
    } = values;

    let _tempTasks = [...tasks];
    _tempTasks[Number(rowIdx)] = {
      ..._tempTasks[Number(rowIdx)],
      projectId: id,
    };

    setValues({
      ...values,
      timesheet: {
        ...values.timesheet,
        tasks: _tempTasks,
      },
    });
  };

  const handleOnSelectSubtask = (rowIdx, { label }) => {
    const {
      timesheet: { tasks },
    } = values;

    let _tempTasks = [...tasks];
    _tempTasks[Number(rowIdx)] = {
      ..._tempTasks[Number(rowIdx)],
      subtaskId: label,
    };

    setValues({
      ...values,
      timesheet: {
        ...values.timesheet,
        tasks: _tempTasks,
      },
    });
  };

  const handleOnSave = ({ submit }) => {
    alert(submit ? "Save and submit" : "Only save for later");
  };

  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <Header />
      <div className="p-8 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-80 min-h-screen">
          <LoadingContainer>
            <div className="p-8">
              <Breadcrumb routes={routesBreadcrumb} />
              {values.timesheet?.tasks && (
                <EditTimesheet
                  timesheet={values.timesheet}
                  onChangeInput={handleOnChangeHourDay}
                  onDeleteRow={handleDeleteRow}
                  onAddRow={handleAddRow}
                  onSelectProject={handleOnSelectProjectId}
                  onSelectSubtask={handleOnSelectSubtask}
                  onSave={handleOnSave}
                />
              )}
            </div>
          </LoadingContainer>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
};

export default ViewTimesheet;
