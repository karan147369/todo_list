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
const updateTask = async ({ id, title, body, userId }) => {
  console.log(id);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.json();
};
const addTask = async ({ title, body, userId }) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
};
export default fetchEntireList;
export { deleteTask, updateTask, addTask };
