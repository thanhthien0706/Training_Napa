//Liệt kê các phương pháp clone object, phân biện shallow clone và deepclone
//có phải trường hợp nào cũng nên dùng deep clone không và vì sao

/**
 * @TRA_LOI
 */

// - Sử dụng Spread
// - Sử dụng Object.assign
// - Sử dụng JSON: sử dụng 2 phương trước parse() và stringify(). Tuy nhiên không thể clone nếu object có function
// - Sử dụng thư viện - Lodas
// - Sử dụng thử nghiệm structuredClone

/**
 * - Clone là quá trình tạo ra một biến mới có cùng giá trị với biến được clone.
 * - Và có 2 loại clone : shallow clone và deep clone
 * 
 * - Khi tạo biến có kiểu dữ liệu tham chiếu thì giá trị sẽ nằm ở một ô nhớ.
 *  và biến của tạo ra con trỏ đến giá trị đó.
 * 
 * - shallow clone là việc biến b clone biến a thì đó chỉ việc biến b cùng trỏ vào cùng một giá trị của biến a.
 *  do đó biến a thay đổi giá trị thì biến b cũng thay đổi.
 * 
 * - Deep clone là tạo ra một bản sao có tất các thuộc tính không chia sẽ cùng tham chiếu với các thuộc tính của biến a.
 * 
 * - Không phải lúc nào cũng nên dùng deep clone. Chỉ nên sử dụng với mục đích biến clone phải tách biệt hoàn toàn với biến nguồn sau khi clone.
 *  Sử dụng deep clone đôi khi cùng gây ra mất giá trị.
 */