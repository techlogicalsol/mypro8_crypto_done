import React from "react";
import { Pagination } from "@material-ui/lab";

function CustomPagination({setPage, numOfPage = 5}){

    const handlePageChange = (page) =>{
        setPage(page)
        window.scroll(0, 0)
    }


    return(
        <>
            <Pagination 
                color="secondary"
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",           
                }}

                count={numOfPage}
                onChange={(e)=> 
                handlePageChange(e.target.textContent)}
                        
            />
        
        </>
    )
}

export default CustomPagination