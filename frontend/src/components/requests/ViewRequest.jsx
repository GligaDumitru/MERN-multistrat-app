/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectState, getRequestById } from "../../features/auth/authSlice";
import DefaultNavbar from "../DefaultNavbar";
import DefaultFooter from "../DefaultFooter";
import Header from "../profile/Header";
import Breadcrumb from "../shared/Breadcrumb";
import LoadingContainer from "../shared/LoadingContainer";
import RequestDetails from "./RequestDetails";

const ViewRequest = () => {
  const { id = null } = useParams();
  const { currentRequest = {} } = useSelector(selectState);
  const dispatch = useDispatch();

  const [values, setValues] = useState({});

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
    {
      name: `Request ${id}`,
      icon: "add_to_queue",
      urlTo: `/requests/${id}`,
    },
  ];

  useEffect(() => {
    setValues({
      ...values,
      request: {
        ...currentRequest,
      },
    });
  }, [currentRequest]);

  useEffect(() => {
    dispatch(getRequestById(id));
  }, [id]);



  const STATUS = {
    OPEN: "open",
    SUBMITED: "submitted",
    APPROVED: "approved",
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
              {values.request?.days && (
                <RequestDetails request={values.request} />
              )}
            </div>
          </LoadingContainer>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
};

export default ViewRequest;
