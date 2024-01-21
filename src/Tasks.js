import { useContext } from "react";
import OpenUpdateForm from "./OpenUpdateForm";
import toast from "react-hot-toast";
import TotalTasks from "./TotalTasks";
import styled from "styled-components";

const formButton = {
  backgroundColor: "#fff",
  border: "none",
};

const style = {
  display: "flex",
  gap: "3em",
  width: "80rem",
  flexDirection: "column-reverse",
  alignItems: "center",
  margin: "auto",
};
const formDesign = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  paddingBottom: "1rem",
  width: "50rem",
};

const formDiv = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const DeleteTaskStyle = styled.button`
  color: white;
  background-color: #886bd9;
  border: none;
  text-transform: uppercase;
  height: 3rem;
  width: 7.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #7558c5;
  }
`;

function Tasks({ PostContext }) {
  const {
    resData,
    getTask,
    deleteTask,
    resDataTask,
    openUpdateForm,
    showTaskForm,
    setOpenUpdateForm,
  } = useContext(PostContext);
  const numberOfTotalTasks = Object.keys(resData).length;

  function handleTaskUpdate(e) {
    e.preventDefault();
    getTask(e.target.id);
    setOpenUpdateForm(true);
  }

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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  borderBottom: "1px solid rgb(210 210 210)",
                }}
              >
                <DeleteTaskStyle
                  onClick={() => {
                    const val = window.confirm(
                      `Would You like to delete this task - ${data.taskName}`
                    );
                    val && deleteTask(data.id);
                    val &&
                      toast.success(
                        `Task Name ( ${data.taskName} ) has been deleted!`
                      );
                  }}
                >
                  delete Task
                </DeleteTaskStyle>
                <form
                  style={formDesign}
                  onSubmit={handleTaskUpdate}
                  key={data.id}
                  id={data.id}
                >
                  <button type="submit" style={formButton}>
                    <div style={formDiv}>
                      <div style={{ display: "flex", fontSize: "15px" }}>
                        <h4>🖋 {data.taskName}</h4>
                      </div>
                      <p style={{ display: "flex", overflowWrap: "anywhere" }}>
                        {data.description}
                      </p>
                    </div>
                  </button>
                </form>
              </div>
            ))
          )}
        </>
      </div>
    </>
  );
}

export default Tasks;
