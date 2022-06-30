import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'
import { CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";

function CoinGraph(){

    const {id} = useParams()
    
    const [coins, setCoins] = useState()

    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("Rs")
    
    const [historicalData, setHistoricalData] = useState()
    const [days, setDays] = useState(1)



    useEffect(()=>{
        if(currency === "PKR") setSymbol("Rs");
        else if(currency === "USD") setSymbol("$");
    },[currency])

    
    
   const chart = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    
    const singleCoin = `https://api.coingecko.com/api/v3/coins/${id}`

    const fetchSingleCoin = async()=>{
        const {data} = await axios.get(singleCoin)
        //console.log(data)
        setCoins(data)
    }
   // console.log(coins)


    const graphData = async()=>{
        const data = await axios.get(chart)
        setHistoricalData(data.prices)
        console.log("new",data)

    }


    useEffect(()=>{
        fetchSingleCoin()
        graphData()
    },[currency, days])

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                    <div className="form-group mb-5">
                        <select id="sel2"
                            value={currency}
                            onChange={(e)=> setCurrency(e.target.value)}
                        >
                            <option>Select Currency</option>
                            <option value={'USD'}>USD</option>
                            <option value={'PKR'}>PKR</option>
                        </select>

                    </div>

                    <div className="coin_info">
                        <img src={coins?.image.large} />
                        <span className="mt-3 mb-3">
                            {coins?.name}
                        </span>
                        <span>{ReactHtmlParser(coins?.description.en.split(".")[0])}.</span>

                        <span className="mt-3">
                        {symbol} {" "}
                            {coins?.market_data.current_price[currency.toLowerCase()]}.00
                        </span>
                    </div>
                    </div>

                    <div className="col-md-8">
                       
                        {/* <Line 
                           data={{
                               labels: historicalData.map((coin)=>{
                                let date = new Date(coin[0])
                                let time =
                                date.getHours() > 12
                                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                                    : `${date.getHours()} : ${date.getMinutes()} AM`;
                               })
                           }}
                                     
                        /> */}
                        
                    </div>
                    
                </div>
                
            </div>
          
        </>
    )
}

export default CoinGraph