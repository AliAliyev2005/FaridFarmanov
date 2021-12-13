import React from "react";
import Document from "../pages/Document";

import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

function TabContends() {
	return (
		<Tabs className="doc-tabs" onChange={callback} type="card">
			<TabPane tab="ƏSAS" key="1">
				<Document />
			</TabPane>
			<TabPane tab="ÖDƏNİŞ" key="2">
				Content of Tab Pane 2
			</TabPane>
			<TabPane tab="ƏLAQƏLİ SƏNƏDLƏR" key="3">
				Content of Tab Pane 3
			</TabPane>
		</Tabs>
	);
}

export default TabContends;
