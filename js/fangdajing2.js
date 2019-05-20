window.onload=function(){
    	//放大镜插件使用：先渲染再调用插件
			var magnifierConfig = {
				magnifier: "#magnifier1", //最外层的大容器
				width: 400, //承载容器宽
				height: 400, //承载容器高
				moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
				zoom: 5 //缩放比例
			};

			var _magnifier = magnifier(magnifierConfig);
}