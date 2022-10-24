/**
 * Có 20 sự kiện bất đồng bộ không biết trước thời gian hoàn thành, tại mỗi
 * thời điểm chỉ được thực hiện không quá 5 sự kiện bất đồng bộ
 *
 * Hãy implement sao cho thời gian thực thi thành công 20 sự kiện bất đồng bộ trên là nhanh nhất
 * (tận dụng tối đa thời gian chờ của CPU, không nên chọn giải pháp chia thành 4 cụm và chạy tuần tự
 * từng cụm)
 */

//1
const numberOfOperations = 20;
const listOfArguments = [];
const listOfDelays = [];

for (let i = 0; i < numberOfOperations; i++) {
  listOfArguments.push(i);
  listOfDelays.push(Math.ceil(Math.random() * 9) * 1000);
}

const asyncOperation = (index) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(index);
    }, listOfDelays[index])
  );
};

async function handleAllPromise() {
  const concurrencyLimit = 5;
  const argsCopy = [].concat(listOfArguments.map((val, ind) => ({ val, ind })));
  const result = new Array(listOfArguments.length);
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());

  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        const operationPromise = asyncOperation(arg.val).then((r) => {
          result[arg.ind] = r;
        });
        return chainNext(operationPromise);
      });
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
  return result;
}
