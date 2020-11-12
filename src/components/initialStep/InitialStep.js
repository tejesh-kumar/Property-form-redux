import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CsvReader from '../CsvReader';
import { incrementStep } from '../../actions';
import './initialStep.css';

class InitialStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCsvUploader: false
		};
	}

	uploadAsCsvHandler = () => {
		this.setState({
			showCsvUploader: true
		});
	};

	render() {
		let csvReaderContainer = null;

		if (this.state.showCsvUploader === true) {
			csvReaderContainer = <CsvReader />;
		}
		return (
			<Container>
				<Row className="justify-content-center mb-3">
					<Col md={4}>
						<img
							className="img-fluid"
							src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
							alt=""
						/>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md={6} className="ButtonsContainer">
						<div>
							<Button className="btn-lg btn-block" variant="primary" onClick={this.props.increaseStep}>
								Add From Scratch
							</Button>
						</div>
						<div>
							<Button
								className="btn-lg btn-block"
								variant="warning"
								onClick={this.uploadAsCsvHandler}
							>
								Upload As CSV
							</Button>
						</div>
					</Col>
				</Row>
				<Row className="justify-content-center">{csvReaderContainer}</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	step: state.currentStep
});

const mapDispatchToProps = (dispatch) => ({
	increaseStep: () => dispatch(incrementStep(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialStep);
