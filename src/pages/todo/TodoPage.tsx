import { useState, type SubmitEvent } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

type TodoType = {
    id: number;
    text: string;
    isCompleted: boolean;
}

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputSection = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-size: 16px;
    outline: none;
    &:hover {
        border-color: ${props => props.theme.colors.primary};
    }
`;

const AddButton = styled.button`
    padding: 0 20px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    &:hover {
        opacity: 0.9;
    }
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
`;

function TodoPage() {
    const [inputValue, setInputValue] = useState("");  // 인풋에 입력
    const [todos, setTodos] = useState<TodoType[]>([]);
    const handleAddTodo = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        const newTodo: TodoType = {
            id:Date.now() ,  // 고유값으로, 사용자가 "저장하는 시간"을 지금시간을 id로 쓰겠다.
            text: inputValue,
            isCompleted: false,
        }
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    return (
        <Container>
            <Title>Todo List</Title>
            <InputSection onSubmit={handleAddTodo}>
                <StyledInput
                    placeholder={"오늘 할일 입력하세요"}
                    value={ inputValue }
                    onChange={e => setInputValue(e.target.value)}
                />
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </InputSection>
            {todos.map((value, index) => (
                <li key={index}>{value.text}</li>
            ))}
        </Container>
    );
}

export default TodoPage;
