import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Alert } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useLoginStyles } from "../styles/FormStyles";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginuser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { useHistory } from "react-router";
import { getFavorites } from "../actions/favoriteAction";

export default function Login() {
  const classes = useLoginStyles();

  const auth = useSelector((auth) => auth.auth);
  const userId = useSelector((auth) =>
    auth.auth.user ? auth.auth.user.id : null
  );

  const error = useSelector((state) => state.error);

  const previousErrorValue = usePrevious(error);
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    msg: null,
  });

  ////////////////////get previous value function/////////////////////

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (error.msg !== previousErrorValue.msg) {
        // check for login error

        if (error.id === "LOGIN_FAIL") {
          setFormState({
            msg: error.msg.msg,
          });
        } else {
          setFormState({ msg: null });
        }
      }
    }
    // clear fields
    if (auth.isAuthenticated) {
      setFormState({
        email: "",
        password: "",

        msg: null,
      });
      // redirect to Search Page
      history.push("/");
      // clear errors action
      dispatch(clearErrors());
      dispatch(getFavorites(userId));
    }
  }, [
    error,
    previousErrorValue,
    auth.isAuthenticated,
    dispatch,
    history,
    userId,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginuser(formState));

    setFormState({
      email: " ",
      password: " ",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    let name = e.target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
              Sign in
            </Typography>
            {formState.msg ? (
              <Alert
                severity="error"
                elevation={6}
                variant="filled"
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                {formState.msg}
              </Alert>
            ) : null}
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                className="email"
                label="Email Address"
                name="email"
                value={formState.email || ""}
                onChange={handleChange}
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formState.password || ""}
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                className={classes.root}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="" variant="body2" className="route-links">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" className="route-links">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      </Grid>
    </Grid>
  );
}
