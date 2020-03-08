import React, {useEffect, useState} from 'react'
import ListItem from './../ListItems'
import {sortByName, sortByRating, sortByYear} from './../../actions/action'
import {useDispatch} from 'react-redux';
import './style.css'

const ListCard = ({restaurantData}) => {

    const dispatch = useDispatch();
    const [searchValue,setSearchValue] = useState("");
    const [rData,setData] = useState(restaurantData);

    useEffect(() => {
        setData(restaurantData)
    }, [restaurantData])

    useEffect(() => {
        const filterArray = restaurantData.filter(data => data.Brand.includes(searchValue))
        setData(filterArray);
    },[searchValue,restaurantData])



    const onSelectHandler = (e) => {
        const [order,
            type] = e
            .target
            .value
            .split(' ');

        if (type === "Name") {
            dispatch(sortByName(parseInt(order)))
        } else if(type ==="Rating") {
            dispatch(sortByRating(parseInt(order)))
        } else {
            dispatch(sortByYear(parseInt(order)))
        }
    }

    

    return (
        <div className="right-container">
            <div className="search-bar">
                <div>
                    <input value = {searchValue} onChange = {e => setSearchValue(e.target.value)} type="text"/>
                    <button>
                        <i className="fa fa-search"></i>
                    </button>
                    <select onChange= {e => {onSelectHandler(e)}} id="order">
                        <option value={"1 Name"}>Sort by Name A-Z</option>
                        <option value={"-1 Name"}>Sort by Name Z-A</option>
                        <option value={"1 Rating"}>Sort by Rating (High to Low)</option>
                        <option value={"-1 Rating"}>Sort by Rating (Low to High)</option>
                        <option value={"1 Top"}>Top Restaurant each year</option>
                    </select>
                </div>
            </div>
            <div className="card-container">
                {rData !== "undefined" && rData.map(data => <ListItem key={data.Brand + data.Variety + data.Country} data={data}/>)}
            </div>
        </div>
    )
}

export default ListCard;