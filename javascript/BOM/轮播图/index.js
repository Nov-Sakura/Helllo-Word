var box = document.querySelector(".box");
var l = box.querySelector(".l");
var r = box.querySelector(".r");
var ul = box.querySelector("ul");
var ol = box.querySelector("ol");
//经过box隐藏两侧按钮
box.addEventListener("mouseenter", function () {
  l.style.display = "block";
  r.style.display = "block";
  ol.style.display = "block";
  clearInterval(timer);
  timer = null; //清空变量
});
//离开box隐藏两侧按钮
box.addEventListener("mouseleave", function () {
  l.style.display = "none";
  r.style.display = "none";
  ol.style.display = "none";
  timer = setInterval(function () {
    //手动调用事件
    r.click();
  }, 2000);
});

for (let i = 0; i < ul.children.length; i++) {
  //1. 动态创建 li元素
  var li = document.createElement("li");
  //给li添加一个index自定义属性,赋值i代表当前的索引号
  li.setAttribute("index", i);
  //2. 放置元素
  ol.appendChild(li);

  //排他思想 点击li之后就变颜色
  li.addEventListener("click", function () {
    for (var i = 0; i < ol.children.length; i++) {
      //把所有的li的class全部清除
      ol.children[i].removeAttribute("class");
    }
    //给鼠标点击的这个li设置样式
    this.className = "white";

    //获取当前li的index值
    var index = this.getAttribute("index");
    //当我们点击了某个li后,把索引值给num(用于同步圆圈和图片)
    num = index;
    //当我们点击了某个li后,把索引值给circle(用于同步圆圈和图片)
    circle = index;
    //动画
    animate(ul, index * -800);
  });
  //把默认的第一个li设置成白色背景
  ol.children[0].className = "white";
}

//无缝滚动 在最后一张图片的后面再加一张和第一张相同的图片,
//克隆第一张图片放在ul最后面, cloneNode(true)深克隆,会把里面的内容全部克隆
var first = ul.children[0].cloneNode(true);
//放置元素
ul.appendChild(first);

//num是点击下一张图片之后的变量;
var num = 0;
//circle是点击下一张后,让小圆圈跟着图片一起来变化的变量的索引号
var circle = 0;
//flag代表节流阀
var flag = true;
//右侧按钮
r.addEventListener("click", function () {
  if (flag) {
    //如果falg=true则执行
    flag = false; //执行后先把flag设置为false
    //判断 如果到了最后一张,就把left值改为0;(代表跳到第一张,并且把num值重置为0)
    if (num == ul.children.length - 1) {
      ul.style.left = 0;
      num = 0;
    }
    //点击一次后让num+1
    num++;
    //动画移动
    animate(ul, num * -800, function () {
      flag = true; //动画结束后再把flag设置为true
    });

    //点击一次后让circle+1
    circle++;
    //判断 如果circle等于了圆圈的个数,那就让圆圈回到第一个索引号的位置
    if (circle == ol.children.length) {
      circle = 0;
    }
    //执行函数
    circleChange();
  }
});

//左侧按钮
l.addEventListener("click", function () {
  if (flag) {
    flag = false;
    //如果图片的索引号为0了,再按一次就让索引号等于最后第二张;同时把图片位置跳到最后第二张的位置
    if (num == 0) {
      num = ul.children.length - 1;
      ul.style.left = num * -800 + "px";
    }
    //点击一次后-1
    num--;
    //动画移动
    animate(ul, num * -800, function () {
      flag = true;
    });

    //点击一次下一张后让circle+1
    circle--;
    //判断 如果circle小于了0,(在索引号为0的图片时点了一次左滑)
    if (circle < 0) {
      //就把小圆点的索引号等于 最后第二张的位置
      circle = ol.children.length - 1;
    }
    //执行函数
    circleChange();
  }
});

//因为有重复代码,单独封装一个函数可以节约资源
function circleChange() {
  for (var i = 0; i < ol.children.length; i++) {
    //把所有的li样式全部清空
    ol.children[i].className = "";
  }
  //设置当前小圆圈的索引号为白色
  ol.children[circle].className = "white";
}

var timer = setInterval(function () {
  //手动调用事件
  r.click();
}, 2000);
