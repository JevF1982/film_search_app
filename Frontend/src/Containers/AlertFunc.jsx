import { Alert } from "@material-ui/lab";
import React from "react";

export const AlertFunc = (isAuthenticated, istoggled, buttonValue) => {
  if (!isAuthenticated && istoggled) {
    if (buttonValue === "add") {
      return (
        <Alert
          severity="error"
          elevation={6}
          variant="filled"
          style={{ marginBottom: "20px" }}
        >
          You must be logged in to add to your favorites
        </Alert>
      );
    } else if (buttonValue === "delete") {
      return (
        <Alert
          severity="error"
          elevation={6}
          variant="filled"
          style={{ marginBottom: "20px" }}
        >
          You must be logged in to delete from your favorites
        </Alert>
      );
    }
  } else if (isAuthenticated && istoggled) {
    if (buttonValue === "add")
      return (
        <Alert
          severity="success"
          elevation={6}
          variant="filled"
          style={{ marginBottom: "20px" }}
        >
          Added to your favorites
        </Alert>
      );
    else {
      return (
        <Alert
          severity="success"
          elevation={6}
          variant="filled"
          style={{ marginBottom: "20px" }}
        >
          Deleted from your favorites
        </Alert>
      );
    }
  }
};

export default AlertFunc;
