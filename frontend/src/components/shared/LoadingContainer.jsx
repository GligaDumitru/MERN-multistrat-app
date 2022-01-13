import { Alert } from "gpl-tailwind-theme";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectState, setField } from "../../features/auth/authSlice";
import {
  selectStateTimesheet,
  setField as setFieldTimesheet,
} from "../../features/data/timesheetSlice";
import Loader from "./Loader";

const LoadingContainer = ({ children }) => {
  const { loading, message, errors, successMessage } = useSelector(selectState);
  const {
    loading: loadingTimesheet,
    message: messageTimesheet,
    errors: errorsTimesheet,
    successMessage: successMessageTimesheet,
  } = useSelector(selectStateTimesheet);

  const dispatch = useDispatch();

  return loading || loadingTimesheet ? (
    <Loader />
  ) : (
    <>
      <div className="absolute bottom-2 right-2 z-50">
        {(message ||
          messageTimesheet ||
          errors.length > 0 ||
          errorsTimesheet.length > 0) && (
          <Alert
            color="red"
            icon="error"
            iconSize="xl"
            iconPosition="center"
            closeIcon="close"
            closeIconPosition="center"
            hideAfter={10000}
            className="fixed bottom-2 right-2 inline-block"
            handleClose={() => {
              dispatch(setField({ name: "message", value: "" }));
              dispatch(setFieldTimesheet({ name: "message", value: "" }));
              dispatch(setFieldTimesheet({ name: "errors", value: [] }));
              dispatch(setField({ name: "errors", value: [] }));
            }}
          >
            <span>
              {message && message} {messageTimesheet && messageTimesheet}{" "}
              {errors && errors.length > 0 && errors[0]}{" "}
              {errorsTimesheet &&
                errorsTimesheet.length > 0 &&
                errorsTimesheet[0]}{" "}
            </span>
          </Alert>
        )}
        {(successMessage || successMessageTimesheet) && (
          <Alert
            color="green"
            icon="check"
            iconSize="xl"
            iconPosition="center"
            closeIcon="close"
            closeIconPosition="center"
            hideAfter={10000}
            className="fixed bottom-2 right-2 inline-block"
            handleClose={() => {
              dispatch(setField({ name: "successMessage", value: "" }));
              dispatch(
                setFieldTimesheet({
                  name: "successMessage",
                  value: "",
                })
              );
            }}
          >
            <span>{successMessage || successMessageTimesheet}</span>
          </Alert>
        )}
      </div>
      {children}
    </>
  );
};

export default LoadingContainer;
