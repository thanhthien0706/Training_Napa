Tên: Nguyễn Thành Thiện

<b>Câu 1: Phân biệt settimeout và setinterval?</b>
Trả lời:

- Giống nhau:
  - Hai hàm cho phép thực hiện công việc nào đó tại một thời điểm được chỉ định ở tương lai , chúng được gọi là “Scheduling a call”.
  - Cả 2 hàm đều là hàm bất đồng bộ.
  - Hai hàm này không phải là một phần của javascript. Nhưng các môi trường chạy Javascript đều có bộ lập lịch nội nên cung cấp các hàm này.
- Khác nhau:

|     | setTimeout | setInterval |
| :-- | :--------- | :---------- |
| Cú pháp | setTimeout( function , timeout) | setTimeout( function , timeout) |
| Công dụng | Công dụng Thực hiện một công việc (function) một lần sau một khoảng thời gian (timeout). Thực hiện một công việc (function) lặp đi lặp lại, sau một khoảng thời gian (interval) và lặp lại liên tục công việc đó trong khoảng thời gian đó. | Công dụng Thực hiện một công việc (function) một lần sau một khoảng thời gian (timeout). Thực hiện một công việc (function) lặp đi lặp lại, sau một khoảng thời gian (interval) và lặp lại liên tục công việc đó trong khoảng thời gian đó. |
| Dừng hàm | let timerId = setTimeout(...);<br />clearTimeout( timerId ); | let timerId = setInterval(...);<br />clearInterval( timerId ); |

<b>Câu 2: Phân biệt callback, promise, async await</b>
Trả lời:
-   Giống nhau: 
    +   Đều có chức năng là xử lý các bất động bộ.
-	Khác nhau:
    +	Callback: 
        .	Là một hàm được truyền dưới dạng tham số vào hàm khác, và được gọi trong hàm đó.
        .	Cách dùng:
![image info](../image/callback.png) { width: 100px; height: 100px ; text-align: center;}