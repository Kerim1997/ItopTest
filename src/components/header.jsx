import { useEffect, useState } from "react";
import { getExchangeRateAsync } from '../api/privat.api';
import { useExchangeRate } from '../hooks/exchange.rate.hook';

export function Header() {
    const exchangeRates = useExchangeRate();

    if (exchangeRates == null || exchangeRates.lenght == 0) return ('Loading...');
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "50px",
            borderBottom: "1px solid black",
            width: "100vw"
        }}>
            {
                exchangeRates.map(rate => (
                    <div key={rate.ccy}>
                        <span style={{ marginLeft: "5px" }}>{rate.ccy}</span>
                        <span style={{ marginLeft: "5px" }}>{rate.buy} /</span>
                        <span style={{ marginLeft: "5px" }}>{rate.sale}</span>
                    </div>
                ))
            }
        </div>
    )
}
