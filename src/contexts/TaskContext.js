import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";

const PostContext = createContext();

const initialState = {
  resData: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "allTask":
      return { ...state, resData: action.payload };
    case "dataFailed":
      return { ...state, resData: action.payload };
    case "createdTask":
      return { ...state, resData: [...state.resData, action.payload] };
    case "deletedTask":
      return {
        ...state,
        resData: state.resData.filter((task) => task.id !== action.payload),
      };
    default:
      throw new Error("Unknow action");
  }
}

function TaskContext({ children }) {
  const [resDataTask, setResDataTask] = useState({});
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [isUpdateClick, setIsUpdateclick] = useState(Boolean(resDataTask.id));

  const [{ resData }, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getTasks() {
        try {
          const res = await axios({
            // Endpoint to send files
            url: "http://localhost:8000/tasks/",
            method: "GET",
          });
          dispatch({ type: "allTask", payload: res.data });
        } catch {
          toast.error("Something Went wrong, try again later");
        }
      }
      getTasks();
    },
    [openUpdateForm, showTaskForm]
  );

  const getTask = useCallback(async function getTask(id) {
    try {
      const res = await axios({
        // Endpoint to send files
        url: `http://localhost:8000/tasks/${id}`,
        method: "GET",
      });
      setResDataTask(res.data);
      setIsUpdateclick(true);
    } catch {
      toast.error("Something Went wrong fetching task, try again later");
    }
  }, []);

  const createTask = useCallback(async function (newTask) {
    try {
      const res = await axios({
        // Endpoint to send files
        url: "http://localhost:8000/tasks/",
        method: "POST",
        data: JSON.stringify(newTask),
      });
      dispatch({ type: "createdTask", payload: res.data });
      //   setResData((tasks) => [...tasks, res.data]);
    } catch {
      toast.error("Something Went very wrong (from creating), try again later");
    }
  }, []);

  const updateTask = useCallback(async function (task, id) {
    try {
      await axios({
        // Endpoint to send files
        url: `http://localhost:8000/tasks/${id}`,
        method: "PUT",
        data: JSON.stringify(task),
      });
    } catch {
      toast.error("Something Went very wrong (from update) , try again later");
    }
  }, []);

  const deleteTask = useCallback(async function (id) {
    try {
      await axios({
        // Endpoint to send files
        url: `http://localhost:8000/tasks/${id}`,
        method: "DELETE",
      });
      //   setResData((tasks) => tasks.filter((task) => task.id !== id));
      dispatch({ type: "deletedTask", payload: id });
    } catch {}
  }, []);

  const value = useMemo(() => {
    return {
      resData,
      getTask,
      createTask,
      updateTask,
      deleteTask,
      resDataTask,
      showTaskForm,
      openUpdateForm,
      isUpdateClick,
      setResDataTask,
      setShowTaskForm,
      setOpenUpdateForm,
      setIsUpdateclick,
    };
  }, [
    resData,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    isUpdateClick,
    openUpdateForm,
    resDataTask,
    showTaskForm,
  ]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export { TaskContext, PostContext };
