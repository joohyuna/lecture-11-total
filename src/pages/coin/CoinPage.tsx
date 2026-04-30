import { useEffect, useState } from "react";
import styled from "styled-components";
import CoinDetail from "./CoinDetail.tsx";
import CoinList from "./CoinList.tsx";

export type CoinType = {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    market_cap_usd: string;
    volume24: string;
};

type ApiResponseType = {
    data: CoinType[];
};

const Container = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100dvh - 150px);
`;

function CoinPage() {
    const [coins, setCoins] = useState<CoinType[]>([]);  // 목록 저장용
    const [loading, setLoading] = useState(true);  //
    const [selectedCoin, setSelectedCoin] = useState<CoinType | null>(null);

    useEffect(() => {
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
            .then(response => response.json())
            .then((json: ApiResponseType) => {
                setCoins(json.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                // finally는 성공이든 실패든 그 항목을 샐행하고 난 마지막에 샐행되어야 하는 내용들을 기재
                setLoading(false);
            });
    }, []);
    return (
        <Container>
            <CoinList
                coins={coins}
                loading={loading}
                selectedCoin={selectedCoin}
                setSelectedCoin={setSelectedCoin}
            />
            <CoinDetail selectedCoin={selectedCoin} />
        </Container>
    );
}

export default CoinPage;
