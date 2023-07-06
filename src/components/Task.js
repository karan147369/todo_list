import "../style/task.css";
import { useState } from "react";
import { addTask, updateTask } from "../api";
const Task = (props) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(0);
  const [userBody, setUserBody] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (props.function.current === "newTask") {
      addTask({ title: title, body: userBody, userId: userId }).then((res) =>
        props.setNewTask(res)
      );
    } else {
      updateTask({
        id: props.updateId,
        title: title,
        body: userBody,
        userId: userId,
      }).then((res) => {
        props.setUpdateTask(res);
        console.log(res);
      });
    }
  };
  const getValues = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "userId":
        setUserId(e.target.value);
    }
  };
  return (
    <>
      <div id="form-container">
        <span id="heading">
          {props.function.current === "newTask" ? "Add Task:" : "Update Task"}
        </span>
        <form>
          <table>
            <tr>
              <td>
                <input
                  onChange={(e) => getValues(e)}
                  id="title"
                  placeholder="Title"
                  name="title"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  name="userId"
                  onChange={(e) => getValues(e)}
                  id="userId"
                  placeholder="User Id"
                ></input>
              </td>
            </tr>
            <input
              type="submit"
              id="submit-title"
              className="btn btn-success btn-sm"
              onClick={(e) => submit(e)}
            ></input>
          </table>
        </form>
      </div>
    </>
  );
};
export default Task;
