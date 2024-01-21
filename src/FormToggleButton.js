import { useContext } from "react";

const add = {
  display: "flex",
  width: "58rem",
  flexDirection: "row-reverse",
  margin: "0 auto",
};
const addButton = {
  backgroundColor: "#fff",
  border: "none",
  cursor: "pointer",
  width: "10rem",
  height: "2rem",
  fontSize: "22px",
};

function FormToggleButton({ PostContext }) {
  const { setShowTaskForm, isUpdateClick, showTaskForm } =
    useContext(PostContext);
  return (
    !isUpdateClick &&
    !showTaskForm && (
      <div style={add}>
        <button
          type="button"
          style={addButton}
          onClick={() => setShowTaskForm((isOpen) => !isOpen)}
        >
          + Add task
        </button>
      </div>
    )
  );
}

export default FormToggleButton;
