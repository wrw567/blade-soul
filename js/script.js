window.onload = function () {
	// 封装选项卡函数
	var cards = function (name) {
		var oCard = document.getElementsByClassName(name)[0];
		var aTabs = oCard.getElementsByTagName('span');
		var aLists = oCard.getElementsByClassName('list');
		for (var i = 0; i < aTabs.length; i++) {
			aTabs[i].index = i;
			aTabs[i].onmouseover = function () {
				for (var i = 0; i < aTabs.length; i++) {
					aTabs[i].className = '';
					aLists[i].style.display = 'none';	
				}
				this.className = 'selected';
				aLists[this.index].style.display = 'block';
			}
		}
	}
	// 调用第一个选项卡
	cards("left_cards");
	// 调用第二个选项卡
	cards("right_news");
	// 调用第三个选项卡
	cards("right_pvp");
}