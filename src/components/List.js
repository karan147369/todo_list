import "../style/list.css";
import { useEffect, useRef, useState } from "react";
import fetchEntireList, { updateTask, deleteTask } from "../api";
import Task from "./Task";

const List = () => {
  const [List, setList] = useState([]);
  const pageCount = useRef(1);
  const [pageData, setPageData] = useState([]);
  const [updateTask, setUpdateTask] = useState();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState();
  const taskFunction = useRef();
  const updateID = useRef(0);

  useEffect(() => {
    let arr = [];
    arr = [newTask, ...pageData];
    console.log(arr);
    if (arr.length !== 1) setPageData(arr);
    setShowTaskForm(false);
  }, [newTask]);
  useEffect(() => {
    const arr = [];
    console.log(updateID);
    for (let i of pageData) {
      if (i.id !== updateTask.id) arr.push(i);
      else arr.push(updateTask);
    }
    setShowTaskForm(false);
    if (arr.length !== 1) setPageData(arr);
  }, [updateTask]);
  useEffect(() => {
    fetchEntireList().then((res) => {
      setList(res);
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(res[i]);
      }
      setPageData(arr);
    });
  }, []);

  const chageButtonSytle = (e) => {
    const button = document.getElementById(e.target.id);
    button.addEventListener("mousedown", () => {
      button.style.color = "rgb(10, 63, 46)";
      button.style.backgroundColor = "white";
      button.style.border = "1px solid black";
    });
    button.addEventListener("mouseup", () => {
      button.style.color = "white";
      button.style.backgroundColor = "rgb(10, 63, 46)";
      button.style.border = "none";
    });
  };
  const nextPage = (e) => {
    let arr = [];
    let pageNo = pageCount.current;
    if (pageCount.current < 9) pageCount.current = pageNo + 1;
    else pageCount.current = 10;
    for (let i = pageCount.current * 10 - 10; i < pageCount.current * 10; i++) {
      arr.push(List[i]);
    }
    if (arr.length > 0) {
      setPageData(arr);
    }

    chageButtonSytle(e);
  };
  const prevPage = (e) => {
    let arr = [];
    let pageNo = pageCount.current;
    if (pageCount.current > 1) pageCount.current = pageNo - 1;
    else pageCount.current = 1;

    for (let i = pageCount.current * 10 - 10; i < pageCount.current * 10; i++) {
      arr.push(List[i]);
    }
    if (arr.length > 0) {
      setPageData(arr);
    }

    chageButtonSytle(e);
  };
  const calldeleteTask = async (e) => {
    const response = await deleteTask(e.target.id);
    let arr = [];
    arr = pageData.filter((element) => {
      return element.id !== parseInt(e.target.id.split(":")[1]);
    });
    setPageData(arr);
  };
  const callUpdateTask = async (e) => {
    const bool = showTaskForm;
    setShowTaskForm(!bool);
    taskFunction.current = "updateTask";
    updateID.current = e.target.id.split(":")[1];
  };

  const callAddTask = async (e) => {
    const bool = showTaskForm;
    taskFunction.current = "newTask";
    setShowTaskForm(!bool);
  };
  return (
    <>
      <div id="wrapper">
        <div id="header">
          <button onClick={(e) => prevPage(e)} class="button" id="button-1">
            prevPage
          </button>
          <span id="page-counter">{`${pageCount.current}/10`}</span>
          <button onClick={(e) => nextPage(e)} class="button" id="button-2">
            nextPage
          </button>
          <button onClick={(e) => callAddTask(e)} class="button" id="button-3">
            Add Task
          </button>
        </div>
        {showTaskForm ? (
          <Task
            setNewTask={setNewTask}
            setUpdateTask={setUpdateTask}
            updateId={updateID.current}
            function={taskFunction}
          ></Task>
        ) : null}
        <div id="container">
          {pageData.map((element, index) => {
            return (
              <>
                <div id={`column-1`}>{element.id}</div>
                <div id={`column-2`}>{element.userId}</div>
                <div id={`column-3`}>{element.title}</div>
                <div id={`column-4`}>
                  <button
                    className="btn btn-danger"
                    id={`delete:${element.id}`}
                    onClick={(e) => calldeleteTask(e)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    id={`update:${element.id}`}
                    onClick={(e) => {
                      callUpdateTask(e);
                    }}
                  >
                    Update
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default List;
