//Ngoài việc khác nhau về mặt cú pháp thì for thường và forEach còn có sự
//khác nhau gì? code minh họa

/**
 * 1. Về hiệu suất:
 * - for thường nhanh hơn forEach
 */
const testArr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
];

let start = performance.now();
for (let i = 0; i < testArr.length; i++) {}
let end = performance.now();

let start_1 = performance.now();
testArr.forEach(() => {});
let end_1 = performance.now();

if (end - start > end_1 - start_1) {
  console.log("forEach nhanh hơn");
} else {
  console.log("for thường nhanh hơn");
}

/**
 * 2. Không thể sử dụng break trong forEach vì trong forEach là hàm callback
 */

testArr.forEach(() => {
  console.log("hello thành thiện");
  break;
});

/**
 * 3. Không sử dụng từ khóa async/await trong forEach do đó chức năng callback. có thể dẫn đến đầu ra không chính xác.
 */

/**
 * khi ta sử dụng await someAPICall() như trong ví dụ thì kết quả count  = 0
 * tuy nhiên nếu bỏ await someAPICall() thì count  = 4
 *
 * Lí do:
 * - vì foreach chạy một các tuần tự nên kết quả của count khi không có async/await sẽ được thay đổi sau mỗi lần lập của forEach.
 * - Tuy nhiên khi sử dụng async/await thì hàm callback sẽ trở thành hàm bất đồng bộ. Theo nguyên tắc,
 * x2 sẽ được in ra trước và count lúc đó bằng 0.
 * sau đó các kết quả hàm bất đồng bộ của x1 sẽ được in ra sau. tuy nhiên chỉ xem được kết quả của count khi gọi console ở trong hàm callback đó.
 */
let count = 0;
hello = (items) => {
  items.forEach(async () => {
    await someAPICall();
    console.log("xem count ", count);
    count++;
  }); // x1
   console.log("count = " + count); // x2
};
someAPICall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 100);
  });
};
hello(["1", "2", "3", "4"]);
