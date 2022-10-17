Tên: Nguyễn Thành Thiện

Câu 1: Phân biệt settimeout và setinterval?
Trả lời: 
-	Giống nhau: 
    +   Hai hàm cho phép thực hiện công việc nào đó tại một thời điểm được chỉ định ở tương lai , chúng được gọi là “Scheduling a call”.
    +	Cả 2 hàm đều là hàm bất đồng bộ.
    +	Hai hàm này không phải là một  phần của javascript. Nhưng các môi trường chạy Javascript đều có bộ lập lịch nội nên cung cấp các hàm này.
-	Khác nhau:
    <!-- +   setTimeout: 
        .   cú pháp: setTimeout( function , timeout)
        .   Công dụng: Thực hiện một công việc (function) một lần sau một khoảng thời gian (timeout)
        .   Dừng hàm: let timerId = setTimeout(...); clearTimeout( timerId ); -->
     | setTimeout | setInterval
    --- | --- | --- |
    Cú pháp | setTimeout( function , timeout) | setTimeout( function , timeout)
    Công dụng | Thực hiện một công việc (function) một lần sau một khoảng thời gian (timeout) | Thực hiện một công việc (function) một lần sau một khoảng thời gian (timeout)
    Dừng hàm | let timerId = setInterval(...); clearInterval( timerId ); | let timerId = setInterval(...); clearInterval( timerId );
