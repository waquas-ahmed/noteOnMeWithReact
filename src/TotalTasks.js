const totalTask = {
  width: "58rem",
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "1.2rem",
  margin: "1rem auto",
};

function TotalTasks({ numberOfTotalTasks }) {
  return (
    <div style={totalTask}>
      {" "}
      <p>
        ✔There are total{" "}
        <b style={{ fontSize: "25px", fontStyle: "oblique" }}>
          {numberOfTotalTasks}
        </b>{" "}
        tasks
      </p>
    </div>
  );
}

export default TotalTasks;
