const fetchEntireList = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
};
const deleteTask = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE",
    }
  );
  return response;
};
const updateTask = async (id) => {};
const addTask = async () => {};
export default fetchEntireList;
export { deleteTask, updateTask, addTask };
