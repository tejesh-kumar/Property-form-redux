const initialState = {
    currentStep: 1
}

const updateStepReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT_STEP':
            let tempCurrentStep = state.currentStep + action.payload
            return {
                ...state,
                currentStep: tempCurrentStep
            }
        default:
            return state
    }
}

export default updateStepReducer