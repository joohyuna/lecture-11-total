import styled from "styled-components";
import { type SubmitEvent, type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

const BooksFormBox = styled.form`
    display: flex;
    flex: 1;
    position: relative;
`;

const BooksInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 22px;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-size: 16px;
    outline: none;
    &:focus {
        border-color: ${props => props.theme.colors.primary};
    }
`;

const BooksButton = styled.button`
    position: absolute;
    right: 0;
    width: 44px;
    height: 44px;
    background-color: ${props => props.theme.colors.info};
    color: white;
    border: none;
    border-radius: 50%;
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

function BooksSearchBar() {
    const navigate = useNavigate(); // navigate라고 하는 변수에 이동에 관련된 기능 담아줘야함
    const [keyword, setKeyword] = useState(""); // input 입력 되는 값을
    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!keyword.trim()) return; // trim을 했더니, 값이 없으면 빈 스트림 이면 return으로 끝내라
        navigate(`search?keyword=${encodeURIComponent(keyword)}`);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <BooksFormBox onSubmit={onSubmit}>
            <BooksInput onChange={onChange} />
            <BooksButton type={"submit"}>
                <FiSearch />
            </BooksButton>
        </BooksFormBox>
    );
}

export default  BooksSearchBar;