import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../config/context";
import {
	dashboardLinks,
	productsLinks,
	suppliesLinks,
	demandsLinks,
	customersLinks,
	financeLinks,
	relateLinks,
	reportsLinks,
	transactionsLinks,
} from "../config/data";
import "../styles/Content.css";

function Content(props) {
	const { checkedFooterNavItem, showFooter } = useGlobalContext();
	const [showIcons, setShowIcons] = useState([]);

    useEffect(() => {
        showFooter()
    },[])

	const fucShowIcons = () => {
		if (checkedFooterNavItem === 1) {
			setShowIcons(dashboardLinks);
			return;
		}
		if (checkedFooterNavItem === 2) {
			setShowIcons(productsLinks);
			return;
		}
		if (checkedFooterNavItem === 3) {
			setShowIcons(suppliesLinks);
			return;
		}
		if (checkedFooterNavItem === 4) {
			setShowIcons(demandsLinks);
			return;
		}
		if (checkedFooterNavItem === 5) {
			setShowIcons(customersLinks);
			return;
		}
		if (checkedFooterNavItem === 6) {
			setShowIcons(financeLinks);
			return;
		}
		if (checkedFooterNavItem === 7) {
			setShowIcons(relateLinks);
			return;
		}
		if (checkedFooterNavItem === 8) {
			setShowIcons(dashboardLinks);
			return;
		}
		return setShowIcons(dashboardLinks);
	};
	useEffect(() => {
		fucShowIcons();
	}, [checkedFooterNavItem]);

	return (
		<div>
			<Row>
				{showIcons.map((item) => {
					const { id, url, text, icon } = item;
					return (
						<Col span={8} key={id} >
							<Link to={url} >
								<div className="content_blok">
									<div className="img_block">
										<img src={icon} />
									</div>
									<div className="content_text">{text}</div>
								</div>
							</Link>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default Content;
