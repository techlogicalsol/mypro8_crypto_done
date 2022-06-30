import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function MySlider(){

    const settings = {

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


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


    const setVoteClass = (vote) =>{
        if(vote > 0){
          return 'green'
        }else{
          return 'red'
        }
      }

    return(
        <>
        <div className="main_grid mt-5">
      
        <Slider {...settings}>
            {coins && coins.map((item)=>(
          <div className="main_cast">
            <div className='colImg'>
            <img src={item.image} className="coinImg" />
                <div className="symbol">
                    <span style={{textTransform: "uppercase"}}>{item.symbol}</span>
                    <span>{item.name}</span>
                    {symbol} {" "}
                    {item.current_price.toFixed(2)}
            </div>
        </div>
          </div>
          ))}
          
        </Slider>
      </div>

        </>
    )
}

export default MySlider