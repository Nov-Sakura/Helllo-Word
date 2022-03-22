var person = [
  {
    name: "张三",
    sex: 1,
  },
  {
    name: "李四",
    sex: 0,
  },
  {
    name: "王五",
    sex: 0,
  },
];

person.forEach(item => {
  if (item.sex == 1) item.sex = "男";
  else if (item.sex == 0) item.sex = "女";
});
person.forEach(i => {
  console.log(i);
});
