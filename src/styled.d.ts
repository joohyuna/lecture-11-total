import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        // 컬러 팔레트만 놓는 타입은 아님
        // 마진 간격이라든, 폰트 사이즈라든지, 그림자 두게라든지, 애니메이션의 시간이가든지
        // 팁프로젝트일 때
        colors: {
            background: {
                default: string;  // 앱의 가장 밑바탕
                paper: string;   // 사이드바, 카드 모달등 실내네용엥 적히는 div에 사용할 배경색
            };
            text: {
                default: string;  // 기본 글자쌕
                disabled: string;  // 비활성화 되거나 덜중요한 보조 글자색
            };
            divider: string;  // 선 테두리 구분선 사용할 색
            primary: string;  // 메인 브렌드 컬러
            secondary: string;  // 보조 포인트 컬러
            success: string;  // 성공 또는 긍정적인 상황을 나타낸는 컬러
            error: string;  // 오류 도는 부정적 상환 컬러
            warning: string;  // 경고 주의 컬러
            info: string; // 정보 쪼는 참고를 나타내는 컬러
        };
    }
}