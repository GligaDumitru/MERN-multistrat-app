import React from "react";
import { useSelector } from "react-redux";
import { selectState } from "../../features/auth/authSlice";
import Loader from "./Loader";

const LoadingContainer = ({ children }) => {
  const { loading } = useSelector(selectState);
  return loading ? <Loader /> : <>{children}</>;
};

export default LoadingContainer;
