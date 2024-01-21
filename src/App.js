import Tasks from "./Tasks";
import { TaskContext, PostContext } from "./contexts/TaskContext";
import FormToggleButton from "./FormToggleButton";
import FormComponent from "./FormComponent";
import { Toaster } from "react-hot-toast";
import { PiNotepad } from "react-icons/pi";
import styled from "styled-components";
const Header = styled.header`
  display: flex;
  width: 58rem;
  margin: auto;
  flex-direction: row-reverse;
`;

const P = styled.p`
  font-family: none;
  font-size: 2.5rem;
  color: #528787;
  font-weight: 800;
  margin-top: 0.5rem;
  box-shadow: 1px 2px 4px 1px #c3bdbe, -1px 0px 1px 1px #949b9f;
`;

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{ margin: "-10px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#776d1b",
            color: "white",
          },
        }}
      />
      <TaskContext>
        <Header>
          <PiNotepad
            style={{
              fontSize: "4rem",
              width: "58rem",
              // margin: ".1rem auto 0",
              display: "flex",
              margin: "0.1rem 15rem 0px 7rem",
            }}
          />
          <P>NoteOnMe</P>
        </Header>
        <FormComponent PostContext={PostContext} />
        <FormToggleButton PostContext={PostContext} />
        <Tasks PostContext={PostContext} />
      </TaskContext>
    </>
  );
}

export default App;
