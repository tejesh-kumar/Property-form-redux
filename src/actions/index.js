export const incrementStep = (nr) => {
    return {
        type: 'INCREMENT_STEP',
        payload: nr
    }
}

export const submitForm = (formData = true) => {
    return {
        type: 'SUBMIT_FORM',
        payload: formData
    }
}

export const readModelCsvData = (csvData) => {
    return {
        type: 'READ_MODEL_CSV_DATA',
        payload: csvData
    }
}

export const saveImages = (imgData) => {
    return {
        type: 'SAVE_IMAGES',
        payload: imgData
    }
}