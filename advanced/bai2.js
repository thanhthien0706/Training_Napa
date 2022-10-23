/**
 * Có 20 sự kiện bất đồng bộ không biết trước thời gian hoàn thành, tại mỗi
 * thời điểm chỉ được thực hiện không quá 5 sự kiện bất đồng bộ
 *
 * Hãy implement sao cho thời gian thực thi thành công 20 sự kiện bất đồng bộ trên là nhanh nhất
 * (tận dụng tối đa thời gian chờ của CPU, không nên chọn giải pháp chia thành 4 cụm và chạy tuần tự
 * từng cụm)
 */

//1
const event1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 1"), 1000);
});

const event2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 2"), 5000);
});

const event3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 3"), 100);
});

const event4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 4"), 1200);
});

const event5 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 5"), 2000);
});

const event6 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 6"), 5000);
});

const event7 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 7"), 3000);
});

const event8 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 8"), 10);
});

const event9 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 9"), 10000);
});

const event10 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 10"), 12000);
});

const event11 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 11"), 23000);
});

const event12 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 12"), 0);
});

const event13 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 13"), 40);
});

const event14 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 14"), 700);
});

const event15 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 15"), 9000);
});

const event16 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 16"), 11000);
});

const event17 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 17"), 0);
});

const event18 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 18"), 2000);
});

const event19 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 19"), 120);
});

const event20 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("even 20"), 800);
});

async function handleReadingFile() {
  try {
    const start = performance.now();
    const h1 = await Promise.allSettled([
      event1,
      event2,
      event3,
      event4,
      event5,
    ]);
    const h2 = await Promise.allSettled([
      event6,
      event7,
      event8,
      event9,
      event10,
    ]);
    const h3 = await Promise.allSettled([
      event11,
      event12,
      event13,
      event14,
      event15,
    ]);
    const h4 = await Promise.allSettled([
      event16,
      event17,
      event18,
      event19,
      event20,
    ]);
    const end = performance.now();

    console.log("Thoi gian thuc thi: ", end - start);
  } catch (error) {
    console.log(error);
  }
}

handleReadingFile();
