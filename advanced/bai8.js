const a = () => {
  console.log("a");
};
const b = () => {
  console.log("b");
};

const main = () => {
  setImmediate(b);
  process.nextTick(a);
};

main();
//a
//b
//vì sao a lại gọi trước b

/**
 * @TRA_LOI
 */

/**
 * - các giai đoạn của event loop : timers –> i/o callbacks –> idle/prepare –> Poll –> check –> close callbacks -> timers
 * - setImmediate sẽ được thực thi ở giai đoạn check trong event loop
 * - process.nextTick được giữ ở nextTickQueue nó không nằm trong event loop. 
 * và nextTickQueue sẽ được xứ lý sau khi tiến trình hiện tại hoàn thành ở bất kỳ giai đoạn nào của event loop.
 * 
 * =>  Do đó a sẽ in ra trước b
 */
