import React from "react";

const Notification = ({ message, err }) => {
  const success = {
    color: "green",
  };

  const fail = {
    color: "red",
  };

  if (message === null) {
    return null;
  }

  return <h3 style={err ? fail : success}>{message}</h3>;
};

export default Notification;
