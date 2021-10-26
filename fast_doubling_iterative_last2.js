/** @param {number | bigint} n */
const fib = n => {
  // Ensure n is BigInt
  n = BigInt(n);

  // F(-k) = F(k) * side
  // Where side is -1 only if k is even, otherwise 1n
  let side = (/^-/.test(n) ? -1n : 1n) ** BigInt(n % 2n === 0n);
  // /^-/.test(n) ? -1n : 1n is equivalent to Math.sign(n)

  // n = Math.abs(n)
  n = BigInt(n.toString().replace(/^-/, ""));

  // Base cases are 0->0 and 1->1
  // We also need to add 2->1 for this method
  if (n === 0n)             return 0n;
  if (n === 1n || n === 2n) return 1n * side;
  if (n === 3n)             return 2n * side;

  // Store F(i) and F(i+1) in this array (Wish I had tuples)
  // Addendum: I'm not sure saying these are F(i) and F(i+1)
  // is totally correct still
  let known = [1n, 2n];

  let i = 3n;
  while (i < n) {
    if (i * 2n > n) {
      // Regular method
      i += 1n;

      // F(k) = F(k-2) + F(k-1)
      known.push(known.shift() + known[0]);
    } else {
      // Fast doubling method
      i *= 2n;

      let a = known[0], b = known[1];
      known = [];

      // F(2k+1) = F(k) * (2 * F(k+1) - F(k))
      known.push(a * (2n * b - a));

      // F(2k) = F(k)^2 + F(k+1)^2
      known.push(b ** 2n + a ** 2n);

      i -= 1n;
    }
  }

  return known[1] * side;
};

Array.from({ length: 10 })
  .forEach((_, i) => {
    let n = 1 * (10 ** i)
    let start = Date.now();
    fib(n);
    console.log("fib(%d) %dms", n, Date.now() - start);
  });

// Array.from({ length: 40000 })
//   .forEach((_, i) => {
//     let start = Date.now();
//     fib(i);
//     console.log("fib(%d) (%dms)",
//       i, Date.now() - start
//     );
//   });

// Array.from({ length: 41 })
//   .forEach((_, i) => {
//     let start = Date.now()
//     console.log("fib(%d) = %d (%dms)",
//       i, fib(i), Date.now() - start
//     );
//   });
