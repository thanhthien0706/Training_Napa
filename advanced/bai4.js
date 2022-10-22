const waitBlocking = (milisecond) => {
  const startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milisecond);
};

const waitNonBlocking = (milisecond) => {
  return new Promise((resolve) => setTimeout(() => resolve()), milisecond);
};

const controller1 = async (req, res) => {
  await waitNonBlocking(10000);
  res.status(200).end();
};

const controller2 = (req, res) => {
  waitBlocking(10000);
  res.status(200).end();
};

//Giả sử có 3 request đồng thời gọi vào controller1 và controller2 thì thời
//gian để nhận được respone tại controller1 và controller2 của request đầu
//tiên là bao lâu
//Đề xuất cải thiện performance cho controller2

/**
 * @TRA_LOI
 */

/**
 * - Thời gian trả về trả về của controller1 là > 10s, controller2 là > 10s (hành động tuần tự ).
 * - Cả 3 request nhận được request của controller1 đồng thời là hơn 10s.
 * - Cả 3 request nhận được request của controller2 là hơn 30s. Do controller2 thực hiện việc tuần tử nên mỗi request phải chờ hơn 10s.
 * - Để cải thiện performance của controller2 đơn giản tao chỉ cần biến nó thành noneBlocking như controller1. Chuyển while chờ tuần tự thành setTimeout.
 */
