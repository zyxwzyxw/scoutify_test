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

<canvas id="myChart" style="width:100%;max-width:700px"></canvas>
<canvas id="rnkpntChart" style="width:100%;max-width:700px"></canvas>
</template>

<script setup>
//don't know if this script can be inside the script
<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>

//Assumptions: We will always engage. We will score for high, then mid, then low, but because we never will get to the low grid, we don't have to account for it
let balancingtime = [3, 5, 7];//it can take either 3 seconds, 5 seconds, or 7 seconds
let pointsforbalancing = [12, 10];//auton and teleop
let placetime = [2, 4];
let pointsforhigh = [6, 5];//auton and teleop
let pointsformid = [4, 3];
let autonpickup = [2, 4];
let autonmovepartofcycle = [4,6];
let movepartofcycle =  [7, 9, 11];
const autonPieceLimit = 5;
const scenariospoints=new Array(balancingtime.length).fill(new Array(placetime.length).fill(new Array(autonpickup.length).fill(new Array(autonmovepartofcycle.length).fill(new Array(movepartofcycle.length).fill(new Array(0))))));//for chart
const rnkValues=[{x:0,y:0}];
let decodescenario = (a) =>
a.charAt(0)*placetime.length*autonpickup.length*autonmovepartofcycle.length*movepartofcycle.length+
balancingtime.length*a.charAt(1)*autonpickup.length*autonmovepartofcycle.length*movepartofcycle.length+
balancingtime.length*placetime.length*a.charAt(2)*autonmovepartofcycle.length*movepartofcycle.length+
balancingtime.length*placetime.length*autonpickup.length*a.charAt(3)*movepartofcycle.length+
balancingtime.length*placetime.length*autonpickup.length*autonmovepartofcycle.length*a.charAt(4);;
//create a scenario tree
for (let i in balancingtime) {
    for (let j in placetime) {
        for (let k in autonpickup) {
            for (let l in autonmovepartofcycle) {
                for (let m in movepartofcycle) {
//initilize the variables
let nodesscored=0;
let autonPCCount = 0;
let holdingpiece=1;//start w/ holding one piece

//auton balance
let points=pointsforbalancing[0]+3;//the three is for mobility
let time=150-balancingtime[i];
scenariospoints[i][j][k][l][m].push({x: 150-time, y: points});

//place pieces during auton
while (time - placetime[j] >= 135 && autonPCCount < autonPieceLimit) {
    points+=pointsforhigh[0]*holdingpiece;
    ++nodesscored;
	if (nodesscored % 3===0){points+=5;}
    time -= placetime[j];
	autonPCCount+=holdingpiece;
    holdingpiece = 0;
	scenariospoints[i][j][k][l][m].push({x: 150-time, y: points});
    if (time - autonmovepartofcycle[l]/2 - autonpickup[k] >= 135) {//the autonmovepartofcycle[l] is divided by two b/c the robot only travels to pick up the cones, not also back 
        time -= autonmovepartofcycle[l]/2 + autonpickup[k];
        ++holdingpiece;
        if(time-autonmovepartofcycle[l]/2-placetime[j]>=135){time-=autonmovepartofcycle[l]/2;}
        else{time=135;}
    }
}
//endgame
time = 135 - balancingtime[i];
points += pointsforbalancing[1];
scenariospoints[i][j][k][l][m].push({x: 150-time, y: points});
//teleop
// if holding pieces at beginning of teleop
if (holdingpiece>0) {
    ++nodesscored;
    points+=pointsforhigh[1]*holdingpiece;
    holdingpiece = 0;
    time-= placetime[j];
    if (nodesscored % 3===0){points+=5;}//test for links
	scenariospoints[i][j][k][l][m].push({x: 150-time, y: points});
}
//score high and mid
while (time-movepartofcycle[l]-placetime[j]>=0) {
    ++nodesscored;
    time-=placetime[j]+movepartofcycle[l]+autonpickup[k];
    if(nodesscored<=9){points += pointsforhigh[1];}
    else{points+= pointsformid[1];}
    if (nodesscored % 3===0){points +=5;}
    scenariospoints[i][j][k][l][m].push({x: 150-time, y: points});
}
let x=decodescenario(''+i+j+k+l+m);
if (Math.floor(nodesscored / 3) > 3) {rnkValues.push({x:x,y:1})}
else{rnkValues.push({x:x,y:0})}
                }
            }
        }
    }
}
const xyValues =[];

//figure out which scenario each scatterpoint belongs to by defining the endpoints of each data set
const endpoints=[-1];//its -1 b/c its the ending-point in a scenario where nothing happens: it was done like this so the next scenario starts w/ zero (-1+1=0). I added one b/c the endpoint of one scenario is 1 plus the startpoint of another scenario.
for(let i=0;i<scenariospoints[0][0][0][0][0].length-1;i++){
	if(scenariospoints[0][0][0][0][0][i].x>scenariospoints[0][0][0][0][0][i+1].x){endpoints.push(i);}
}
endpoints.push(scenariospoints[0][0][0][0][0].length);
//i just need to be able to turn const scenario='[0][0][0][0][0][0]'; into a number
//how can i make const a=1 if scenario is '11111', make a =2 is scenario='11112', make a=3 if scenario='11121' and so forth? Here are the constraints: the first & third # can be either 1,2 or 3 while the other #s have to be 1 or 2

const scenario='00000';

const b=decodescenario(scenario);
const startpoint=endpoints[b]+1;//an accesser
const endpoint=endpoints[b+1];
//for each point in the given range, push a point to the xyValues array
for(let i=startpoint;i<endpoint;i++){xyValues.push(scenariospoints[0][0][0][0][0][i]);}

window.addEventListener("load", function(event) { //only initialize chart once window loads completely to avoid context issues
    new Chart("myChart", {
    type: "scatter",
    data: {
        datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: xyValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        xAxes: [{ticks: {min: 0, max:150}}],
        yAxes: [{ticks: {min: 0, max:120}}],
        }
    }
    });
    
    new Chart("rnkpntChart", {
    type: "scatter",
    data: {
        datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(255,255,0)",
        data: rnkValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        xAxes: [{ticks: {min: 0, max:balancingtime.length*placetime.length*autonpickup.length*autonmovepartofcycle.length*movepartofcycle.length}}],
        yAxes: [{ticks: {min: 0, max:1,stepSize:1}}],
        }
    }
    });
});
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