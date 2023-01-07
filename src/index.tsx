import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.generated.css";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Helmet>
			<script
				src="https://kit.fontawesome.com/ba7153ba3d.js"
				crossOrigin="anonymous"
			></script>
		</Helmet>
		<App />
	</React.StrictMode>
);
