import axios from 'axios';
import { WHITELIST_CCY } from '../globals'

export async function getExchangeRateAsync() {
    try {
        var result = await axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
        return result.data.filter(val => WHITELIST_CCY.includes(val.ccy));;
    } catch (err) {
        return [];
    }
}