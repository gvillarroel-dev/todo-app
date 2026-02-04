const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devServer: {
		static: "./dist",
		hot: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
			title: "Todo List App",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html$/i,
				use: "html-loader",
			},
			{
				test: /\.(png|svg|jpg|jepg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
