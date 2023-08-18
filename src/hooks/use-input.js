import {
    useReducer
} from "react"

const initialState = {
    value: '',
    isTouched: false
}

const inputReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {
            value: action.value,
            isTouched: state.isTouched
        }
    }

    if (action.type === 'BLUR') {
        return {
            value: state.value,
            isTouched: true
        }
    }

    if (action.type === 'RESET') {
        return {
            value: '',
            isTouched: false
        }
    }

    return initialState
}

const useInput = (validateValue) => {
    const [state, dispatch] = useReducer(inputReducer, initialState)

    const valueIsValid = validateValue(state.value)
    const hasError = !valueIsValid && state.isTouched

    const changeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value})
    }

    const blurHandler = () => {
        dispatch({type: 'BLUR'})
    }

    const resetHandler = () => {
        dispatch({type: 'RESET'})
    }

    return {
        value: state.value,
        isValid: valueIsValid,
        hasError,
        changeHandler,
        blurHandler,
        resetHandler
    }

}

export default useInput