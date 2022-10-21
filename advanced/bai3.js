/**
 * Có controller như sau
 *
 * const controller = async (req, res) => {
 *    //func doA là đồng bộ, thời gian thực thi 10s
 *    doA();
 *
 *    //func doB là bất đồng bộ, thời gian thực thi là 1s
 *    //là một lời gọi IO, chẳng hạn như truy vấn database
 *    await doB();
 *    res.status(200).end();
 * }
 *
 * Giả sử có 3 request đồng thời gọi vào controller thì thời gian để nhận
 * được phần hồi từ request đầu tiên là bao lâu, request cuối cùng phản hồi
 * là bao lâu, trung bình thời gian phản hồi của 3 request
 *
 * Làm thế nào để request đầu tiên phản hồi trong khoảng 11s
 */

/**
 * @Result CauTraLoi
 */

/**
 * - Thời gian nhận phản hồi từ request đầu tiên là hơn 11 giây.
 * => thời gian thực thi hàm đồng bộ 10s
 *  + thời gian thực thi hàm bất đồng bộ 1s
 *  + thời gian chuyển đổi từ stask -> node api -> task queue -> stask
 *
 * - vì 3 request xảy ra đồng thời nên thời gian chênh lệch không đang kể.
 * Vì vậy thời thời gian của mỗi request bằng với thời gian request đầu tiên.
 * Do đó thời gian trung bình của 3 request là hơn 11s.
 */

/**
 *  Để cho request đầu thực hiện khoảng 11 giây tao phải giảm thời gian chuyển đổi stask -> queue -> stask
 *  - Thực hiện:
 *      + Gọi ra một promise => sẽ tạo ra một hàng đợi ngay lập tức
 *      + Thực hiện hàm bất đồng bộ trước khi promise trả về resolve -> đưa nó vào hàng đợi
 *      + Thực thi công việc ở trong hàm đợi nếu việc ScriptJob hiện tại kết thúc.
 */

const controller = async (req, res) => {
  functionA();
  Promise.resolve(await doB());
  res.status(200).end();
};
