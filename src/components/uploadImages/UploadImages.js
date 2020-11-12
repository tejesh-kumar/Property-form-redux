import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Row, Col, Container, Button, Alert, Form } from 'react-bootstrap';
import cuid from 'cuid';

import './uploadImages.css';
import { saveImages } from '../../actions';

class UploadImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			featuredImage: '',
			error: null,
			showError: false
		};
		this.featuredRef = createRef()
	}

	onDrop = (files) => {
		if (this.state.images.length + files.length > 4) {
			this.setState({
				...this.state,
				error: 'Error! Max of Four images can be uploaded',
				showError: true
			});
		} else {
			files.forEach((file) => {
				const reader = new FileReader();

				reader.onabort = () => {
					this.setState({
						...this.state,
						error: 'Error! File reading was aborted',
						showError: true
					});
				};

				reader.onerror = () => {
					this.setState({
						...this.state,
						error: 'Error! File reading has failed',
						showError: true
					});
				};

				reader.onload = () => {
					const base64url = reader.result;
					const tempImgArray = [ ...this.state.images ];
					tempImgArray.push({ id: cuid(), src: base64url });

					this.setState({
						...this.state,
						images: tempImgArray,
						error: null,
						showError: false
					});
				};

				reader.readAsDataURL(file);
			});
		}
	};

	submitImageData = () => {
		console.log(this.state.images);
		console.log(this.props.property);
		this.props.saveImgData(this.state.images);
	};

	selectFeaturedImage = (e) => {
		console.log(e.target.id);
		this.setState({
			...this.state,
			featuredImage: e.target.id
		})
	}

	render() {
		let imgPreview, errorAlert;

		if (this.state.error && this.state.showError) {
			errorAlert = (
				<Alert variant="danger" onClose={() => this.setState({ ...this.state, showError: false })} dismissible>
					<Alert.Heading>{this.state.error}</Alert.Heading>
				</Alert>
			);
		} else {
			errorAlert = null;
		}

		if (this.state.images) {
			imgPreview = this.state.images.map((image) => (
				<Col key={image.id} md={4} sm={6} className="p-3">
					<div className="UploadedImage">
						<img className="img-fluid" src={image.src} alt="" />
					</div>
					<div>
						{
							this.featuredImage === image.id ? 
							<Form.Group ref={this.featuredRef} controlId={image.id}>
								<Form.Check type="checkbox" label="Featured Image" checked onChange={this.selectFeaturedImage} />
							</Form.Group> :
							<Form.Group ref={this.featuredRef} controlId={image.id}>
								<Form.Check type="checkbox" label="Featured Image" onChange={this.selectFeaturedImage} />
							</Form.Group>
						}
					</div>
				</Col>
			));
		}

		return (
			<Container>
				{errorAlert}
				<Row className="w-100">
					<Col sm={12}>
						<Dropzone
							className="Dropzone"
							onDrop={this.onDrop}
							accept="image/png, image/jpg, image/jpeg, image/svg"
							minSize={0}
							maxSize={1048576}
							multiple
						>
							{({ getRootProps, getInputProps, isDragActive, isDragReject, isFileTooLarge }) => (
								<div className="Dropzone" {...getRootProps()}>
									<input className="Dropzone" {...getInputProps()} />
									{isDragActive ? null : 'Click me or drag a file to upload!'}
									{isDragReject && 'These File types are not accepted, sorry!'}
									{isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
								</div>
							)}
						</Dropzone>
					</Col>
				</Row>

				<Row>{imgPreview}</Row>

				<Row className="d-flex justify-content-end p-5">
					<Col lg={2} md={4}>
						<Button className="btn-lg btn-success btn-block" onClick={this.submitImageData}>
							Submit
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	upoadedImages: state.images,
	property: state.propertyDetails
});

const mapDispatchToProps = (dispatch) => ({
	saveImgData: (imgData) => dispatch(saveImages(imgData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
