const initialState = {
    // csvData: {
    //     Address: '',
    //     Bedroom: '',
    //     Bathroom: '',
    //     PropDescription: ''
    // }

    csvData: null
}

const readCsvReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'READ_MODEL_CSV_DATA':
            let receivedCsvData = {}

            const heading = action.payload[0].data
            const values = action.payload[1].data

            for(let i = 0; i < 4; i++) {
                const tempHead = heading[i]
                console.log(tempHead)
                receivedCsvData[tempHead] = values[i]
            }

            console.log(receivedCsvData)
            return {
                ...state,
                csvData: receivedCsvData
            }
        default:
            return state
    }
}

export default readCsvReducer