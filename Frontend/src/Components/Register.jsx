import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { registeruser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { useRegisterStyles } from "../styles/FormStyles";

const Register = () => {
  const classes = useRegisterStyles();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
    favListItem: " ",
    msg: null,
  });

  /////////////////////////////////////////////:get previous value//////////////////////////////////
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const error = useSelector((state) => state.error);
  const previousErrorValue = usePrevious(error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let history = useHistory();

  const dispatch = useDispatch();

  // check for error changes trough useref and useeffect (equal to componentdidupdate)////////////////////////////////////////////////////////
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (error.msg !== previousErrorValue.msg) {
        // check for register error
        try {
          if (error.id === "REGISTER_FAIL") {
            setFormState({
              msg: error.msg.msg.details[0].message || null,
            });
          } else {
            setFormState({ msg: null });
          }
        } catch {
          setFormState({
            msg: "User bestaat al ",
          });
        }
      }
    }
    // clear fields
    if (isAuthenticated) {
      setFormState({
        email: "",
        password: "",
        name: "",
        msg: null,
      });
      // redirect to login
      history.push("/");
      // clear errors action
      dispatch(clearErrors());
    }
  }, [error, previousErrorValue, isAuthenticated, dispatch, history]);

  /////////////////////////////////submit///////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formState;

    // new user
    const newUser = {
      name,
      email,
      password,
    };

    dispatch(registeruser(newUser));
  };

  ////////////////////////////////////////////////////handlechange///////////////////////////////////////
  const handleChange = (e) => {
    const value = e.target.value;
    let name = e.target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Grid container spacing={3} style={{ marginTop: "70px" }}>
      <Grid item xs={12}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  {formState.msg ? (
                    <Alert
                      severity="error"
                      elevation={6}
                      variant="filled"
                      style={{ marginBottom: "20px" }}
                    >
                      {formState.msg}
                    </Alert>
                  ) : null}
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    value={formState.name || ""}
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={handleChange}
                    className={classes.textfield}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                      inputMode: "numeric",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formState.email || ""}
                    autoComplete="email"
                    onChange={handleChange}
                    className={classes.textfield}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                      inputMode: "numeric",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={formState.password || ""}
                    id="password2"
                    autoComplete="current-password"
                    onChange={handleChange}
                    className={classes.textfield}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                      inputMode: "numeric",
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" className="route-links">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default withRouter(Register);
