import { Col, Row } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import MyForm from "../components/MyForm";
import ProductListForSelect from "../components/ProductListForSelect";
import MyLoading from "../components/UI/loading/MyLoading";
import MyModal from "../components/UI/modal/MyModal";
import MySelect from "../components/UI/select/MySelect";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import product_img from "../img/document_pages_img/product.png";
import other_img from "../img/document_pages_img/other.svg";
import addProduct_img from "../img/document_pages_img/add-product.png";
import barcode_img from "../img/document_pages_img/barcode.png";
import save_img from "../img/document_pages_img/save.png";
import print_img from "../img/document_pages_img/print.png";
import close_img from "../img/document_pages_img/close.png";
import line_img from "../img/document_pages_img/line.svg";

function Document() {
	const { documentsItem } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);
	const [marks, setMarks] = useState("");
	const [stocks, setStocks] = useState("");
	const [debt, setDebt] = useState("");
	const [gotProducts, setGotProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [isFooterOpen, setIsFoterOpen] = useState(false);

	const [modalPrint, setModalPrint] = useState(false);
	const [modalProductListForSelect, setModalProductListForSelect] =
		useState(false);
	const [isModal2Open, setIsModal2Open] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [dataForUpdateModal, getDataForUpdateModal] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);

	const data = {
		id: documentsItem.Id,
		name: documentsItem.Name,
		moment: documentsItem.Moment,
		stockname: documentsItem.StockName,
		modify: documentsItem.Modify,
		stockid: documentsItem.StockId,
		mark: documentsItem.Mark,
		customerid: documentsItem.CustomerId,
		customername: documentsItem.CustomerName,
		departmentid: documentsItem.DepartmentId,
		ownerid: documentsItem.OwnerId,
		status: documentsItem.Status,
		description: documentsItem.Description,
		consumption: documentsItem.Consumption,
		profit: documentsItem.Profit,
		amount: documentsItem.Amount,
		discount: documentsItem.Discount,
		customerdiscount: documentsItem.CustomerDiscount,
		positions: documentsItem.Positions,
	};

	useEffect(() => {
		getMarks();
	}, []);
	const getMarks = async () => {
		setIsLoading(true);
		let res = await sendRequest("marks/get.php", {});
		setMarks(res.List);
		setIsLoading(false);
	};
	useEffect(async () => {
		setIsLoading(true);
		let res = await sendRequest("stocks/get.php", {});
		setStocks(res.List);
		setIsLoading(false);
	}, []);
	useEffect(async () => {
		setIsLoading(true);
		let obj = { id: documentsItem && documentsItem.CustomerId };
		let res = await sendRequest("customers/getdata.php", obj);
		setDebt(res.Debt);
		setIsLoading(false);
	}, []);

	useEffect(async () => {
		setIsLoading(true);
		let obj = { id: documentsItem && documentsItem.Id };
		let res = await sendRequest("demands/get.php", obj);
		setGotProducts(res.List[0].Positions);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		creatProductList();
	}, [selectedProducts, gotProducts]);

	const creatProductList = () => {
		let productList = selectedProducts.concat(gotProducts);
		setProducts(productList);
	};
	const deleteProduct = () => {
		let newProductsArr = products.filter((item) => item.Quantity !== 0);
		setProducts(newProductsArr);
	};

	const onChangeMarks = (item) => {
		console.log("ishledi", item);
	};
	const onChangeStocks = (item) => {
		data.stockid = item;
		console.log("ishledi", item);
		console.log("data", data);
	};

	const selectPrd = (arr) => {
		setSelectedProducts(arr);
	};
	const closeModal = () => {
		setModalProductListForSelect(false);
		computationPriceAndQuantity();
	};
	const closeModal2 = () => {
		deleteProduct();
		setIsModal2Open(false);
		computationPriceAndQuantity();
	};
	const saveButton = () => {
		let newArr = products.map((item) => {
			return {
				ProductId: item.ProductId,
				Quantity: item.Quantity,
				Price: item.Price,
			};
		});
		data.positions = newArr;
		sendRequest("demands/put.php", data);
	};
	const getQuantity = async (data) => {
		products.forEach((item) => {
			if (item.ProductId === data.Id) {
				item.Quantity = data.Quantity;
			}
		});
	};
	const computationPriceAndQuantity = () => {
		if (products[0]) {
			let tq = 0;
			let tp = 0;
			for (let i = 0; i < products.length; i++) {
				tq += products[i].Quantity;
				tp += products[i].Price * products[i].Quantity;
			}
			setTotalQuantity(tq);
			setTotalPrice(tp);
		}
	};
	useEffect(() => {
		computationPriceAndQuantity();
	}, [totalQuantity, totalPrice]);

	useMemo(() => {
		computationPriceAndQuantity();
	}, [gotProducts, modalProductListForSelect, isModal2Open, products]);

	const closeModalProductListForSelect = () => {
		setModalProductListForSelect();
	};

	return (
		<div className="document">
			<MyForm stocks={stocks} initialValues={documentsItem} />

			{isLoading && <MyLoading />}
            
            <Debt debt={debt} />

			<ProductList
				setModalProductListForSelect={setModalProductListForSelect}
				isFooterOpen={isFooterOpen}
				products={products}
				getDataForUpdateModal={getDataForUpdateModal}
				setIsModal2Open={setIsModal2Open}
			/>
			<DocFooter
				isFooterOpen={isFooterOpen}
				setIsFoterOpen={setIsFoterOpen}
				totalQuantity={totalQuantity}
				totalPrice={totalPrice}
			/>

			<MyModal
				visible={modalProductListForSelect}
				setVisible={setModalProductListForSelect}
			>
				<ProductListForSelect close={setModalProductListForSelect} selectPrd={selectPrd} />
			</MyModal>

			<MyModal visible={modalPrint} setVisible={setModalPrint}>
				<div>
					<p style={{ color: "black" }}>Qaimə şablon seçin</p>
					<button>A4</button>
					<button>58 mm</button>
					<button>78 mm</button>
				</div>
			</MyModal>
		</div>
	);
}

export default Document;


const Debt = ({debt}) => {
    return (
        <div className="debt">
            <p>
                Qalıq borc:
                <strong>
                    {debt} <sub>₼</sub>
                </strong>
            </p>
        </div>
    )
}

const DocFooter = (props) => {
	return (
		<div
			onClick={() => props.setIsFoterOpen(!props.isFooterOpen)}
			className={
				props.isFooterOpen ? "doc-footer doc-footer-open" : "doc-footer"
			}
		>
			<div className="line">
				<img src={line_img} alt="" />
			</div>
			<div className="texts">
				<div className="text-block">
					<p className="text">Ümumi məbləğ:</p>
					<p className="number">{props.totalPrice.toFixed(2)}</p>
				</div>
				<div className="text-block">
					<p className="text">Endirim:</p>
					<p className="number"></p>
				</div>
				<div className="text-block-important">
					<p className="text">Yekun məbləğ:</p>
					<p className="number"></p>
				</div>
				<div className="text-block">
					<p className="text">Miqdar</p>
					<p className="number">{props.totalQuantity}</p>
				</div>
				<div className="text-block">
					<p className="text">Mayası:</p>
					<p className="number"></p>
				</div>
				<div className="text-block">
					<p className="text">Qazanc:</p>
					<p className="number"></p>
				</div>
			</div>
			<div className="submit-buttons">
				<button className="close">
					<div>
						<img src={close_img} alt="" />
					</div>
					<p>Bağla</p>
				</button>
				<button className="print">
					<div>
						<img src={print_img} alt="" />
					</div>
					<p>Print</p>
				</button>
				<button className="save">
					<div>
						<img src={save_img} alt="" />
					</div>
					<p>Yadda saxla</p>
				</button>
			</div>
		</div>
	);
};

const ProductList = ({
	setModalProductListForSelect,
	products,
	setIsModal2Open,
	getDataForUpdateModal,
	isFooterOpen,
}) => {
	return (
		<div
			className={
				isFooterOpen
					? "product-list product-list-small"
					: "product-list"
			}
		>
			{products[0] ? (
				products.map((item, index) => {
					const { Name, StockQuantity, Quantity, Id, Price } = item;
					const onClick = () => {
						setIsModal2Open(true);
						getDataForUpdateModal(item);
					};
					return (
						<div key={index} onClick={onClick}>
							<Row className="row-products">
								<Col className="index" span={2}>
									<p>{index + 1}</p>
								</Col>
								<Col className="body" span={20}>
									<div className="text">
										<p className="product-name">{Name}</p>
										<div>
											<img src={product_img} alt="" />
											<p className="stock-quantity">
												{StockQuantity}
											</p>
										</div>
									</div>
									<div className="number">
										<div className="amount">
											<p>
												{Price * Quantity}<sub>₼</sub>
											</p>
										</div>
										<div className="quantity-price">
											<p>
												{Quantity}ed * {Price}<sub>₼</sub>
											</p>
										</div>
									</div>
								</Col>
								<Col className="other" span={2}>
									<button>
										<img src={other_img} alt="" />
									</button>
								</Col>
							</Row>
						</div>
					);
				})
			) : (
				<p>Mehsul secilmeyib</p>
			)}

			<div className="add-buttons">
				<button className="add-barcode">
					<img src={barcode_img} alt="" />
				</button>
				<button
					onClick={() => setModalProductListForSelect(true)}
					className="add-manual"
				>
					<img src={addProduct_img} alt="" />
					<p>Məhsul əlavə et</p>
				</button>
			</div>
		</div>
	);
};
