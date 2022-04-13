//封装动画
function animate(a, b, fn) {
  //a代表哪一个标签需要变化,b代表需要移动多少距离,fn代表一个函数,里面可以用于修改style样式
  //如果用click来开启动画的话 会有一个问题,如果点击多次的话,速度会越来越快,因为会开启多个定时器
  //解决方案是,先清除定时器后再执行定时器
  clearInterval(a.timer);

  a.timer = setInterval(function () {
    //a.timer表示的是a这个标签的timer属性名,这样写不会浪费资源,如果用的var time的话,每次调用这个函数就会开辟一次空间,比较浪费资源

    var step = (b - window.pageYOffset) / 10;
    //缓动动画公式 (目标值-目前的位置)/10 因为除不尽所以有小数,但像素距离最低是1,所以需要取整
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    //因为往左走是正值,往大取是合适的;但可能还会往右走是负值,这时就需要取小
    //如果step>0,那么我就执行往大Math.ceil的取,否则就往小Math.floor的取
    if (window.pageYOffset == b) {
      clearInterval(a.timer); //当盒子的距离等于到达的距离时 就清除  调用者.timer
      if (fn) {
        //如果这个有fn这个函数,那么就调用fn,否则不调用
        //因为是写在结束停止的内部,所以是当结束时才更换颜色
        fn();
      }
    }
    //window.pageYOffset != b 就执行这个
    window.scroll(0, window.pageYOffset + step);
  }, 10);
}
