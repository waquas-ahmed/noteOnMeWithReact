import { useContext } from "react";
import OpenUpdateForm from "./OpenUpdateForm";
import TotalTasks from "./TotalTasks";
import Task from "./Task";

const style = {
  display: "flex",
  gap: "3em",
  width: "80rem",
  flexDirection: "column-reverse",
  alignItems: "center",
  margin: "auto",
};

function Tasks({ PostContext }) {
  const {
    resData,
    resDataTask,
    openUpdateForm,
    showTaskForm,
    setOpenUpdateForm,
  } = useContext(PostContext);
  const numberOfTotalTasks = Object.keys(resData).length;

  if (numberOfTotalTasks === 0) return;

  if (showTaskForm || showTaskForm) return;

  return (
    <>
      {!openUpdateForm && (
        <TotalTasks numberOfTotalTasks={numberOfTotalTasks} />
      )}
      <div style={style}>
        <>
          {openUpdateForm ? (
            <OpenUpdateForm
              data={resDataTask}
              setOpenUpdateForm={setOpenUpdateForm}
            />
          ) : (
            resData.map((data) => (
              <Task data={data} keys={data.id} PostContext={PostContext} />
            ))
          )}
        </>
      </div>
    </>
  );
}

export default Tasks;
