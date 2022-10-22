/**
 * promise.all chỉ trả về khi tất cả đều thành công, chỉ cần 1 sự kiện
 * thất bại sẽ kết thúc luôn, nếu có 1 sự kiện thất bài còn các sự kiện
 * khác thành công như muốn nhận đầy đủ kết quả thì làm thế nào?
 *
 * Có 3 sự kiện bất đồng bộ không biết thời gian hoàn thành
 * giả sử có 2 sự kiện thành công, 1 sự kiện thất bại
 *
 * làm thế nào để thực thi 3 sự kiện này cùng 1 lúc, kết quả nhận được sẽ trả
 * về array chứa 3 kết qua thành công và thất bại
 */

/**
 * @TRA_LOI
 */

const promise1 = Promise.resolve("Promise 1");
const promise2 = Promise.resolve("Promise 2");
const promise3 = Promise.reject("Promise 3");

const promises = [promise1, promise2, promise3];

function handleAllPromise(promises) {
  /**
   * luôn trả về promose resolve
   * sử dụng map để tạo ra một mảng các promise resolve có kết quả cả resolve và reject từ các promise khác
   */
  const resolvePromises = promises.map((promise) => {
    return new Promise((resolve) => {
      let payload = [];
      promise
        .then((result) => {
          payload[0] = result;
        })
        .catch((error) => {
          payload[1] = error;
        })
        .then(() => {
          resolve(payload);
        });
    });
  });

  let errors = [];
  let results = [];

  /**
   * Thực hiện promises all để trả về tất cả các kết quả đã map ở trên
   */
  return Promise.all(resolvePromises)
    .then(function (items) {
      items.forEach(function (payload) {
        if (payload[1]) {
          errors.push(payload[1]);
        } else {
          results.push(payload[0]);
        }
      });

      return { errors, results };
    })
    .then((items) => {
      return {
        resolve: [...items.results],
        reject: [...items.errors],
      };
    });
}

handleAllPromise(promises).then(function (kq) {
  console.log(kq.reject);
});
