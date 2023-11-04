<template></template>

<script setup>
// variables for a year by year basis
const autonscoring = {
    time: [5], points: [2], limit: [999999],
    // for parking, use [seconds, points] arrays
    // leave [0, 0] option open for not parking
    parking: [[0, 0], [3, 3]]
}
const teleopscoring = { time: [1], points: [1], limit: [999999] }
const endgamescoring = { time: [1, 10], points: [1, 20], limit: [999999] }
// variables from here on won't be changed on year by year basis
// auton might be (15 + 3) seconds long
let auton = 15; let teleop = 105; let endgame = 30;
var score = 0;
var testscores = [0, 0, 0, 0, 0];
var points, time, limit;

// park calc: do a calc for each park option and not parking
let a = autonscoring;
let ap = autonscoring.parking;
for (let i = 0; i < ap.length; i++) {
    if (ap[i][0] <= auton) {
        auton -= ap[i][0];
        testscore[0] += ap[i][1];
        let scoringrates = [];
        for (let j = 0; j < a.time.length; j++) { scoringrates[j] = a.points / a.time; }
    }
    // sort function to get highest rate scoringrates.forEach();
    // take max and check for limitations
    // subtract time and add points
    // if limit reached, see how much time is left, then check for next best scoring method
}

// teleopcalculations
let t = teleopscoring;
let scoringrates = [];
for (let i = 0; i < t.time.length; i++) { scoringrates[i] = t.points / t.time; }


// sort function to get highest rate scoringrates.forEach();
// take max and check for limitations
// subtract time and add points
// if limit reached, see how much time is left, then check for next best scoring method-->might require some form of recursion

// endgame calculations
let e = endgamescoring;
scoringrates = [];
for (let i = 0; i < e.time.length; i++) { scoringrates[i] = e.points / e.time; }


// sort function to get highest rate scoringrates.forEach();
// take max and check for limitations
// subtract time and add points
// if limit reached, see how much time is left, then check for next best scoring method-->might require some form of recursion

// some form of output
</script>
