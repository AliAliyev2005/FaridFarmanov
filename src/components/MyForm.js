import React, { useEffect, useState } from "react";
import sale_img from "../img/document_pages_img/sale.png";
import moment_img from "../img/document_pages_img/moment.png";
import costumer_img from "../img/document_pages_img/costumer.png";
import stock_img from "../img/document_pages_img/stock.png";
import description_img from "../img/document_pages_img/description.png";
import status_img from "../img/document_pages_img/status.png";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";
import miniArrowDown_img from "../img/document_pages_img/mini-arrow-down.svg";
import { Col, DatePicker, Row, Space, Typography } from "antd";
import "../styles/Documents.css";
import MySelect from "./UI/select/MySelect";

function MyForm(props) {
	const [values, setValues] = useState(props.initialValues);
	const [isFetching, setFetching] = useState(false);
	const [showMoreForm, setShowMoreForm] = useState(false);

	const submit = async (e) => {
		e.preventDefault();

		try {
			setFetching(true);
			// await props.onSubmit(values)
			console.log(values);
		} finally {
			setFetching(false);

			if (props.title?.toLowerCase().includes("create")) {
				setValues(null);
			}
		}
	};
	const setValue = (field, value) => {
		setValues((old) => ({ ...old, [field]: value }));
	};

	useEffect(() => {
		console.log(props.initialValues);
		setValues(props.initialValues);
	}, [props.initialValues]);

	function onChange(value, dateString) {
		setValue("Moment", dateString);
		// console.log("Selected Time: ", value);
		// console.log("Formatted Selected Time: ", dateString);
	}

	function onOk(value) {
		console.log("onOk: ", value);
	}

	if (values === null) {
		return null;
	}

	return (
		<form className="doc-form" onSubmit={submit}>
			<fieldset disabled={isFetching}>
				<Row
					className="doc-form-row"
					onClick={() => setShowMoreForm(!showMoreForm)}
				>
					<Col className="form-label" span={21}>
						<label htmlFor="title">Təyinat</label>
					</Col>
					<Col className="form-icons" span={3}>
						<img
							src={
								showMoreForm ? miniArrowDown_img : miniArrow_img
							}
						/>
					</Col>
				</Row>

				{showMoreForm && (
					<div>
						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={sale_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label htmlFor="status">Satış №:</label>
							</Col>
							<Col className="form-input" span={12}>
								<input
									autoComplete="off"
									type="text"
									name="sale"
									placeholder="satış nömrəsi"
									value={values?.Name ?? ""}
									onChange={(e) =>
										setValue("Name", e.target.value)
									}
									required
								/>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row>
						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={status_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label htmlFor="name">Status:</label>
							</Col>
							<Col className="form-input" span={12}>
								<input
									type="text"
									name="name"
									placeholder="status"
									value={values?.Status ?? ""}
									onChange={(e) =>
										setValue("Status", e.target.value)
									}
									required
								/>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row>
						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={description_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label htmlFor="name">Şərh:</label>
							</Col>
							<Col className="form-input" span={12}>
								<input
									autoComplete="off"
									type="text"
									name="description"
									placeholder="Şərh"
									value={values?.Description ?? ""}
									onChange={(e) =>
										setValue("Description", e.target.value)
									}
									required
								/>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row>
					</div>
				)}

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						<img src={moment_img} />
					</Col>
					<Col className="form-label" span={6}>
						<label htmlFor="moment">Tarix:</label>
					</Col>
					<Col className="form-input" span={12}>
						<Space direction="vertical">
							<DatePicker
								onChange={onChange}
								className="date-picker"
								placeholder="tarix"
							/>
						</Space>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						<img src={stock_img} />
					</Col>
					<Col className="form-label" span={6}>
						<label htmlFor="status">Əsas Anbar:</label>
					</Col>
					<Col className="form-input" span={12}>
						<MySelect
							defaultValue={values?.StockName ?? ""}
							options={props.stocks}
							onChange={(e) => setValue("StockName", e)}
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						<img src={costumer_img} />
					</Col>
					<Col
						className="form-input"
						span={18}
						style={{ padding: "0 1rem", justifyContent: "start" }}
					>
						<input
							style={{ width: "100%" }}
							autoComplete="off"
							type="text"
							name="CustomerName"
							placeholder="Müştəri"
							value={values?.CustomerName ?? ""}
							onChange={(e) =>
								setValue("CustomerName", e.target.value)
							}
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				{/* 
                
                
						
						
						<img className="row-arrow" src={arrow_img} />
						<img className="form-icons" src={status_img} />
						<label className="form-label" htmlFor="status">
							Status
						</label>
						<input
							type="text"
							name="status"
							value={values?.Status ?? ""}
							onChange={(e) => setValue("Status", e.target.value)}
							required
						/>
                
                
                
                
                
                
                <label htmlFor="title">Ad</label>
				<input
					type="text"
					name="title"
					value={values?.Name ?? ""}
					onChange={(e) => setValue("Name", e.target.value)}
					required
				/>

				<label htmlFor="body">Moment</label>
				<input
					type="text"
					name="body"
					value={values?.Moment ?? ""}
					onChange={(e) => setValue("Moment", e.target.value)}
					required
				/>
				<label htmlFor="body">CustomerName</label>
				<input
					type="text"
					name="body"
					value={values?.CustomerName ?? ""}
					onChange={(e) => setValue("CustomerName", e.target.value)}
					required
				/>
				<label htmlFor="body">Status</label>
				<input
					type="text"
					name="body"
					value={values?.Status ?? ""}
					onChange={(e) => setValue("Status", e.target.value)}
					required
				/>
				<label htmlFor="body">Description</label>
				<input
					type="text"
					name="body"
					value={values?.Description ?? ""}
					onChange={(e) => setValue("Description", e.target.value)}
					required
				/>
				<label htmlFor="body">StockName</label>
				<input
					type="text"
					name="body"
					value={values?.StockName ?? ""}
					onChange={(e) => setValue("StockName", e.target.value)}
					required
				/>

				<input type="submit" value="send" /> */}
			</fieldset>
		</form>
	);
}

export default MyForm;

// const FormElement = () => {
//     return (
//         <Row className="doc-form-row">
//             <Col className="form-icons" span={3}>
//                 <img src={sale_img} />
//             </Col>
//             <Col className="form-label" span={6}>
//                 <label htmlFor="name">Satış №:</label>
//             </Col>
//             <Col className="form-input" span={12}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="10254"
//                     value={values?.Name ?? ""}
//                     onChange={(e) => setValue("Name", e.target.value)}
//                     required
//                 />
//             </Col>
//             <Col className="form-icons" span={3}>
//                 <img src={miniArrow_img} />
//             </Col>
//         </Row>

//     )
// }
