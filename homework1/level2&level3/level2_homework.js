//homework1 level2&level3 assignment
const members = [
  { name: "최해랑", nickname: "해랑쓰", age: 27 },
  { name: "심다은", nickname: "다은쓰", age: 23 },
  { name: "조충범", nickname: "충범쓰", age: 25 },
  { name: "유태혁", nickname: "태혁쓰", age: 20 },
  { name: "김동관", nickname: "동관쓰", age: 26 },
];

members.forEach((member) => {
  console.log(
    `${member.name}의 별명은 ${member.nickname}이고 나이는 ${member.age}입니다💖`
  );
});
