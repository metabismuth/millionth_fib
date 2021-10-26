/** @param {number | bigint} n */
const fib = n => {
  // Ensure n is BigInt
  n = BigInt(n);

  // Base cases are 0->0 and 1->1
  // We also need to add 2->1 for this method
  if (n === 0n) return 0n;
  if (n === 1n || n === 2n) return 1n;
  if (n === 3n) return 2n;

  // Store previously seen results in a Map, starting with the base cases
  /** @type {Map<bigint, bigint>} */
  let known = new Map();
  [0n, 1n, 2n, 3n].forEach(n => known.set(n, fib(n)));

  // F(-k) = F(k) * side
  // Where side is -1 only if k is even, otherwise 1n
  let side = (/^-/.test(n) ? -1n : 1n) ** BigInt(n % 2n === 0n);
  // /^-/.test(n) ? -1n : 1n is equivalent to Math.sign(n)

  // n = Math.abs(n)
  n = BigInt(n.toString().replace(/^-/, ""));

  let i = 3n;
  do {
    if (i * 2n > n) {
      // Regular method
      i += 1n;

      // F(k) = F(k-2) + F(k-1)
      known.set(i,
        known.get(i - 2n) + known.get(i - 1n));
    } else {
      // Fast doubling method
      i -= 1n;
      let k = i;
      i *= 2n;

      // F(2k+1) = F(k) * (2 * F(k+1) - F(k))
      known.set(i,
        known.get(k) * (2n * known.get(k + 1n) - known.get(k)));

      // F(2k) = F(k)^2 + F(k+1)^2
      known.set(i + 1n,
        known.get(k + 1n) ** 2n + known.get(k) ** 2n);
      i += 1n;
    }
  } while (i < n)

  return known.get(n) * side;
};

// let n = 100_000n;
// let start = Date.now();
// console.log("fib(%d) = %d (%dms)", n, fib(n), Date.now() - start);


Array.from({ length: 41 })
  .forEach((_, i) => {
    let start = Date.now()
    console.log("fib(%d) = %d (%dms)",
      -i + 10, fib(-i + 10), Date.now() - start
    );
  });
