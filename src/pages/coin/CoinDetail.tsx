import type { CoinType } from "./CoinPage.tsx";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

const DetailSection = styled.div`
    flex: 2;
    border-radius: 16px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const EmptyDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.text.disabled};
    gap: 15px;

    svg {
        font-size: 48px;
        color: ${props => props.theme.colors.warning};
        opacity: 0.5;
    }
`;

const DetailHeader = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 15px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};

    h2 {
        font-size: 32px;
        color: ${props => props.theme.colors.primary};
    }

    span {
        font-size: 20px;
        color: ${props => props.theme.colors.text.disabled};
        margin-bottom: 4px;
    }
`;

const InfoGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const InfoCard = styled.div`
    flex: 1;
    min-width: 200px;
    background-color: ${props => props.theme.colors.background.default};
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    span {
        font-size: 14px;
        color: ${props => props.theme.colors.text.disabled};
    }

    strong {
        font-size: 24px;
        color: ${props => props.theme.colors.text.default};
    }
`;

type Props = {
    selectedCoin: CoinType | null;
};

function CoinDetail({ selectedCoin }: Props) {
    if (!selectedCoin) {
        return (
            <DetailSection>
                <EmptyDetail>
                    <FaInfoCircle />
                    <p>좌측 목록에서 코인을 선택해주세요.</p>
                </EmptyDetail>
            </DetailSection>
        );
    }

    return (
        <DetailSection>
            <DetailHeader>
                <h2>{selectedCoin.name}</h2>
                <span>{selectedCoin.symbol}</span>
            </DetailHeader>

            <InfoGrid>
                <InfoCard>
                    <span>현재 가격 (USD)</span>
                    <strong>${parseFloat(selectedCoin.price_usd).toLocaleString()}</strong>
                </InfoCard>
                <InfoCard>
                    <span>시가총액</span>
                    <strong>${parseFloat(selectedCoin.market_cap_usd).toLocaleString()}</strong>
                </InfoCard>
                <InfoCard>
                    <span>24시간 거래량</span>
                    <strong>${parseFloat(selectedCoin.volume24).toLocaleString()}</strong>
                </InfoCard>
                <InfoCard>
                    <span>시가총액 순위</span>
                    <strong>{selectedCoin.rank}위</strong>
                </InfoCard>
            </InfoGrid>
        </DetailSection>
    );
}

export default CoinDetail;
