import { WHITELIST_CCY } from '../globals'

export function ExchangeRow(props) {
    return (
        <div>
            <input onChange={props.handleCountChange} min={1} id={props.id} type="number"  />
            <select onChange={props.handleCurrencyChange} id={props.id} value={props.currencyValue}>
                {
                    WHITELIST_CCY.map(ccy => (
                        <option key={ccy} value={ccy}>{ccy}</option>
                    ))
                }
            </select>
        </div>
    )
}