<template>
    <div class="card">
        <div class="card-inner">
            <h2>Game Scoring System</h2>
            <div>
                <label for="auton-time">Auton Time (seconds): </label>
                <input id="auton-time" type="number" v-model.number="auton" />
            </div>
            <div>
                <label for="teleop-time">Teleop Time (seconds): </label>
                <input id="teleop-time" type="number" v-model.number="teleop" />
            </div>
            <div>
                <label for="endgame-time">Endgame Time (seconds): </label>
                <input id="endgame-time" type="number" v-model.number="endgame" />
            </div>
            <button @click="calculateScores">Calculate Scores</button>
            <!-- <div v-if="scoreCalculated">
            <h3>Scores:</h3>
            <p>Auton Score: {{ testscores[0] }}</p>
            <p>Teleop Score: {{ testscores[1] }}</p>
            <p>Endgame Score: {{ testscores[2] }}</p>
            <p>Total Score: {{ score }}</p>
        </div> -->
        </div>
    </div>

    <!-- Result Card -->
    <div v-if="scoreCalculated" class="result-card">
        <h3>Calculated Scores:</h3>
        <p>Auton Score: {{ testscores[0] }}</p>
        <p>Teleop Score: {{ testscores[1] }}</p>
        <p>Endgame Score: {{ testscores[2] }}</p>
        <p>Total Score: {{ score }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Scoring configuration constants
const autonscoring = {
    time: [5],
    points: [2],
    limit: [999999],
    parking: [
        [0, 0],
        [3, 3],
    ],
};

const teleopscoring = {
    time: [1],
    points: [1],
    limit: [999999]
};

const endgamescoring = {
    time: [1, 10],
    points: [1, 20],
    limit: [999999]
};

// Reactivity enabled variables
let auton = ref(15);
let teleop = ref(105);
let endgame = ref(30);
let score = ref(0);
let testscores = ref([0, 0, 0]);
let scoreCalculated = ref(false);

// Calculate Scores function
const calculateScores = () => {
    // Reset scores
    score.value = 0;
    testscores.value.fill(0);

    // Auton calculations
    let autonRemainingTime = auton.value;
    for (let [parkTime, parkPoints] of autonscoring.parking) {
        if (parkTime <= autonRemainingTime) {
            autonRemainingTime -= parkTime;
            testscores.value[0] += parkPoints;
            break; // Assuming only one parking action can be taken
        }
    }

    // Assuming a simple scoring model where each action takes a set amount of time and scores points
    // Additional logic would be needed for more complex scoring mechanisms
    let autonPointsPerSecond = autonscoring.points[0] / autonscoring.time[0];
    testscores.value[0] += autonRemainingTime * autonPointsPerSecond;

    // Teleop calculations
    let teleopPointsPerSecond = teleopscoring.points[0] / teleopscoring.time[0];
    testscores.value[1] = teleop.value * teleopPointsPerSecond;

    // Endgame calculations
    let endgamePointsPerSecond = endgamescoring.points.reduce((acc, points, index) => {
        return acc + (points / endgamescoring.time[index]);
    }, 0);
    testscores.value[2] = endgame.value * endgamePointsPerSecond;

    // Calculate total score
    score.value = testscores.value.reduce((acc, current) => acc + current, 0);

    // Update the calculated flag
    scoreCalculated.value = true;
};

</script>

<style>
.card {
    display: flex;
    text-align: center;
    margin: auto;
    background-color: aliceblue;
    border-radius: 15px;
    width: 50%;
    height: 35%;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-inner {
    margin: 15px;
    overflow: auto;
}

.result-card {
    display: flex;
    text-align: center;
    flex-direction: column;
    margin: 10%;
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>