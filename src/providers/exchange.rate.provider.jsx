import React, { useState, useEffect, useContext } from "react";
import { getExchangeRateAsync } from "../api/privat.api";

const Context = React.createContext({});
const AffiliateContext = init => useContext(Context);

export const AffiliateProvider = ({ children }) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const getAffiliates = async () => {
            setLoading(true)
            const newText = await getExchangeRateAsync();
            setData(newText)
            setLoading(false)
        }
        
        getAffiliates()
    }, [])


    return (
        <AffiliateContext.Provider value={{ loading, list: data }}>
            {children}
        </AffiliateContext.Provider>
    )
}