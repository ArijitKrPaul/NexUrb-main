import React from "react";
import DeptAdminCard from "./DeptAdminCard";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeptAdmin = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    localStorage.removeItem("user");
    navigate("/login");
    setOpen(false);
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
    <div className="bg-[#F8F9FA] h-[125vh] w-full p-5">
      <div className="bg-[#F8F9FA] h-[118vh] w-full px-45 py-10">
        <div className="border-b border-black pb-10 flex justify-between">
          <div>
            <p className=" text-left text-5xl font-extrabold mb-15 font-sans">
              NEXURB
            </p>
            <p className=" text-left text-7xl font-extrabold font-sans">
              OPERATIONS
            </p>
            <p className=" text-left text-7xl font-extrabold font-sans">
              DASHBOARD.
            </p>
          </div>
          <div>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open}
              aria-haspopup="true"
              onClick={handleToggle}
              className="text-black"
            >
              Dashboard
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
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
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
        <DeptAdminCard />
      </div>
    </div>
  );
};

export default DeptAdmin;
