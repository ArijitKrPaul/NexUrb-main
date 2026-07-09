import React from "react";

import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { UserCircleIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboradCard";

export default function DashboardComponent() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  function handleClickAway() {
    setOpen(false);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className="bg-[#F8F9FA] h-[170vh] w-full p-5">
      <div className="bg-[#F8F9FA] h-[135vh] w-full px-45 py-10">
        <div className="border-b border-black pb-10 flex justify-between">
          <div>
            <p className=" text-left text-5xl font-extrabold mb-15 font-sans">
              NEXURB
            </p>
            <p className=" text-left text-7xl font-extrabold font-sans">
              INVENTORY IN LINE,
            </p>
            <p className=" text-left text-7xl font-extrabold font-sans">
              PROJECTS ON TIME.
            </p>
          </div>
          <div>
            <IconButton
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open}
              aria-haspopup="true"
              aria-label="account menu"
              onClick={handleToggle}
              className="text-black!"
            >
              <UserCircleIcon size={32} weight="bold" />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-end"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-end" ? "right top" : "right bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
        <DashboardCard />
      </div>
    </div>
  );
}
