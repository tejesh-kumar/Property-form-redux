import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import InitialStep from './initialStep/InitialStep';
import PropertyForm from './propertyForm/PropertyForm';
import UploadImages from './uploadImages/UploadImages';
class MultiStepForm extends Component {
	render() {
		console.log(this.props.currentStep);
		let stepComp;
		const currentStep = this.props.currentStep;
		switch (currentStep) {
			case 1:
				stepComp = <InitialStep />;
				break;
			case 2:
				stepComp = <PropertyForm />;
				break;
			case 3:
				stepComp = <UploadImages />;
				break;
			default:
				return null;
		}

		return (
			<Container className="my-md-5">
				<Row>{stepComp}</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentStep: state.currentStep.currentStep
});

export default connect(mapStateToProps)(MultiStepForm);
