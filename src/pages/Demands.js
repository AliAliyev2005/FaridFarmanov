import React, { useEffect, useState } from "react";
import "../styles/Demands.css";
import SearchByDate from "../components/SearchByDate";
import SearchInput from "../components/UI/searcinput/SearchInput";
import { useGlobalContext } from "../config/context";
import { api } from "../api/api";
import MyLoading from "../components/UI/loading/MyLoading";
import withLoading from "../HOC/withLoading";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router';

function Demands(props) {
	const { isSearch, hideFooter } = useGlobalContext();

	let navigate = useNavigate();

	const [demands, setDemands] = useState();
	const [isLoading, setLoading] = useState(false);
	const [obj, setObj] = useState({
		pg: 0,
		nm: "",
		dr: 1,
		sr: "Moment",
		momb: "",
		mome: "",
	});

	useEffect(() => {
        setDemands(props.data)
		hideFooter();
	}, []);

	const fetchDemands = async () => {
		setLoading(true);
		let res = await api.fetchDemands(obj);
		setDemands(res);
		setLoading(false);
	};

	const getSearcObjByDate = (ob) => {
		setObj(ob);
		fetchDemands();
	};
	const fetchSearchTerm = async (searchTerm) => {
		let searchObj = obj;
		searchObj.nm = searchTerm;
		let res = await api.fetchDemands(searchObj);
		setDemands(res);
	};
    function handleClickOnPlusBtn() {
        navigate("/document");
    }
	if (isLoading) {
		return <MyLoading />;
	}

	return (
		<div>
			<SearchByDate obj={obj} getSearcObjByDate={getSearcObjByDate} />

			{isSearch && <SearchInput fetchSearchTerm={fetchSearchTerm} />}

			<DemandList demands={demands} />

            <DemandsFooter 
                handleClickOnPlusBtn={handleClickOnPlusBtn}
                data={props.data}
            />
		</div>
	);
}

export default withLoading(Demands, "demands");



const DemandsFooter = (props) => {
    return (
        <div className="document-footer">
            <div className="text">
                <p className="amount">Məbləğ</p>
                <p className="profit">Qazanc</p>
            </div>
            <div className="create-button">
                <button onClick={props.handleClickOnPlusBtn}>
                    <p>+</p>
                </button>
            </div>
            <div className="number">
                <p className="amount">
                    {props.data ? props.data.AllProfit.toFixed(2) : 0}
                </p>
                <p className="profit">
                    {props.data ? props.data.AllSum.toFixed(2) : 0}
                </p>
            </div>
        </div>
        )
}

const DemandList = ({ demands }) => {
	const today = new Date().toLocaleDateString(undefined, {
		day: "numeric",
		month: "numeric",
		year: "numeric",
	});

	return (
		<div className="demands_wrapper">
			{demands
				? demands.List.map((item, index) => {
						return (
							<Demand
								key={item.Name}
								item={item}
								index={index + 1}
							/>
						);
				  })
				: ""}
		</div>
	);
};

const Demand = ({ item, index }) => {
	const { getDocumentsItem } = useGlobalContext();
	const { CustomerName, Name, Amount, Moment } = item;
	const onClick = () => {
		getDocumentsItem(item);
	};
	return (
		<Link key={Name} to="/document" style={{ color: "inherit" }}>
			<div className="demand" onClick={onClick}>
				<div className="index">
					<p>{index}</p>
				</div>
				<hr></hr>
				<div className="demand-inner">
					<div className="demand-text">
						<p className="name">{CustomerName}</p>
						<div>
							<p className="moment">{Moment}</p>
							<p className="no">№{Name}</p>
						</div>
					</div>
					<div className="demand-price">
						<p className="amount">
							{Math.round(Amount * 100) / 100}
							<sub>₼</sub>
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
