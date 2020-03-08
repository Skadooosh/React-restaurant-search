import * as actionTypes from './../actions/index'

const initialState = {
    isFetching : false,
    hasFetched : false,
    data: [],
    filterData: {},
    finalData: []
}

export function restaurantDataReducer (state = initialState, action) {
    console.log(state.data)
    switch (action.type) {
        case actionTypes.FETCH_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_ERROR:
            return {...state, isFetching: false}
        case actionTypes.FETCH_SUCCESS:
            const sortAtStart = [...action.payload].filter(e => e["Top Ten"] !== "NaN");
            const yearNotRated = [...action.payload].filter(e => e["Top Ten"] === "NaN");
            console.log(action.payload,sortAtStart,yearNotRated)
            sortAtStart.sort((first, second) => {
                return(
                    (parseInt(second["Top Ten"].split(" #")[1]) - parseInt(first["Top Ten"].split(" #")[1])) *-1 
                )
            })

            sortAtStart.sort((first, second) => {
                return(
                    parseInt(second["Top Ten"].split(" ")[0]) - parseInt(first["Top Ten"].split(" ")[0])
                )
            })
            
            return {...state, isFetching: false, hasFetched: true, data: [...sortAtStart,...yearNotRated], finalData: [...sortAtStart,...yearNotRated]}
        case actionTypes.SORT_BY_NAME:
            const sortState = [...state.finalData];
            sortState.sort((first,second) => {
                if(first.Brand < second.Brand)
                    return -1 * action.payload.order;
                else
                    return 1 * action.payload.order;
            })
            return {
                ...state,
                finalData: [...sortState]

            }
        case actionTypes.SORT_BY_RATING:
            const sortRating = [...state.finalData];
            sortRating.forEach((rating,index) => {
                if(isNaN(rating.Stars)) {
                    sortRating[index].Stars = 0;
                }
            });
            
            sortRating.sort((first,second) => (second.Stars - first.Stars) * action.payload.order)

            return {
                ...state,
                finalData: [...sortRating]

            }
        case actionTypes.SORT_BY_YEAR:
            
            const sortYear = state.finalData.filter(e => e["Top Ten"] !== "NaN");
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
                finalData: [...sortYear]
            }        
        case actionTypes.FILTER_DATA:
            let isEmpty = true;
            
            for(let key in action.payload.data) {
                if(action.payload.data[key].length > 0)
                    isEmpty = false
            }

            if(isEmpty) {
                const sortYear = state.data.filter(e => e["Top Ten"] !== "NaN");
                const yearNotRated = state.data.filter(e => e["Top Ten"] === "NaN");

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
                    filterData: action.payload.data,
                    finalData: [...sortYear,...yearNotRated]
                }
            } else {
                return {
                    ...state,
                    filterData: action.payload.data
                }
            }

        case actionTypes.SAVE_FILTERED_DATA:
            return {
                ...state,
                finalData: [...action.payload.data]
            }
        default:
            return state;
    }
}

export default restaurantDataReducer;