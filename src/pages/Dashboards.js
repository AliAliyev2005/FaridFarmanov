import React, { useState } from "react";
import withLoading from "../HOC/withLoading";

function Dashboards(props) {

    const [ barcode, setBarcode ] = useState([])
    const barcodeCam = (e) => {
        console.log(e.date)
        setBarcode([...barcode, e.date])
    }
	return (
		<div>
			<input
				// onChange={e => setBarcode([...barcode, e.date])}
				onChange={(e) => barcodeCam(e)}
				accept="image/*"
				id="icon-button-file"
				type="file"
				capture="environment"
			/>
			<p>{barcode[0] ? barcode : "not found"}</p>

			{/* <Dashboad data={(props.data ? props.data.cards : '')} /> */}
		</div>
	);
}

export default withLoading(Dashboards, "dashboard");

const Dashboad = (props) => {
	const {
		CashesBalance,
		LastCashesBalance,
		LastProfit,
		LastSales,
		LastSalesCount,
		LastStockBalance,
		Profit,
		Sales,
		SalesCount,
		StockBalance,
	} = props.data;
	return (
		<>
			<div className="dashboad">
				<div>
					<strong>SATIŞLAR</strong>
					<p>Bu gün: {SalesCount}</p>
					<p>Dünən: {LastSales}</p>
				</div>
			</div>
			<div className="dashboad">
				<div>
					<strong>MALİYYƏ</strong>
					<p>Balans: {CashesBalance} ₼</p>
					<p>Kassalar:: {LastCashesBalance}</p>
				</div>
			</div>
			<div className="dashboad">
				<div>
					<strong>ANBAR QALIĞI</strong>
					<p>Maya: {StockBalance}</p>
					<p>Miqdar:: {LastStockBalance}</p>
				</div>
			</div>
			<div className="dashboad">
				<div>
					<strong>GƏLİR</strong>
					<p>Bu gün: {Profit}</p>
					<p>Dünən: {LastProfit}</p>
				</div>
			</div>
		</>
	);
};
