import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from './../../actions/action';

import './style.css'

const FilterArea = () => {

    const dispatch = useDispatch();
    const restaurantData = useSelector(state => state.restaurantData.data);

    const [filter,
        setFilter] = useState({brand: [], country: [], style: []})

    const [selectedFilter,
        setSelectedfilter] = useState({Brand: [], Country: [], Style: []})

    useEffect(() => {
        const {brand, country, style} = filter;

        restaurantData.forEach(element => {
            if (!brand.includes(element.Brand)) {
                brand.push(element.Brand)
            }
            if (!country.includes(element.Country)) {
                country.push(element.Country)
            }
            if (!style.includes(element.Style)) {
                if ((element.Style === "Nan" || element.Style === "NaN") && !style.includes("other")) 
                    style.push("other")
                else 
                    style.push(element.Style)
            }
        })
        setFilter({brand, country, style})
        setSelectedfilter({
            Brand: Array(brand.length).fill(false),
            Country: Array(country.length).fill(false),
            Style: Array(style.length).fill(false)
        })
    }, [restaurantData])

    useEffect(() => {
        let filterData = {
            Brand : [],
            Country: [],
            Style: []
        }

        for (let key in selectedFilter) {
            selectedFilter[key].forEach((e, i) => {
                if (e === true) {
                    filterData[key].push(filter[key.toLowerCase()][i]);
                }
            })
        }
        dispatch(action.filterData(filterData))
    }, [selectedFilter])

    const onSelect = (e, index) => {
        const updatedArray = selectedFilter[e.target.name];
        if (e.target.value === "false") {
            updatedArray[index] = true;
        } else if (e.target.value === "true") {
            updatedArray[index] = false;
        }

        setSelectedfilter({
            ...selectedFilter,
            [e.target.name]: [...updatedArray]
        })

    }
    return (
        <div className="filter-area">
            <div style={{
                padding: "10px"
            }}>
                <p>Select appropriate items to filter</p>
            </div>

            <div className="filter-item">
                <p>Brand</p>
                <ul>
                    {filter
                        .brand
                        .map((brand, index) => (
                            <li key={brand}>
                                <label>
                                    <input
                                        value={selectedFilter.Brand[index]}
                                        name={"Brand"}
                                        onChange=
                                        {e => onSelect(e,index)}
                                        type="checkbox"/>
                                    <span>{brand}</span>
                                </label>
                            </li>
                        ))
}
                </ul>
                <p>Country</p>
                <ul>
                    {filter
                        .country
                        .map((country, index) => (
                            <li key={country}>
                                <label>
                                    <input
                                        value={selectedFilter.Country[index]}
                                        name="Country"
                                        type="checkbox"
                                        onChange=
                                        {e => onSelect(e,index)}/>
                                    <span>{country}</span>
                                </label>
                            </li>
                        ))
}
                </ul>
                <p>Style</p>
                <ul>
                    {filter
                        .style
                        .map((style, index) => (
                            <li key={style}>
                                <label>
                                    <input
                                        value={selectedFilter.Style[index]}
                                        name="Style"
                                        type="checkbox"
                                        onChange=
                                        {e => onSelect(e,index)}/>
                                    <span>{style}</span>
                                </label>
                            </li>
                        ))
}
                </ul>
            </div>
        </div>
    )
}

export default FilterArea;