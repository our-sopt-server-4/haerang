var sopt = {
  name: "OUR SOPT",
  slogan: "WE LEAD OUR SOPT",
  part: ["plan", "design", "android", "iOS", "server"],
  number: 180,
  printName: function() {
    console.log("name : ", this.name);
  },
  printNum: function() {
    console.log("number : ", this.number);
  },
};

console.log("typeof sopt : " + typeof sopt);
// console.log("sopt : " + sopt); //붙임연산(문자열로 변환됨)
console.log("sopt : ", sopt);
console.log("sopt :" + JSON.stringify(sopt)); //문자열로 변환시켜줌

sopt.printName();
sopt.number = 190;
sopt.printNum();

var dogs = [
  { name: "식빵", family: "웰시코기", age: 1, weight: 2.14 },
  { name: "콩콩", family: "포메라니안", age: 3, weight: 2.5 },
  { name: "두팔", family: "푸들", age: 7, weight: 3.1 },
];
console.log("dogs : " + dogs);
console.log("dogs : ", dogs);
console.log("dogs :" + JSON.stringify(dogs));

dogs.forEach((dog) =>
  console.log(
    dog.name + "은 종이 " + dog.family + "이고, 나이는 " + dog.age + "세입니다."
  )
);
