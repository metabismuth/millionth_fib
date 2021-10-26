/** @param {number | bigint} n */
const fib = n => {
  // Ensure n is BigInt
  n = BigInt(n);

  // Base cases are 0->0 and 1->1
  if (n === 0n) return n;
  if (n === 1n) return n;

  // Recur
  if (n < 0) return fib(n + 2n) - fib(n + 1n);
  if (n > 1) return fib(n - 2n) + fib(n - 1n);
};

console.log(fib(-2));
