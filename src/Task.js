import { useContext } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const formButton = {
  backgroundColor: "#fff",
  border: "none",
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

function Task({ data, PostContext }) {
  const { getTask, deleteTask, setOpenUpdateForm } = useContext(PostContext);
  function handleTaskUpdate(e) {
    e.preventDefault();
    getTask(e.target.id);
    setOpenUpdateForm(true);
  }
  return (
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
            toast.success(`Task Name ( ${data.taskName} ) has been deleted!`);
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
  );
}

export default Task;
