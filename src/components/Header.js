import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import notification from "../img/Notification.png";
import menu from "../img/Menu.png";
import home from "../img/Home wite.png";
import products from "../img/Products wite.png";
import buy from "../img/Buy wite.png";
import checkout from "../img/Checkout wite.png";
import customers from "../img/CustomersN wite.png";
import finance from "../img/Finance wite.png";
import relate from "../img/Relate wite.png";
import reports from "../img/Reports wite.png";
import search from "../img/Search.png";
import slider from "../img/Slider.png";
import "../styles/Header.css";
import { useGlobalContext } from "../config/context";

function Header({ openSidebar }) {

	const { checkedFooterNavItem, openSearchInput, isSearch } = useGlobalContext();

	const [icon, setIcon] = useState("");
	const [text, setText] = useState("");
    
	const fucShowIcons = () => {
		if (checkedFooterNavItem === "") {
			setIcon(home);
			setText("Göstərici");
		}
		if (checkedFooterNavItem === 1) {
			setIcon(home);
			setText("Göstərici");
		}
		if (checkedFooterNavItem === 2) {
			setIcon(products);
			setText("Məhsullar");
		}
		if (checkedFooterNavItem === 3) {
			setIcon(buy);
			setText("Alışlar");
		}
		if (checkedFooterNavItem === 4) {
			setIcon(checkout);
			setText("Satışlar");
		}
		if (checkedFooterNavItem === 5) {
			setIcon(customers);
			setText("qarşı-tərəf");
		}
		if (checkedFooterNavItem === 6) {
			setIcon(finance);
			setText("Maliyyə");
		}
		if (checkedFooterNavItem === 7) {
			setIcon(relate);
			setText("Pərakəndə");
		}
		if (checkedFooterNavItem === 8) {
			setIcon(reports);
			setText("Hesabatlar");
		}
	};
	useEffect(() => {
		fucShowIcons();
	}, [ checkedFooterNavItem ]);
    
	return (
		<div className="header">
			<div>
				<div className="wraper">
					<button onClick={() => openSidebar(true)}>
						<img src={menu} alt="menu" className="img-menu" />
					</button>
					<div>
						<img src={logo} alt="logo" className="img-logo" />
					</div>
					<div>
						<img
							src={notification}
							alt="notification"
							className="img-notification"
						/>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div style={{ display: "flex", marginTop: "20px" }}>
					<img src={icon} alt="home" className="home" />
					<p className="text">/ {text}</p>
				</div>
				<div>
                    <button onClick = {() => openSearchInput(!isSearch)}>
                        <img
                            src={search}
                            alt="search"
                            style={{ marginRight: "1em" }}
                        />
                    </button>
					<img src={slider} alt="slider" />
				</div>
			</div>
		</div>
	);
}

export default Header;
