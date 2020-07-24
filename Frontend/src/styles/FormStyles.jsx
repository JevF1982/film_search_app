import { makeStyles } from "@material-ui/core/styles";

export const useRegisterStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0),
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(8),
    },

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "white",
    color: "white",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: "white !important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    color: "white !important",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white !important",
  },
  cssLabel: {
    color: "white",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));

//////////////////////////////////////////////////////      LOGIN            ////////////////////////////////////////////////////////

export const useLoginStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#242B53",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#242B53",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#242B53",
    },
    flexGrow: 1,
  },

  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white !important",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  cssLabel: {
    color: "white",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));

/////////////////////////////////////////////////////////////////     NAVBAR         ////////////////////////////////////////

export const useNavBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    color: "white",
    textDecoration: "none",
  },
}));
