import React from 'react'
import './style.css'

const ListItem = ({data}) => {
    const arr = [0,0,0,0,0];
    arr.forEach((e,i) => {
        if(i + 1 <= data.Stars) {
            arr[i] = 1;
        }
    })  

    return(
        <div className = "card-item">
            <div style = {{position: "relative"}}>
                <img src ="//" width = "100%" alt ="img" />
                <span className="dot"><span>{data["Top Ten"] !== "NaN" && data["Top Ten"]}</span></span>
            </div>
            <div className ="card-content">
                <span className = "card-heading">{data.Brand}</span><br/>
                <span className = "card-rating">{data.Variety}</span><br/>
                <span className = "card-style">{data.style}</span><br />
                <span className = "card-style">{data.Country}</span><br />
                {arr.map((star,index) => 
                <span key = {index} className ={`fa fa-star ${star === 1 && "checked"}`}></span>    
                )}
                
            </div>

        </div>
    )
}

export default ListItem;