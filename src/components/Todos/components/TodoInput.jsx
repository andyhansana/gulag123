import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useTodos } from "../store/Store";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
}));

const TodoInput = (props) => {
  const { addTodo } = useTodos();

  const classes = useStyles();
  const [newTodo, setNewTodo] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newDate, setNewDate] = useState("");

  const onClick = () => {
    addTodo(newTodo, newDate, newTime);
    setNewTodo("");
    setNewDate("");
    setNewTime("");
  };
  return (
    <>
      <Grid container>
        <Grid item>
          <TextField
            className={classes.textField}
            label="Enter Task Name"
            variant="outlined"
            size="small"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <TextField
            className={classes.textField}
            type="date"
            variant="outlined"
            size="small"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <TextField
            className={classes.textField}
            type="time"
            variant="outlined"
            size="small"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Box pl={1}>
            <Button
              disabled={newTodo.length === 0}
              variant="contained"
              color="primary"
              onClick={onClick}
            >
              Add Reminder
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TodoInput;
