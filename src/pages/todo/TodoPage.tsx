import { useState, type SubmitEvent, useEffect } from "react";
import styled from "styled-components";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

type TodoType = {
    id: number;
    text: string;
    isCompleted: boolean;
};

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

const TodoList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TodoItem = styled.li<{ $isCompleted: boolean }>`
    background-color: ${props => props.theme.colors.background.paper};
    padding: 15px 20px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.5s;
    &:hover {
        border-color: ${props => props.theme.colors.primary};
    }
    span {
        flex: 1;
        font-size: 16px;
        color: ${props =>
            props.$isCompleted
                ? props.theme.colors.text.disabled
                : props.theme.colors.text.default};
        text-decoration: ${props => (props.$isCompleted ? "line-through" : "none")};
    }
`;

const IconButton = styled.button<{ $colorType: "success" | "error" | "warning" | "info" }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: all 0.5s;
    color: ${props => props.theme.colors[props.$colorType]};
    // props.theme.colors에 존재하는 프로퍼티 키가 props.$colorType 인 값을 꺼내오겠다.
    // 마침표 연결법을 쓰는것은 반드시 꼭 key가 영어 이어야 함 마침표 연결법은 변수를 쓸수 없어서 []를 사용함

    &:hover {
        opacity: 1;
    }
`;

function TodoPage() {
    const [inputValue, setInputValue] = useState(""); // 인풋에 입력
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
            id: Date.now(), // 고유값으로, 사용자가 "저장하는 시간"을 지금시간을 id로 쓰겠다.
            text: inputValue,
            isCompleted: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    useEffect(() => {
        // todos라는 state는 현재 Array를 저장하고 있기 때문에
        // 그값을 localStorage에 저장하기 위해서는 JSON 형식으로 바꿔줄 필요가 있음
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id: number) => {
        setTodos(
            // 가공만 한다면 수정함 한다면.map
            todos.map(value => {
                return value.id === id ? { ...value, isCompleted: !value.isCompleted } : value;
            }),
        );
    };

    const deleteTodo = (id: number) => {
        // 갯수 삭제는 filter
        setTodos (todos.filter(value => value.id !== id));
    };

    return (
        <Container>
            <Title>Todo List</Title>
            <InputSection onSubmit={handleAddTodo}>
                <StyledInput
                    placeholder={"오늘 할일 입력하세요"}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </InputSection>
            <TodoList>
                {todos.map((value, index) => (
                    <TodoItem key={index} $isCompleted={value.isCompleted}>
                        <IconButton $colorType={"success"} onClick={() => toggleTodo(value.id)}>
                            <FaCheck />
                        </IconButton>
                        <span>{value.text}</span>
                        <IconButton $colorType={"error"} onClick={() => deleteTodo(value.id)}>
                            <FaTrash />
                        </IconButton>
                    </TodoItem>
                ))}
            </TodoList>
        </Container>
    );
}

export default TodoPage;
