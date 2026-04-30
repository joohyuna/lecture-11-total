import styled, { useTheme } from "styled-components";
import {
    FaBitcoin,
    FaBook,
    FaCheckSquare,
    FaClipboardList,
    FaFilm,
    FaHome,
    FaMoon,
    FaRocket,
    FaSpaceShuttle,
    FaSun,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { type ReactNode, useContext } from "react";
import { ThemeContext } from "../../contexts/theme/ThemeContext.ts";

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.colors.background.paper};
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const NavMenu = styled.nav`
    display: flex;
    gap: 8px;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 800;
    background-color: ${props =>
        props.$isActive ? props.theme.colors.background.default : "transparent"};
    color: ${props =>
        props.$isActive ? props.theme.colors.primary : props.theme.colors.text.disabled};
    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

const ThemeToggleButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 90px;
    height: 36px;
    gap: 8px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s;
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    border: 1px solid ${props => props.theme.colors.divider};
    &:hover {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    }
    
`;


type MenuType = {
    path: string;
    label: string;
    icon: ReactNode; // 화면에 풀력되는 컴포라면 ReactNode
};

const menuList: MenuType[] = [
    {
        path: "/",
        label: "Home",
        icon: <FaHome size={18} />,
    },
    {
        path: "/todo",
        label: "Todo",
        icon: <FaCheckSquare size={18} />,
    },
    {
        path: "/coin",
        label: "Coin",
        icon: <FaBitcoin size={18} />,
    },
    {
        path: "/movie",
        label: "Movie",
        icon: <FaFilm size={18} />,
    },
    {
        path: "/board",
        label: "Board",
        icon: <FaClipboardList size={18} />,
    },
    {
        path: "/rocket",
        label: "Rocket",
        icon: <FaRocket size={18} />,
    },
    {
        path: "/book",
        label: "Book",
        icon: <FaBook size={18} />,
    },
];

function Header() {
    // ustTheme() : styled-components가 제공하는 훅
    // 현재 테아메 전달하는 테마 정보를 리턴하는 메소드
    const palette = useTheme();

    //useLocation(): react-router가 제공하는 현재사옹자 위치한 주소를 벌어오는 메서드
    // 위치한 주소등의 정보가 객체 상태로 리턴됨
    // 꺼낸이유 주소 "/" -> Home메뉴각 색상이 칠해지도록 하고 싶다.
    const { pathname } = useLocation();

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <HeaderContainer>
            <Logo>
                <FaSpaceShuttle color={palette.colors.primary} /> My Project
            </Logo>
            <NavMenu>
                {menuList.map((value, index) => (
                    // style-components로 만들어진 ㄴ컴포넌트에게 데이터를 전달해줄 때에는
                    // props로 전달해줘야 하지만 그 속성옆에 isActive 에 $
                    // /movie => pathname === movie 로 쓰면 안됨
                    //  react에 있는
                    <NavItem
                        key={index}
                        to={value.path}
                        $isActive={
                            value.path === "/" ? pathname === "/" : pathname.startsWith(value.path)
                        }>
                        {value.icon} {value.label}
                    </NavItem>
                ))}
            </NavMenu>
            <ThemeToggleButton onClick={toggleTheme}>
                {theme === "light" ? (
                    <>
                        <FaMoon size={16} /> 다크
                    </>
                ) : (
                    <>
                        <FaSun size={16} /> 라이트
                        </>
                )}
            </ThemeToggleButton>
        </HeaderContainer>
    );
}

export default Header;
