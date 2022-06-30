import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext()

function CryptoContext({children}){

    const [currency, setCurrency] = useState("pkr")
    const [symbol, setSymbol] = useState("Rs")

    useEffect(()=>{
        if(currency === "pkr") setSymbol("Rs");
        else if(currency === "usd") setSymbol("$");
    },[currency])

    return(
        <Crypto.Provider value={{currency, symbol, setCurrency}}>
        
            {children}
        
        </Crypto.Provider>
    )
}

export default CryptoContext    

