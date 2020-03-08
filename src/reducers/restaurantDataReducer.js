import * as actionTypes from './../actions/index'

const initialState = {
    isFetching : false,
    hasFetched : false,
    data: [],
    filterData: {}
}

export function restaurantDataReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_ERROR:
            return {...state, isFetching: false}
        case actionTypes.FETCH_SUCCESS:
            const sortAtStart = [...action.payload];
            sortAtStart.sort((first,second) => {
                    if(first.Brand < second.Brand)
                        return -1;
                    else
                        return 1;
            })
            return {...state, isFetching: false, hasFetched: true, data: [...sortAtStart]}
        case actionTypes.SORT_BY_NAME:
            const sortState = [...state.data];
            sortState.sort((first,second) => {
                if(first.Brand < second.Brand)
                    return -1 * action.payload.order;
                else
                    return 1 * action.payload.order;
            })
            return {
                ...state,
                data: [...sortState]

            }
        case actionTypes.SORT_BY_RATING:
            const sortRating = [...state.data];
            sortRating.forEach((rating,index) => {
                if(isNaN(rating.Stars)) {
                    sortRating[index].Stars = 0;
                }
            });
            
            sortRating.sort((first,second) => (second.Stars - first.Stars) * action.payload.order)

            return {
                ...state,
                data: [...sortRating]

            }
        case actionTypes.SORT_BY_YEAR:
            const sortYear = state.data.filter(e => e["Top Ten"] !== "NaN");
            
            sortYear.sort((first, second) => {
                return(
                    (parseInt(second["Top Ten"].split(" #")[1]) - parseInt(first["Top Ten"].split(" #")[1])) *-1 
                )
            })

            sortYear.sort((first, second) => {
                return(
                    parseInt(second["Top Ten"].split(" ")[0]) - parseInt(first["Top Ten"].split(" ")[0])
                )
            })



            return {
                ...state,
                data: [...sortYear]

            }        
        case actionTypes.FILTER_DATA:
            return {
                ...state,
                filterData: action.payload.data
            }
        default:
            return state;
    }
}

export default restaurantDataReducer;