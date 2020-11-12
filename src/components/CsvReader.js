import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';

import { incrementStep, readModelCsvData } from '../actions';

class CSVReader2 extends Component {
	handleOnDrop = (data) => {
		console.log(data);
		this.props.fetchCsvData(data);
	};

	handleOnError = (err, file, inputElem, reason) => {
		console.log(err);
	};

	handleOnRemoveFile = (data) => {
		console.log(data);
	};

	render() {
		return (
			<Row className="justify-content-center my-5 w-100">
        <Col md={12}>
        <CSVReader
					onDrop={this.handleOnDrop}
					onError={this.handleOnError}
					addRemoveButton
					onRemoveFile={this.handleOnRemoveFile}
				>
					<span>Drop CSV file here or click to upload.</span>
				</CSVReader>
        </Col>
				
        <Col className="mt-4" md={3}>
        <Button className="btn-block" variant="primary" onClick={this.props.increaseStep}>
					Continue to next Step
				</Button>
        </Col>
				
			</Row>
		);
	}
}

const mapStateToProps = (state) => ({
	step: state.currentStep
});

const mapDispatchToProps = (dispatch) => ({
	increaseStep: () => dispatch(incrementStep(1)),
	fetchCsvData: (data) => dispatch(readModelCsvData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CSVReader2);
