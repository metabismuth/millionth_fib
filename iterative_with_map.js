/** @param {number | bigint} n */
const fib = n => {
  // Ensure n is BigInt
  n = BigInt(n);

  // Base cases are 0->0 and 1->1
  if (n === 0n) return n;
  if (n === 1n) return n;

  // Store previously seen results in a Map, starting with the base cases
  /** @type {Map<bigint, bigint>} */
  let known = new Map();
  known.set(0n, 0n);
  known.set(1n, 1n);

  // This is a maybe stupid hack to have one implementation for both sides
  // of zero. Any value that should be either positive or negative for an
  // operation based on what side we should be in, I will multiply by side.
  let side = /^-/.test(n) ? -1n : 1n;

  // Iterate from 0 to n, whatever direction that is.
  for (let i = 0n; i !== n + 1n * side; i += 1n * side) {
    // Move on if we know fib(n) already
    if (known.has(i)) continue;

    // Otherwise calculate it from fib(n) = fib(n - 2) + fib(n - 1)
    // However for the made up negative Fibonacci numbers it's
    // fib(n) = fib(n + 2n) - fib(n + 1n)
    known.set(i,
      known.get(i - 2n * side) + known.get(i - 1n * side) * side);
  }

  // We iterated to n so we have the result of fib(n):
  return known.get(n);
}

let n = 100_000n;
let start = Date.now();
console.log("fib(%d) = %d (%dms)", n, fib(n), Date.now() - start);


// Array.from({ length: 41 })
//   .forEach((_, i) => {
//     let start = Date.now()
//     console.log("fib(%d) = %d (%dms)",
//       -i + 5, fib(-i + 5), Date.now() - start
//     );
//   });

// let start = Date.now();
// console.log("fib(1557261) = %d, (%dms)", fib(1557261), Date.now() - start);

// let i = 1000261n;
// while (true) {
//   i += 1n;
//   let start = Date.now();
//   fib(i);
//   console.log("fib(%d) (%dms)",
//     i, Date.now() - start);
// }

// let n = 1_000_000n;
// // n = 100_000;

// let start = Date.now();
// console.log("fib(%d) = %d", n, fib(n));
// console.log("(%dms)", Date.now() - start);
