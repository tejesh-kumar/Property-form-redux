const initialState = {
	propertyDetails: ''
};

const submitFormReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'SUBMIT_FORM':
			return {
                ...state,
                propertyDetails: action.payload
            }
		default:
			return state;
	}
};

export default submitFormReducer
