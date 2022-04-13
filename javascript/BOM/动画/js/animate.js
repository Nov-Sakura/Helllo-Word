function animate(obj, target, callback) {
  //   检查有没有函数传递 有则运行 没有则null
  callback ? callback() : null;
  //   不断点击按钮 元素的速度会越来越快 因为开启了太多定时器
  // 让元素只有一个定时器
  clearInterval(obj.timer);
  obj.timer = setInterval(() => {
    let step = (target - obj.offsetLeft) / 10;
    //   判断是前进还是后退 前进取大 后退取小
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      //   停止动画 本质就是停止定时器
      clearInterval(obj.timer);
    }
    //   修改步长值 公式(目标值-现在的位置)/10
    obj.style.left = obj.offsetLeft + step + "px";
  }, 10);
}
