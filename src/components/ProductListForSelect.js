import React, { useState } from "react";
import withLoading from "../HOC/withLoading";
import MyModal from "./UI/modal/MyModal";
import "../styles/SelectProducts.css";
import nullProduct_img from "../img/document_pages_img/null-product.png";
import plus_img from "../img/document_pages_img/plus.svg";
import minus_img from "../img/document_pages_img/minus.svg";
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


function ProductListForSelect(props) {
	console.log(props);
	const [modal, setModal] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [item, setItem] = useState("");
	const [indexProductList, setIndexProductList] = useState(null);

	const select = () => {
		props.close(false)
		let arr = props.data.List.filter((p) => p.checkedBox === true);
		props.selectPrd(arr);
	};

	const putQuantity = () => {
		props.data.List[indexProductList].Quantity = quantity;
		setModal(false);
		setQuantity(1);
        select()
	};

	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Məhsullar</h2>
				<Space direction="vertical">
					<Search placeholder="Məhsul axtarışı..." allowClear onSearch={Search} />
				</Space>
			</div>
			<ProductList
				setModal={setModal}
				setIndexProductList={setIndexProductList}
				setItem={setItem}
				products={props.data ? props.data.List : []}
			/>
			<button onClick={select}>SƏNƏDƏ QAYIT</button>
			<MyModal style={style} visible={modal} setVisible={setModal} >
				<div className="set-data">
					<p className="product-name">Mehsul adı</p>
					<hr />
					<div className="set-data-body">
						<p className="quantity">Miqdar</p>
						<div className="set-quantity">
							<button onClick={() => setQuantity(quantity - 1)} className="decrease">
								<img src={minus_img} alt=""></img>
							</button>
							<input value={quantity} min="0" onChange={(e) => setQuantity(Number(e.target.value))} type="number" />
							<button onClick={() => setQuantity(quantity + 1)} className="increase">
								<img src={plus_img} alt=""></img>
							</button>
						</div>
						<div className="price">
							<label for="price">Qiymət</label>
							<input id="price" type="number" placeholder="₼"></input>
						</div>
						<div className="discount">
							<label for="discount">Endirim:</label>
							<input id="discount" type="number" placeholder="%"></input>
						</div>
						<div className="amount">
							<label for="amount">Məbləğ:</label>
							<input id="amount" type="number" placeholder="₼"></input>
						</div>
						<button onClick={putQuantity}>Təsdiq et</button>
					</div>
				</div>
			</MyModal>
		</div>
	);
}

export default withLoading(ProductListForSelect, "products");

const ProductList = ({ products, setModal, setIndexProductList, setItem }) => {
	return (
		<div className="select-products-body">
			{products ? (
				products.map((item, index) => {
					
					const { Id, Name, StockBalance, Price, BarCode } = item;

					const handelCheckBox = (e) => {
						item.checkedBox = e.target.checked;
						setItem(item);
						e.target.checked && setModal(true);
					};
					const getProductId = () => {
						setIndexProductList(index);
					};

					return (
						<div key={Id} onClick={getProductId}>
							<label className="product" for={`product${Id}`}>
								<p className="index">
									{index + 1}
								</p>
								<img src={nullProduct_img} alt=""></img>
								<div className="texts">
									<p className="name">{Name}</p>
									<p className="barcode">{BarCode}</p>
									<div className="number">
										<p className="price">{Price}₼</p>
										<p className={ StockBalance >= 0 ? "stock-quantity" : "stock-quantity red"}>{StockBalance ? StockBalance : 0 } əd</p>
									</div>
								</div>
								<input
									id={`product${Id}`}
									type="checkbox"
									onChange={handelCheckBox}
								/>
							</label>
						</div>
					);
				})
			) : (
				<p>Mehsullar yoxdur</p>
			)}
		</div>
	);
};

const style = {
	position: "absolute",
    bottom: "0",
    width: "100%",
	background: "#fff"
}

// const EditQuantityModal = () => {
//     return (
//         <div>
//             <h2>Ededin sayini bildirin</h2>
//             <div>
//                 <button onClick={() => setEded(eded - 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}>-</button>
//                 <input value={eded} min='0' onChange={(e) => setEded(Number(e.target.value))}
//                 style={{textAlign: 'center',fontSize:'30px',height:'60px',width:'100%', border:'none'}}
//                 type='number'/>
//                 <button onClick={() => setEded(eded + 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}>+</button>
//             </div>
//             <div style={{justifyContent: 'space-between'}}>
//                 <button onClick={putQuantity}>Testigle</button>
//             </div>
//         </div>
//     )
// }
