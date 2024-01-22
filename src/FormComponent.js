import { useContext, useState } from "react";
import styled from "styled-components";
import { PostContext } from "./contexts/TaskContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { createPortal } from "react-dom";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 1fr 11rem;
  gap: 2.4rem;

  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid black;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  width: 23rem;
  font-size: 15px;
`;
const TextAreaDesc = styled.textarea`
  height: 8rem;
  padding: 1rem;
  font-size: 15px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Form = styled.form`
  width: 80rem;
  overflow: hidden;
  font-size: 1.4rem;
  display: grid;
  justify-content: center;
  margin: auto;
`;

const Button = styled.button`
  color: #eef2ff;
  background-color: #4f46e5;
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  width: 11rem;
  border: 1px solid #e5e7eb;
  &:hover {
    background-color: #4338ca;
  }
`;

const RequiredP = styled.p`
  font-size: 11.5px;
  color: red;
`;

const FormRowBtn = styled.div`
  width: 41rem;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 1.5rem;
`;

const BackButtonAdd = {
  border: "none",
  margin: "1rem 0 4rem 17.3rem",
  borderRadius: "5px",
  width: "5rem",
  height: "1.8rem",
  fontSize: "25px",
  cursor: "pointer",
};

const BackButtonUpdate = {
  margin: "1rem 0 4rem 14.6rem",
  border: "none",
  borderRadius: "5px",
  width: "5rem",
  height: "1.8rem",
  fontSize: "25px",
  cursor: "pointer",
};

function FormComponent({ data = {} }) {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors, isSubmitting } = formState;
  const {
    updateTask,
    showTaskForm,
    createTask,
    setOpenUpdateForm,
    setShowTaskForm,
    setIsUpdateclick,
    setResDataTask,
  } = useContext(PostContext);
  const isUpdate = Boolean(data.id);

  const [task, setTask] = useState(null);
  const [desc, setDesc] = useState(null);

  const currentId = data?.id;

  function handleTaskSubmit(formData) {
    const { taskTitle: taskName, taskDescription: description } = formData;
    const formObj = {
      taskName,
      description,
    };
    if (isUpdate) {
      updateTask(formObj, currentId);
      reset();
      setResDataTask({});
      toast.success("Task has been updated!");
      setOpenUpdateForm(false);
      setIsUpdateclick(false);
    } else {
      createTask(formObj);
      reset();
      toast.success("New task has been added!");
      setShowTaskForm(false);
    }
  }

  return createPortal(
    <>
      {(isUpdate || showTaskForm) && (
        <div>
          <button
            style={isUpdate ? BackButtonUpdate : BackButtonAdd}
            onClick={() => {
              setOpenUpdateForm(false);
              setIsUpdateclick(false);
              setShowTaskForm(false);
              setResDataTask({});
              reset();
            }}
          >
            <HiChevronDoubleLeft />
          </button>
          <Form onSubmit={handleSubmit(handleTaskSubmit)}>
            <FormRow>
              <Label htmlFor="taskTitle">Task name </Label>
              <TextArea
                type="text"
                id="taskTitle"
                defaultValue={task ?? data.taskName}
                onChange={(e) => setTask(e.target.value)}
                disabled={isSubmitting}
                {...register("taskTitle", {
                  required: "This name field is required!",
                })}
              />
              <RequiredP>{errors?.taskTitle?.message}</RequiredP>
            </FormRow>
            <FormRow>
              <Label htmlFor="taskDescription">Description </Label>
              <TextAreaDesc
                type="text"
                id="taskDescription"
                defaultValue={desc ?? data.description}
                onChange={(e) => setDesc(e.target.value)}
                disabled={isSubmitting}
                {...register("taskDescription", {
                  required: "This description field is required!",
                })}
              />
              <RequiredP>{errors?.taskDescription?.message}</RequiredP>
            </FormRow>
            <FormRowBtn>
              <Button type="submit">
                {isUpdate ? "Update task" : "Add task"}
              </Button>
            </FormRowBtn>
          </Form>
        </div>
      )}
    </>,

    document.body
  );
}

export default FormComponent;
