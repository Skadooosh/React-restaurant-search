import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchData} from './../actions/action'

import FilterArea from './FilterArea'
import ListCard from './ListCard';

function MainComponent() {
    const dispatch = useDispatch();
    const restaurantData = useSelector(state => state.restaurantData.data);
    const filterData = useSelector(state => state.restaurantData.filterData);

    const [listData,
        setListData] = useState(restaurantData);

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    useEffect(() => {
        setListData(restaurantData)
    }, [restaurantData])

    useEffect(() => {

        let shouldFilter = false;

        for (let key in filterData) {
            if (filterData[key].length > 0) 
                shouldFilter = true;
            }
        
        if (shouldFilter) {
            let filteredData = [...restaurantData]

            if (filterData["Brand"].length > 0) {
              const brands = filterData["Brand"];
              filteredData = filteredData.filter(e => {
                return brands.includes(e.Brand);
              })
            }

            if (filterData["Country"].length > 0) {
                const countries = filterData["Country"];
                filteredData = filteredData.filter(e => {
                  return countries.includes(e.Country);
                })

            }

            if (filterData["Style"].length > 0) {
              const styles = filterData["Style"];
              filteredData = filteredData.filter(e => {
                return styles.includes(e.Style);
              })
            }

            setListData(filteredData)

        } else {
            setListData(restaurantData)

        }

    }, [filterData])

    return (
        <div style ={{
            display: "flex"
        }}>
            <FilterArea/>
            <ListCard restaurantData={listData}/>
        </div>
    );
}

export default MainComponent;
