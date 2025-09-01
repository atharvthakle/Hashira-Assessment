# Problem Overview

This assessment was a part of the Hashira on-campus placement drive, the task was to reconstruct a secret polynomial from given data points encoded in different bases.

Input is provided as a JSON file containing:

n: total number of data points.

k: minimum number of points required (k = degree of polynomial + 1).

Each point contains:

Key = x-coordinate.

"base" = numerical base of the value.

"value" = y-coordinate in that base.

The goal:

Parse and convert all points to decimal.

Use polynomial interpolation (Lagrange’s method) to recover the polynomial.

Identify the constant term (secret).

Detect and list any wrong data points that don’t fit the polynomial.

## Structure

    ├── solution.js      # JavaScript solution code
    ├── testcase1.json   # Provided Test Case 1
    └── testcase2.json   # Provided Test Case 2

## Output

=== TEST CASE 2 ===
n: 10, k: 7
Points:
(1, 995085094601491)
(2, 320923294898495900)
(3, 196563650089608580)
(4, 1016509518118225900)
(5, 3711974121218450000)
(6, 10788619898233491000)
(7, 26709394976508342000)
(8, 58725075613853310000)
(9, 117852986202006520000)
(10, 220003896831595300000)
Secret (constant term): -2290267902684200
Wrong points: 8 9 10

=== ANSWERS FOR FORM ===
Output for TestCase-1: 1
Output for TestCase-2: -2290267902684200
Wrong Data Set Points for Test Case-1: 6
Wrong Data Set Points for Test Case-2: 8 9 10

C:\Users\Atharv\Desktop\Hashira Assessment>node solution.js
Starting program...
Attempting to read testcase1.json...
testcase1.json read successfully
Parsing testcase1.json...
testcase1.json parsed successfully
=== TEST CASE 1 ===
n: 4, k: 3
Points:
(1, 4)
(2, 7)
(3, 12)
(6, 39)
Secret (constant term): 1
Wrong points: 6

Attempting to read testcase2.json...
testcase2.json read successfully
Parsing testcase2.json...
testcase2.json parsed successfully
=== TEST CASE 2 ===
n: 10, k: 7
Points:
(1, 995085094601491)
(2, 320923294898495900)
(3, 196563650089608580)
(4, 1016509518118225900)
(5, 3711974121218450000)
(6, 10788619898233491000)
(7, 26709394976508342000)
(8, 58725075613853310000)
(9, 117852986202006520000)
(10, 220003896831595300000)
Secret (constant term): -2290267902684200
Wrong points: 8 9 10

=== ANSWERS FOR FORM ===
Output for TestCase-1: 1
Output for TestCase-2: -2290267902684200
Wrong Data Set Points for Test Case-1: 6
Wrong Data Set Points for Test Case-2: 8 9 10

## Tech Stack

- Language: JavaScript (Node.js)
- Algorithm: Lagrange Polynomial Interpolation
- Input Format: JSON
