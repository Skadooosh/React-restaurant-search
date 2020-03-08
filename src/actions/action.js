import * as actionTypes from './index';

export const fetchRequest = () => {
    return {
        type : actionTypes.FETCH_REQUEST
    }
}
export const fetchError = () => {
    return {
        type : actionTypes.FETCH_ERROR
    }
}
export const fetchSuccess = payload => {
    return {
        type : actionTypes.FETCH_SUCCESS,
        payload
    }
}
export const fetchData = () => {
    
    return async dispatch => {
        dispatch(fetchRequest());
        try {
            let response = await fetch('http://starlord.hackerearth.com/TopRamen');
            let json = await response.json();
            console.log(json);
            dispatch(fetchSuccess(json));
        } catch(err) {
            dispatch(fetchError());
        }

    }
}

export const sortByName = (order, name) => {
    return {
        type: actionTypes.SORT_BY_NAME,
        payload: {
            order,
            name
        }
    }
}

export const sortByRating = (order) => {
    return {
        type: actionTypes.SORT_BY_RATING,
        payload: {
            order
        }
    }
}
export const sortByYear = (order) => {
    return {
        type: actionTypes.SORT_BY_YEAR,
        payload: {
            order
        }
    }
}
export const filterData = (data) => {
    return {
        type: actionTypes.FILTER_DATA,
        payload: {
            data
        }
    }
}