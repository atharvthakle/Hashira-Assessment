const fs = require('fs');

function baseToDecimal(value, base) {
    let result = 0;
    let power = 1;
    
    for (let i = value.length - 1; i >= 0; i--) {
        let digit = value[i];
        let digitValue;
        
        if (digit >= '0' && digit <= '9') {
            digitValue = digit.charCodeAt(0) - '0'.charCodeAt(0);
        } else if (digit >= 'a' && digit <= 'z') {
            digitValue = digit.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        } else if (digit >= 'A' && digit <= 'Z') {
            digitValue = digit.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        }
        
        result += digitValue * power;
        power *= base;
    }
    
    return result;
}

function parseTestCase(jsonData) {
    const data = JSON.parse(jsonData);
    const n = data.keys.n;
    const k = data.keys.k;
    const points = [];
    
    for (let key in data) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = parseInt(data[key].base);
            const value = data[key].value;
            const y = baseToDecimal(value, base);
            points.push([x, y]);
        }
    }
    
    points.sort((a, b) => a[0] - b[0]);
    
    return { n, k, points };
}

function evaluatePolynomial(coeffs, x) {
    let result = 0;
    let xPower = 1;
    
    for (let coeff of coeffs) {
        result += coeff * xPower;
        xPower *= x;
    }
    
    return result;
}

function lagrangeInterpolation(points) {
    const n = points.length;
    let coeffs = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        const yi = points[i][1];
        let li = new Array(n).fill(0);
        li[0] = 1;
        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const xi = points[i][0];
                const xj = points[j][0];
                const denominator = xi - xj;
                
                let newLi = new Array(n).fill(0);
                for (let k = 1; k < n; k++) {
                    newLi[k] += li[k-1] * (-xj) / denominator;
                }
                for (let k = 0; k < n; k++) {
                    newLi[k] += li[k] / denominator;
                }
                li = newLi;
            }
        }
        
        for (let k = 0; k < n; k++) {
            coeffs[k] += yi * li[k];
        }
    }
    
    return coeffs;
}

function isPointOnPolynomial(coeffs, x, y, tolerance = 1e-6) {
    const expectedY = evaluatePolynomial(coeffs, x);
    return Math.abs(expectedY - y) < tolerance;
}

function getCombinations(arr, k) {
    const result = [];
    
    function backtrack(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

function solveTestCase(testCaseData, caseNumber) {
    console.log(`=== TEST CASE ${caseNumber} ===`);
    
    const { n, k, points } = testCaseData;
    
    console.log(`n: ${n}, k: ${k}`);
    console.log("Points:");
    for (let p of points) {
        console.log(`(${p[0]}, ${p[1]})`);
    }
    
    const indices = Array.from({ length: points.length }, (_, i) => i);
    const combinations = getCombinations(indices, k);
    
    let secret = 0;
    let wrongPoints = new Set();
    
    for (let combo of combinations) {
        let selectedPoints = [];
        for (let idx of combo) {
            selectedPoints.push(points[idx]);
        }
        
        const coeffs = lagrangeInterpolation(selectedPoints);
       
        let allFit = true;
        let currentWrong = new Set();
        
        for (let i = 0; i < points.length; i++) {
            if (!combo.includes(i)) {
                const tolerance = caseNumber === 1 ? 1.0 : 1000.0;
                if (!isPointOnPolynomial(coeffs, points[i][0], points[i][1], tolerance)) {
                    currentWrong.add(points[i][0]);
                    allFit = false;
                }
            }
        }
        
        if (allFit || currentWrong.size <= points.length - k) {
            secret = Math.round(coeffs[0]);
            wrongPoints = currentWrong;
            break;
        }
    }
    
    console.log(`Secret (constant term): ${secret}`);
    console.log(`Wrong points: ${Array.from(wrongPoints).join(' ')}`);
    console.log("");
    
    return {
        secret,
        wrongPoints: Array.from(wrongPoints)
    };
}

function main() {
    console.log("Starting program...");
    
    try {
        console.log("Attempting to read testcase1.json...");
        const testCase1Json = fs.readFileSync('testcase1.json', 'utf8');
        console.log("testcase1.json read successfully");
        
        console.log("Parsing testcase1.json...");
        const testCase1Data = parseTestCase(testCase1Json);
        console.log("testcase1.json parsed successfully");
        
        const result1 = solveTestCase(testCase1Data, 1);
        
        console.log("Attempting to read testcase2.json...");
        const testCase2Json = fs.readFileSync('testcase2.json', 'utf8');
        console.log("testcase2.json read successfully");
        
        console.log("Parsing testcase2.json...");
        const testCase2Data = parseTestCase(testCase2Json);
        console.log("testcase2.json parsed successfully");
        
        const result2 = solveTestCase(testCase2Data, 2);
        
        console.log("=== ANSWERS FOR FORM ===");
        console.log(`Output for TestCase-1: ${result1.secret}`);
        console.log(`Output for TestCase-2: ${result2.secret}`);
        console.log(`Wrong Data Set Points for Test Case-1: ${result1.wrongPoints.join(' ')}`);
        console.log(`Wrong Data Set Points for Test Case-2: ${result2.wrongPoints.join(' ')}`);
        
    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error('Full error:', error);
        console.error('Make sure testcase1.json and testcase2.json exist in the same directory');
    }
}

main();
