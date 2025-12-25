## 2025-01-29 - String Splitting in Hot Paths
**Learning:** Splitting strings into arrays (`str.split("")`) inside frequently called methods (like `isOneOf` which is called for almost every character in a word) generates significant memory allocation and iteration overhead.
**Action:** Use `str.indexOf(char) !== -1` or `str.includes(char)` for checking character existence in a string. This avoids array allocation and is much faster.
