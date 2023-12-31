//path モジュールの読み込み
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

//MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
	mode: 'development',
  //エントリポイント（デフォルトと同じなので省略可）
  entry: './src/index.js',  
  //出力先（デフォルトと同じなので省略可）
  output: { 
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
	devServer : {
		static: {
      directory: path.join(__dirname, "dist"),
    },
	},
  module: {
    rules: [
      //SASS 及び CSS 用のローダー
      {
        //拡張子 .scss、.sass、css を対象
        test: /\.(scss|sass|css)$/i, 
        // 使用するローダーの指定（後ろから順番に適用される）
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ], 
      },
    ],
  },
  //プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
      filename: 'style.css',
    }),
		new HtmlWebpackPlugin({  
      template: 'src/html/page/index.html',
      filename: 'index.html',
    })
  ],
  //source-map タイプのソースマップを出力
  devtool: 'source-map',
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/  //正規表現で指定
  },
};

