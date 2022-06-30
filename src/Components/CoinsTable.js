import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";
import MySlider from './MySlider'

function CoinsTable(){
    
    const [coins, setCoins] = useState([]) 
    const [loading, setLoading] = useState(false)    
    const [numOfPages, setNumOfPages] = useState(5)
    const [page, setPage] = useState(1)
    const [searchTerm, SetSearchTerm] = useState("")
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("Rs")

    useEffect(()=>{
        if(currency === "PKR") setSymbol("Rs");
        else if(currency === "USD") setSymbol("$");
    },[currency])


   
    const coinsList = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${numOfPages}&page=${page}&sparkline=false`

    const fetchCoins = async()=>{
        setLoading(true)
        const response = await axios.get(coinsList)
        console.log("new", response)
        setCoins(response.data)
        setLoading(false)
       // setNumOfPages(response.data)
        
    }

    useEffect(()=>{
        fetchCoins()
       
    },[page, currency])

    //Perfect Search

    const filteredCoins = coins.filter((coin)=>(

        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())

    ))


    const setVoteClass = (vote) =>{
        if(vote > 0){
          return 'green'
        }else{
          return 'red'
        }
      }
    

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12 col_12">
                        <h1 className="display-3 mb-5">
                            Cryptocurrency Prices by Market Cap
                        </h1>
                        <MySlider />

<div className="form-group fmg mb-3 mt-5">
  <select id="sel1"
    value={currency}
    onChange={(e)=> setCurrency(e.target.value)}
  >
    <option>Select Currency</option>
    <option value={'USD'}>USD</option>
    <option value={'PKR'}>PKR</option>
  </select>

</div>

                        <TextField 
                            label="Search for a Crypto Currency..." 
                            variant="standard"
                            style={{width: "100%", marginBottom: 20}}
                            onChange={(e)=> SetSearchTerm(e.target.value)}

                        />
                        
                        <div class="table-responsive-md">



                        <table className="table">
                            <thead>
                                <tr>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>24h Change</th>
                                <th>Market Cap</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoins && filteredCoins.map((item)=>(
                                      
                                <tr key={item.id}>
                                    
                                    <td>
                                        <div className='colImg'>
                                        <img src={item.image} className="coinImg" />
                                        <div className="symbol">
                                            <span style={{textTransform: "uppercase"}}>{item.symbol}</span>
                                            <span>{item.name}</span>

                                        </div>
                                        </div>
                                    </td>

                                    <td>
                                    {symbol} {" "}
                                        {item.current_price.toFixed(2)}
                                       
                                    </td>

                                    <td className={`tag ${setVoteClass(item.price_change_percentage_24h)}`}>  
                                    {item.price_change_percentage_24h > 0 ? "+" : ""}
                                    {item.price_change_percentage_24h?.toFixed(2)}%
                                        
                                        
                                    </td>

                                    <td>
                                    {symbol} {" "}
                                        {item.market_cap.toString().slice(0, -6)} Million
                                    </td>

                                    <td>
                                    <Link className="myLink" to={`CoinGraph/${item.id}`}>
                                       View
                                    </Link>
                                    </td>
                                    
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        <CustomPagination 
                            setPage={setPage}
                            numOfPages={numOfPages}
                        />
                       
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default CoinsTable