import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div>
      <small>{error.toString()}</small>
    </div>
  );
};

export default ErrorMessage;
