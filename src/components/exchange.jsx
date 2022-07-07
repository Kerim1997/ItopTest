import { useState } from 'react';
import { WHITELIST_CCY, CROSS_CONVERTED_CCY } from '../globals'
import { ExchangeRow } from './exchange.row';
import { useExchangeRate } from '../hooks/exchange.rate.hook';

export function Exchange() {
    const exchangeRates = useExchangeRate();
    const [sellCcy, setSellCcy] = useState(WHITELIST_CCY[0]);
    const [buyCcy, setBuyCcy] = useState(WHITELIST_CCY[1]);
    const [sell, setSell] = useState(0);
    const [buy, setBuy] = useState(0);




    function recalculate(buy, sell, value, isSell) {
        console.log(`SELL ${sell} BUY ${buy} VAL ${value}`);
        var res = 0;
        if (sell == buy) {
            res = value;
        }
        else if (sell == CROSS_CONVERTED_CCY) {
            const b = exchangeRates.find(e => e.ccy == buy);
            console.log(b);
            res = value / b.sale;
        }
        else if (buy == CROSS_CONVERTED_CCY) {
            const s = exchangeRates.find(e => e.ccy == sell);
            res = s.buy * value;
        } else {
            const s = exchangeRates.find(e => e.ccy == sell);
            const b = exchangeRates.find(e => e.ccy == buy);
            res = (Number.parseFloat(s.buy) * Number.parseFloat(value)) / Number.parseFloat(b.sale);
        }


        setData(isSell, value, res)
    }

    function setData(isSell, value, result) {
        if (isSell) {
            setBuy(result)
            setSell(value);
        } else {
            setBuy(value)
            setSell(result);
        }
    }



    return (
        <div style={{ display: "flex" }}>
            <div>
                <input value={sell} onChange={(e) => recalculate(buyCcy, sellCcy, e.target.value, true)} min={1} type="number" />
                <select onChange={(e) => {
                    recalculate(buyCcy, e.target.value, sell, true);
                    setSellCcy(e.target.value)
                }} value={sellCcy}>
                    {
                        WHITELIST_CCY.map(ccy => (
                            <option key={ccy} value={ccy}>{ccy}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <input value={buy} onChange={(e) => recalculate(sellCcy, buyCcy, e.target.value, false)} min={1} type="number" />
                <select onChange={(e) => {
                    recalculate(e.target.value, sellCcy, buy, false)
                    setBuyCcy(e.target.value)
                }} value={buyCcy}>
                    {
                        WHITELIST_CCY.map(ccy => (
                            <option key={ccy} value={ccy}>{ccy}</option>
                        ))
                    }
                </select>
            </div>
        </div >
    )
}