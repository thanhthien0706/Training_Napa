setTimeout(() => {
  console.log("hello event loop");
}, 0);

function bai_1() {
  let current_time = new Date().getTime();
  let current_time_5 = current_time + 5000;
  for (let i = current_time; i < current_time_5; i = new Date().getTime()) {}
}

bai_1();
