/** @param {number | bigint} n */
const fib = n => {
  // Ensure n is BigInt
  n = BigInt(n);

  // Base cases are 0->0 and 1->1
  // We also need to add 2->1 for this method
  if (n === 0n) return 0n;
  if (n === 1n || n === 2n) return 1n;

  // Fast doubling method
  // https://www.nayuki.io/page/fast-fibonacci-algorithms
  // k > 0:
  //   F(2k) = F(k) * (2 * F(k + 1) - F(k))
  //   F(2k + 1) = F(k + 1) ** 2 + F(k) ** 2
  // k < 0:
  //   ??? -- doesn't matter, just cheat

  // F(-k) = F(k) * side
  // Where side is -1 only if k is even
  let side = (/^-/.test(n) ? -1n : 1n) ** BigInt(n % 2n === 0n);
  // /^-/.test(n) ? -1n : 1n is equivalent to Math.sign(n)

  // This is equivalent to n = Math.abs(n)
  n = BigInt(n.toString().replace(/^-/, ""));

  let r;
  if (n % 2n === 0n) {
    r = fib(n / 2n) * (2n * fib((n / 2n) + 1n) - fib(n / 2n));
  } else {
    r = fib((n / 2n) + 1n) ** 2n + fib(n / 2n) ** 2n;
  }
  return r * side;
};


Array.from({ length: 41 })
  .forEach((_, i) => {
    let start = Date.now()
    console.log("fib(%d) = %d (%dms)",
      -i + 5, fib(-i + 5), Date.now() - start
    );
  });


// let start = Date.now();
// console.log("fib(1557261) = %d (%dms)", fib(1557261), Date.now() - start);


// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/train/javascript
