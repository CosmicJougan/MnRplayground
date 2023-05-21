import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CalendarComponent from "components/calendar/Calendar";
import Clock from "components/timetracker/Clock";
import Login from "components/login/Login";
import Registration from "components/registration/Registration";
import { LoginContext } from "context/LoginContext";
import Protected from "./Protected";
import WorkForm from "../workform/WorkForm";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import LiveFollower from "components/liveFollower/LiveFollower";

import "./NavBar.css";

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [_, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    <Navigate to="/login" />
  }, []);

  const [state, dispatch] = useContext(LoginContext);

  if (state.isAuthenticated !== false) {
    return (
      <div className="naviBar">
        <AppBar position="static" style={{ background: "#009da5" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RELAXANI
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClick={handleCloseNavMenu}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to={"/timer"}
                  >
                    Tempo
                  </MenuItem>
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to={"/calendar"}
                  >
                    Kalender
                  </MenuItem>
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to={`/form/${new Date()
                      .toLocaleDateString()
                      .replaceAll("/", "-")}`}
                  >
                    Formulier
                  </MenuItem>
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to={`/livefollower/${new Date()
                      .toLocaleDateString()
                      .replaceAll("/", "-")}`}
                  >
                    Overzicht
                  </MenuItem>
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to={"/registration"}
                  >
                    Registreer
                  </MenuItem>
                  <a
                    href="https://relaxanics.duckdns.org"
                    target="_blank"
                    className="noDec Black"
                    rel="noreferrer"
                  >
                    <MenuItem onClick={() => setAnchorEl(null)}>Files</MenuItem>
                  </a>
                </Menu>
              </Box>
              {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RELAXANI
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  component={Link}
                  to={"/timer"}
                >
                  Tempo
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  component={Link}
                  to={"/calendar"}
                >
                  Kalender
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  component={Link}
                  to={`/form/${new Date()
                    .toLocaleDateString()
                    .replaceAll("/", "-")}`}
                >
                  Formulier
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  component={Link}
                  to={`/livefollower/${new Date()
                    .toLocaleDateString()
                    .replaceAll("/", "-")}`}
                >
                  Overzicht
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  component={Link}
                  to={"/registration"}
                >
                  Registreer
                </MenuItem>
                <a
                  href="https://relaxanics.duckdns.org"
                  target="_blank"
                  className="noDec"
                  rel="noreferrer"
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>Files</MenuItem>
                </a>
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Tooltip title="Open settings">
                  <button onClick={handleOpenUserMenu} className="navName">
                    {state.userName}
                  </button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClick={handleCloseUserMenu}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={async () => {
                      await signOut(auth);
                      dispatch({ type: "SET_USER_NAME", userName: "" });
                      dispatch({
                        type: "SET_LOGIN_STATE",
                        isAuthenticated: false,
                      });
                      setAnchorEl(null);
                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <Protected routeName={"/calendar"}>
                <CalendarComponent />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/timer"
            element={
              <Protected routeName={"/timer"}>
                <div>
                  <Clock />
                </div>
              </Protected>
            }
          />
          <Route
            path="/calendar"
            element={
              <Protected routeName={"/calendar"}>
                <CalendarComponent />
              </Protected>
            }
          />
          <Route
            path="/form/:date"
            element={
              <Protected routeName={"/form/:date"}>
                <WorkForm />
              </Protected>
            }
          />
          <Route
            path="/registration"
            element={
              <Protected routeName={"/registration"}>
                <Registration />
              </Protected>
            }
          />
          <Route
            path="/livefollower/:date"
            element={
              <Protected routeName={"/livefollower/:date"}>
                <LiveFollower />
              </Protected>
            }
          />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="naviBar">
        <AppBar position="static" style={{ background: "#009da5" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RELAXANI
              </Typography>
              {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
              <Typography
                className="center"
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RELAXANI
              </Typography>

              <Box sx={{ flexGrow: 1 }}>
                <Tooltip title="Open settings">
                  <button onClick={handleOpenUserMenu} className="navName">
                    {state.userName}
                  </button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClick={handleCloseUserMenu}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={async () => {
                      await signOut(auth);
                      dispatch({ type: "SET_USER_NAME", userName: "" });
                      dispatch({
                        type: "SET_LOGIN_STATE",
                        isAuthenticated: false,
                      });
                      setAnchorEl(null);
                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <Protected routeName={"/calendar"}>
                <CalendarComponent />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/timer"
            element={
              <Protected routeName={"/timer"}>
                <div>
                  <Clock />
                </div>
              </Protected>
            }
          />
          <Route
            path="/calendar"
            element={
              <Protected routeName={"/calendar"}>
                <CalendarComponent />
              </Protected>
            }
          />
          <Route
            path="/form/:date"
            element={
              <Protected routeName={"/form/:date"}>
                <WorkForm />
              </Protected>
            }
          />
          <Route
            path="/registration"
            element={
              <Protected routeName={"/registration"}>
                <Registration />
              </Protected>
            }
          />
          <Route
            path="/livefollower/:date"
            element={
              <Protected routeName={"/livefollower/:date"}>
                <LiveFollower />
              </Protected>
            }
          />
        </Routes>
      </div>
    );
  }
}
