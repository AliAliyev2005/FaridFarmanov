import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import "antd/dist/antd.css";
import RouteComponent from "./components/RouteComponent";
import MyModal from "./components/UI/modal/MyModal";
import "./styles/Content.css";
import { useGlobalContext } from "./config/context";
import LoginPage from "./pages/LoginPage";

function App() {
	const { isLogin, isFooter } = useGlobalContext();
	const [modal, setModal] = useState(false);

	if (isLogin === false) {
		return <LoginPage />;
	}
	return (
		<div className="App">

			<Header openSidebar={setModal} />

			<div className="content">
				<RouteComponent />
			</div>

            { isFooter && <Footer />}

			<MyModal visible={modal} setVisible={setModal}>
				<SideBar />
			</MyModal>
		</div>
	);
}

export default App;
