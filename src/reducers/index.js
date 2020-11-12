import { combineReducers } from 'redux';
import readCsvReducer from './readCsv';
import saveImagesReducer from './saveImages';
import submitFormReducer from './submitForm';
import updateStepReducer from './updateStep';

const rootReducer = combineReducers({
	currentStep: updateStepReducer,
	propertyDetails: submitFormReducer,
	csvData: readCsvReducer,
	images: saveImagesReducer
});

export default rootReducer;
