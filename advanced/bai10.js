async function waitAndMaybeReject() {
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  throw Error("This is error");
}

/**
 * - Không cần async/await vì hàm waitAndMaybeReject() đã thực thi xong prmise mới trả về két quả.
 * - Không cần bắt return "Oh no!" vì sẽ làm mất thông báo lỗi của hàm
 */
async function test1() {
  try {
    return await waitAndMaybeReject();
  } catch (error) {
    return "Oh no!";
  }
}

// - không cần async/await như test1()
// - Không nên throw lại error. vì nó sẽ gây hiểu lầm là ở test2() xảy ra lỗi trong quá trình quá trình debug.
async function test2() {
  try {
    return await waitAndMaybeReject();
  } catch (error) {
    throw error;
  }
}

// không cần async/await như test1()
// cần bắt lỗi để xác định lỗi trong quá trình thực thi và debug
async function test3() {
  return await waitAndMaybeReject();
}

// cần bắt lỗi để xác định lỗi trong quá trình thực thi và debug
function test4() {
  return waitAndMaybeReject();
}

const main = async () => {
  const value = await test2();
  console.log("value", value);
};

main();

//Trong 4 function test trên thì những cách nào đúng, những cách nào sai hoặc dư thừa, giải thích lý do
