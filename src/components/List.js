import "../style/list.css";
import { useEffect, useState } from "react";
import fetchEntireList, { updateTask, deleteTask, addTask } from "../api";

const List = () => {
  const [List, setList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    fetchEntireList().then((res) => {
      setList(res);
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
    for (let i = pageCount; i < pageCount + 10 && i <= 100; i++) {
      arr.push(List[i - 1]);
    }
    if (arr.length > 0 && pageCount <= 91) {
      setPageData(arr);
      setPageCount((prevState) => {
        return prevState + 10;
      });
    }
    chageButtonSytle(e);
  };
  const prevPage = (e) => {
    let arr = [];
    for (let i = pageCount - 1; i >= pageCount - 10 && i >= 1; i--) {
      arr.unshift(List[i - 1]);
    }
    if (arr.length > 0 && pageCount >= 11) {
      setPageData(arr);
      setPageCount((prevState) => {
        return prevState - 10;
      });
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
  return (
    <>
      <div id="wrapper">
        <div id="header">
          <button onClick={(e) => prevPage(e)} class="button" id="button-1">
            prevPage
          </button>
          <button onClick={(e) => nextPage(e)} class="button" id="button-2">
            nextPage
          </button>
          <button class="button" id="button-3">
            Add Task
          </button>
        </div>
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
