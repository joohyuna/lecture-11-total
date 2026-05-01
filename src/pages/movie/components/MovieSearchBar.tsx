import styled from "styled-components";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";




const FormBox = styled.form`
    display: flex;
    flex: 1;
`;

const Input = styled.input`
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

const Button = styled.button`
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
    svg {
        font-size: 24px;
    }
`;
function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const moveToSearch = (event: SubmitEvent<HTMLFormElement>) => {
        // 사용자를 강제이동
        event.preventDefault();
        if (!keyword.trim()) return;
        navigate(`/movie/list?keyword=${encodeURIComponent(keyword)}`);
        // 사용자를 이동시키는데 (Link나 a태그나, navigate) 그주소에 첫글자가 / 로 시작하지 않으면
        // 지금 현재의 주소 + search로 이동시킨
        // 그 주소에 첫글자가 / 로 시작하면
        // /search
    };

    const changeInput = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <FormBox onSubmit={moveToSearch}>
            <Input onChange={changeInput} placeholder={"영화 제목을 입력해주세요"} />
            <Button type={"submit"}>
                <FiSearch />
            </Button>
        </FormBox>
    );
}

export default SearchBar;
