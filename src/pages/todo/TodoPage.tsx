import { useState, type SubmitEvent, useEffect } from "react";
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
    &:focus {
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
    const [todos, setTodos] = useState<TodoType[]>(() => {
        // todos라는 state가 TodoPage컴포넌트가 불러와줄 때 마련되는 데,
        // 그 저장소의 초기값은 이 함수에서 리턴 된 값으로 결정됨
        // localStorage에서 "todos"라는 키를 가진 값을 불러오고
        // 그값이 '있으면" Javascript의 객체(배열) 형태로 반환에서 리턴하고, "없으면" 빈 배열을 리턴
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    }); // 할일 목록을 관리

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

    useEffect(() => {
        // todos라는 state는 현재 Array를 저장하고 있기 때문에
        // 그값을 localStorage에 저장하기 위해서는 JSON 형식으로 바꿔줄 필요가 있음
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

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
