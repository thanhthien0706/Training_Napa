const controller = (req, res) => {
  const array = Array.from(Array(1000000).keys());
  array.forEach((item) => {
    console.log(item);
  });
  res.status(200).end();
};

/**
 * Giả sử
 *  - array có 1 triệu phần tử, cần lặp qua các phần tử này để làm các task vụ
 *    nào đó
 *  - Có 3 request dồng thời gọi vào controller
 * yêu cầu:
 *  - viết 1 func để lặp qua array thay thế cho forEach để các request nó thực hiện
 * đồng thời, không đợi lẫn nhau, thời gian phản hồi của 3 request gần bằng nhau
 */

/**
 * @TRA_LOI
 */

function funcFor(array) {
  const arrNew = array.map((item) => {
    return new Promise((resolve) => {
      resolve(item);
    });
  });

  return Promise.all(arrNew);
}

const controller_1 = (req, res) => {
  const array = Array.from(Array(1000000).keys());
  funcFor(array)
    .then(([a1, ...an]) => {
      console.log(a1);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
    });
};
