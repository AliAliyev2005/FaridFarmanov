import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import MyForm from "../components/MyForm";
import ProductListForSelect from "../components/ProductListForSelect";
import MyModal from "../components/UI/modal/MyModal";
import { useGlobalContext } from "../config/context";

function Document() {
	const { documentsItem } = useGlobalContext();
	const [debt, setDebt] = useState("");
	const [products, setProducts] = useState("");
	const [modal, setModal] = useState(false);
    const [selectedProducts,setSelectedProducts] = useState([])
    const [ gotProducts, setGotProducts ] = useState([])

    useEffect(() => {
        creatProductList()
    },[selectedProducts, gotProducts])

	useEffect(() => {
		console.log(documentsItem);
	}, []);

	useEffect(async () => {
		let res = await api.fetchDebt(documentsItem.CustomerId);
		setDebt(res);
	}, []);

	useEffect(async () => {
		let res = await api.fetchCostomersProducts(documentsItem.Id);
        console.log(res)
		setProducts(res);
	}, []);

    const creatProductList = () => {
        let productList = selectedProducts.concat(gotProducts)
        setProducts(productList)
    }

    const selectPrd = (arr) => {
        setSelectedProducts(arr)
    }

	return (
		<div>
			<MyForm initialValues={documentsItem} />

			<p>Qalıq borc ({debt})</p>

			{/* <ProductList products={products ? products.List[0].Positions : []} /> */}

            <div>
                <button>scaner</button>
                <button onClick={() => setModal(true)} >mehsul elave et</button>
            </div>

			<div>
				<div>Ümumi məbləğ: {documentsItem.Amount} </div>
				<div>Endirim: {documentsItem.Discount} </div>
				<div>Yekun məbləğ: </div>
				<div>Miqdar: {products.Count}</div>
				<div>Mayası: {} </div>
				<div>Qazanc: {products.AllProfit}</div>
			</div>

            <MyModal visible={modal} setVisible={setModal}>
                <ProductListForSelect selectPrd={selectPrd} />
            </MyModal>

		</div>
	);
}

export default Document;

const ProductList = ({ products }) => {
	return (
		<div>
			{products
				? products.map((item, index) => {
						return <div key={index}>{item.Name}</div>;
				  })
				: "alinmadi"}
		</div>
	);
};
