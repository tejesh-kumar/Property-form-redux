import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { incrementStep, submitForm } from '../../actions';
import './propertyForm.css';

class PropertyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			bedroom: '',
			bathroom: '',
			description: '',
			error: {
				address: { value: '', show: false },
				bedroom: { value: '', show: false },
				bathroom: { value: '', show: false },
				description: { value: '', show: false }
			}
		};
		this.addressRef = createRef();
		this.bedroomRef = createRef();
		this.bathroomRef = createRef();
		this.descriptionRef = createRef();
	}

	handleChange = (e) => {
		e.preventDefault();
		const targetEl = e.target.id;
		console.log(this.state);

		switch (targetEl) {
			case 'form_address':
				this.setState({ ...this.state, address: this.addressRef.current.value });
				break;
			case 'form_bedroom':
				if (this.bedroomRef.current.value.length === 0) {
					console.log('yes');
					this.setState({
						...this.state,
						bedroom: this.bedroomRef.current.value,
						error: {
							...this.state.error,
							bedroom: { value: 'Number of bedrooms cannot be empty', show: true }
						}
					});
				} else if (this.bedroomRef.current.value.length > 10) {
					this.setState({
						...this.state,
						bedroom: this.bedroomRef.current.value,
						error: { ...this.state.error, bedroom: { value: 'Maximum character limit is 10', show: true } }
					});
				} else {
					this.setState({
						...this.state,
						bedroom: this.bedroomRef.current.value,
						error: { ...this.state.error, bedroom: { value: '', show: true } }
					});
				}

				break;
			case 'form_bathroom':
				if (this.bathroomRef.current.value.length === 0) {
					console.log('yes');
					this.setState({
						...this.state,
						bathroom: this.bathroomRef.current.value,
						error: {
							...this.state.error,
							bathroom: { value: 'Number of bathrooms cannot be empty', show: true }
						}
					});
				} else if (this.bathroomRef.current.value.length > 5) {
					this.setState({
						...this.state,
						bathroom: this.bathroomRef.current.value,
						error: { ...this.state.error, bathroom: { value: 'Maximum character limit is 5', show: true } }
					});
				} else {
					this.setState({
						...this.state,
						bathroom: this.bathroomRef.current.value,
						error: { ...this.state.error, bathroom: { value: '', show: true } }
					});
				}
				break;
			case 'form_description':
				this.setState({ ...this.state, description: this.descriptionRef.current.value });
				break;
			default:
				return null;
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const propertyData = { ...this.state };

		if (
			this.state.address !== '' &&
			this.state.bedroom.length !== 0 &&
			this.state.bedroom.length < 11 &&
			this.state.bathroom.length !== 0 &&
			this.state.bathroom.length < 6
		) {
			console.log(propertyData);
			this.props.submitForm(propertyData);
			this.props.increaseStep();
		} else {
			console.log('wrong values');

			this.setState({
				...this.state,
				error: {
					...this.state.error,
					address: { value: 'Property Address cannot be empty', show: true },
					bedroom: { value: 'Number of bathrooms cannot be empty & max character limit is 10', show: true },
					bathroom: { value: 'Number of bathrooms cannot be empty & max character limit is 5', show: true }
				}
			});
		}
	};

	componentDidMount() {
		if (this.props.csvData.csvData) {
			const { Address, Bedroom, Bathroom, PropDescription } = this.props.csvData.csvData;

			this.addressRef.current.value = Address;
			this.bedroomRef.current.value = Bedroom;
			this.bathroomRef.current.value = Bathroom;
			this.descriptionRef.current.value = PropDescription;

			this.setState({
				...this.state,
				address: Address,
				bedroom: Bedroom,
				bathroom: Bathroom,
				description: PropDescription
			});
		} else {
			const getLocationCoords = () => {
				return new Promise((resolve) => {
					navigator.geolocation.getCurrentPosition(function(position) {
						return resolve({
							lat: position.coords.latitude,
							lng: position.coords.longitude
						});
					});
				});
			};

			const getLocation = (result) => {
				fetch(
					`https://api.opencagedata.com/geocode/v1/json?q=${result.lat}+${result.lng}&key=a76b21d33cb647a5a5bc4c72562403cb`
				)
					.then((res) => res.json())
					.then((res) => {
						this.setState({
							...this.state,
							address: res.results[0].formatted
						});
					});
			};

			const fetchAddress = async () => {
				getLocationCoords().then((res) => getLocation(res));
			};

			fetchAddress();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.address !== this.state.address) {
			this.addressRef.current.value = this.state.address;
		}
	}

	render() {
		let addressErrorClass,
			bedroomErrorClass,
			bathroomErrorClass = 'd-none text-danger';

		if (!this.state.address) {
			addressErrorClass = 'text-danger';
		}

		if (!this.state.bedroom || this.state.bedroom.length > 10) {
			bedroomErrorClass = 'text-danger';
		}

		if (!this.state.bathroom || this.state.bathroom.length > 5) {
			bathroomErrorClass = 'text-danger';
		}

		return (
			<Container>
				<Row className="justify-content-between align-items-center">
					<Col md={6} className="FormContainer">
						<div className="FormHeading">
							<h3>Enter property details</h3>
						</div>

						<div className="w-100 FormBody">
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="form_address">
									<Form.Label>
										Address <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										ref={this.addressRef}
										as="textarea"
										rows={3}
										placeholder="Enter Property Address"
										onChange={(e) => this.handleChange(e)}
									/>
									<Form.Text className={addressErrorClass}>
										{this.state.error.address.value}
									</Form.Text>
								</Form.Group>

								<Form.Group controlId="form_bedroom">
									<Form.Label>
										Bedroom <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										ref={this.bedroomRef}
										type="number"
										placeholder="Number of bedrooms"
										onChange={(e) => this.handleChange(e)}
									/>
									<Form.Text className={bedroomErrorClass}>
										{this.state.error.bedroom.value}
									</Form.Text>
								</Form.Group>

								<Form.Group controlId="form_bathroom">
									<Form.Label>
										Bathroom <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										ref={this.bathroomRef}
										type="number"
										placeholder="Number of bathrooms"
										onChange={(e) => this.handleChange(e)}
									/>
									<Form.Text className={bathroomErrorClass}>
										{this.state.error.bathroom.value}
									</Form.Text>
								</Form.Group>

								<Form.Group controlId="form_description">
									<Form.Label>Description of property</Form.Label>
									<Form.Control
										ref={this.descriptionRef}
										as="textarea"
										rows={3}
										placeholder="Description"
										onChange={(e) => this.handleChange(e)}
									/>
								</Form.Group>

								<Button className="btn-block" type="submit">
									Submit
								</Button>
							</Form>
						</div>
					</Col>
					<Col md={4}>
						<img
							className="img-fluid"
							src="https://pixy.org/src/1/12149.jpg"
							alt="house-example"
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	csvData: state.csvData
});

const mapDispatchToProps = (dispatch) => ({
	submitForm: (propertyData) => dispatch(submitForm(propertyData)),
	increaseStep: () => dispatch(incrementStep(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyForm);
