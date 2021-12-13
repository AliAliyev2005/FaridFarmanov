import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../config/context";
import { footerButtons } from "../config/data";
import "../styles/Footer.css";
import arrowUp from "../img/ArrowUp.png";
import arrowDown from "../img/ArrowDown.png";

function Footer() {
	const { getCheckedFooterNavItem } = useGlobalContext();
	const [isChecked, setIsChecked] = useState(false);
	const [isArrow, setIsArrow] = useState(false);

	const upFooterNav = () => {
		setIsArrow(!isArrow);
	};

	return (
		<footer
			className="footer"
			style={
				isArrow
					? { transition: "all 0.3s ease-in-out", bottom: 0 }
					: { transition: "all 0.3s ease-in-out", bottom: "-60px" }
			}
		>
			<div onClick={upFooterNav} className="line">
				<img src={isArrow ? arrowDown : arrowUp} />
			</div>
			<Row className="menu-bottom">
				{footerButtons.map((data, index) => {
					let { id, text, url, icon, icon_h } = data;
					const onClick = () => {
						setIsChecked(index);
						getCheckedFooterNavItem(id);
					};
					return (
						<Col key={id} style={{ width: "20%" }}>
							<div onClick={onClick}>
								<Link to={url}>
									<div className="footer-img">
										<img
											src={
												isChecked === index
													? icon_h
													: icon
											}
										/>
									</div>
									<div
										className={
											isChecked === index
												? "footer-text_h"
												: "footer-text"
										}
									>
										{text}
									</div>
								</Link>
							</div>
						</Col>
					);
				})}
			</Row>
		</footer>
	);
}

export default Footer;
