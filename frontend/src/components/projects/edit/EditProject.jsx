/* eslint-disable react-hooks/exhaustive-deps */
import DefaultNavbar from "../../DefaultNavbar";
import DefaultFooter from "../../DefaultFooter";
import Header from "../../profile/Header";
import Breadcrumb from "../../shared/Breadcrumb";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectState,
  getProjectById,
  updateProject,
} from "../../../features/auth/authSlice";
import ViewProject from "../ViewProject";
import EditProjectForm from "./EditProjectForm";
import LoadingContainer from "../../shared/LoadingContainer";

const EditProject = () => {
  const { id = null } = useParams();
  const { currentProject = {} } = useSelector(selectState);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    id: "",
    imageLink: "",
    name: "",
    description: "",
    manager: "",
    address: "",
    subtasks: [],
  });

  const routesBreadcrumb = [
    {
      name: "",
      icon: "home",
      urlTo: "/",
    },
    {
      name: "Projects",
      icon: "dashboard",
      urlTo: "/projects",
    },
    {
      name: `Project ${id}`,
      icon: "dashboard",
      urlTo: `/projects/${id}`,
    },
  ];

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [id]);

  useEffect(() => {
    setValues({
      ...values,
      ...currentProject,
    });
  }, [currentProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id: idProject, manager, ...otherValues } = values;
    dispatch(
      updateProject({
        id: idProject,
        payload: {
          ...otherValues,
        },
      })
    );
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFieldByName = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
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
              <div className="grid grid-cols-2 gap-4 mt-24">
                <div className="">
                  <EditProjectForm
                    values={values}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleChangeFieldByName={handleChangeFieldByName}
                  />
                </div>
                <div className="">
                  <ViewProject showOptions={false} {...values} />
                </div>
              </div>
            </div>
          </LoadingContainer>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
};

export default EditProject;
