class Game {
    constructor(data) {
        this.time = data?.time || 0;

        this.points = {
            total: data?.points?.total || 10,
            perTick: data?.points?.perTick || 0,
        };

        this.per1 = {
            total: data?.per1?.total || 1.25,
            increase: data?.per1?.increase || 0,
            requirement: data?.per1?.requirement || 1e7,
            reset: data?.per1?.reset || 0,
        };

        this.generator1 = {
            bought: data?.generator1?.bought || 0,
            amount: data?.generator1?.amount || 0,
            cost: data?.generator1?.cost || 10,
            multiplier: data?.generator1?.multiplier || 1,
        };

        this.generator2 = {
            bought: data?.generator2?.bought || 0,
            amount: data?.generator2?.amount || 0,
            cost: data?.generator2?.cost || 1000,
            multiplier: data?.generator2?.multiplier || 1,
            perTick: data?.generator2?.perTick || 0.007,
        };

        this.generator3 = {
            bought: data?.generator3?.bought || 0,
            amount: data?.generator3?.amount || 0,
            cost: data?.generator3?.cost || 100000,
            multiplier: data?.generator3?.multiplier || 1,
            perTick: data?.generator3?.perTick || 0.004,
        };

        this.genmult = {
            total: data?.genmult?.total || 1,
            increase: data?.genmult?.increase || 3,
            requirement: data?.genmult?.requirement || 10,
            reset: data?.genmult?.reset || 0,
        };
    };
};

var game = new Game()

function AddPoints() {
    game.points.perTick = OmegaNum.times(OmegaNum.times(0.02, game.generator1.amount), game.generator1.multiplier);
    game.points.total = OmegaNum.add(game.points.perTick, game.points.total);
    game.generator2.perTick = OmegaNum.times(OmegaNum.times(0.007, game.generator2.amount), game.generator2.multiplier);
    game.generator3.perTick = OmegaNum.times(OmegaNum.times(0.004, game.generator3.amount), game.generator3.multiplier);
    game.generator1.amount = OmegaNum.add(game.generator1.amount, game.generator2.perTick);
    game.generator2.amount = OmegaNum.add(game.generator2.amount, game.generator3.perTick);
};

function gen1() {
    while (OmegaNum.cmp(game.points.total, game.generator1.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.generator1.cost);
        if (OmegaNum.cmp(game.points.total, 1e25) >= 0) {
            game.generator1.cost = OmegaNum.pow(game.generator1.cost, 1.03);
        } else {
            game.generator1.cost = OmegaNum.pow(2.2, OmegaNum.add(game.generator1.bought, 1)).times(10);
        }
        game.generator1.multiplier = OmegaNum.times(game.generator1.multiplier, game.per1.total);
        game.generator1.bought = OmegaNum.add(game.generator1.bought, 1);
        game.generator1.amount = OmegaNum.add(game.generator1.amount, 1);
    }
}

function gen2() {
    while (OmegaNum.cmp(game.points.total, game.generator2.cost) >= 0) {
        if (OmegaNum.cmp(game.points.total, 1e25) >= 0) {
            game.generator2.cost = OmegaNum.pow(game.generator2.cost, 1.035);
        } else {
            game.generator2.cost = OmegaNum.pow(3.3, OmegaNum.add(game.generator2.bought, 2)).times(1000);
        }
        game.generator2.multiplier = OmegaNum.times(game.generator2.multiplier, game.per1.total);
        game.generator2.bought = OmegaNum.add(game.generator2.bought, 1);
        game.generator2.amount = OmegaNum.add(game.generator2.amount, 1);
    };
};

function gen3() {
    while (OmegaNum.cmp(game.points.total, game.generator3.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.generator3.cost);
        if (OmegaNum.cmp(game.points.total, 1e25) >= 0) {
            game.generator3.cost = OmegaNum.pow(game.generator3.cost, 1.042);
        } else {
            game.generator3.cost = OmegaNum.pow(6, OmegaNum.add(game.generator3.bought, 1)).times(100000);
        }
        game.generator3.multiplier = OmegaNum.times(game.generator3.multiplier, game.per1.total);
        game.generator3.bought = OmegaNum.add(game.generator3.bought, 1);
        game.generator3.amount = OmegaNum.add(game.generator3.amount, 1);
    };
};

var mainGameLoop = window.setInterval(function () {
    AddPoints();
}, 20);

function ui() {
    game.per1.requirement = OmegaNum.pow(1e7, OmegaNum.pow(1.3, game.per1.reset));
    game.per1.total = OmegaNum.times(OmegaNum.pow(1.05, game.per1.reset), 1.1);
    document.getElementById("Points").innerHTML = `<p style="text-align: center; font-family: a; font-size: 200%;">You have ${notate2(game.points.total)} points.</p>`;
    document.getElementById("pps").innerHTML = `<p style="text-align: center; font-family: a; bottom: 0.5cm; position: relative;">(${notate2(OmegaNum.times(game.points.perTick, 50))}/s)</p>`;
    document.getElementById("firstamount").innerHTML = `${notate2(game.generator1.amount)} (${notate2(game.generator1.bought)})`;
    document.getElementById("firstcost").innerHTML = `Cost: ${notate(game.generator1.cost)}`;
    document.getElementById("first").innerHTML = `First Generator (${notate(game.generator1.multiplier)}x)`;
    document.getElementById("secondamount").innerHTML = `${notate2(game.generator2.amount)} (${notate2(game.generator2.bought)})`;
    document.getElementById("secondcost").innerHTML = `Cost: ${notate(game.generator2.cost)}`;
    document.getElementById("second").innerHTML = `Second Generator (${notate(game.generator2.multiplier)}x)`;
    document.getElementById("thirdamount").innerHTML = `${notate2(game.generator3.amount)}`;
    document.getElementById("thirdcost").innerHTML = `Cost: ${notate(game.generator3.cost)}`;
    document.getElementById("third").innerHTML = `Third Generator (${notate(game.generator3.multiplier)}x)`;
    document.getElementById("MBamount").innerHTML = `Multiplier Boost (${notate2(game.per1.reset)}): requires ${notate2(game.per1.requirement)} points.`;
    document.getElementById("MBreset").innerHTML = `Reset the game for a multiplier increase.`;
    document.getElementById("GBamount").innerHTML = `Generator Boost (${notate2(game.genmult.reset)}): requires ${notate2(game.genmult.requirement)} Third Generators.`;
    document.getElementById("GBreset").innerHTML = `Reset the game for a multiplier increase on generators.`;
}

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

function notate(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    let s = "";
    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        let m = n.array[0] / 10 ** e;
        return e < 3 ? n.toPrecision(3) : `${m.toPrecision(3)}e${e}`;
    }
    else if (n.array[1] < 2) {
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}e${Math.floor(n.array[0]).toLocaleString("pt-BR")}`;
    }
    else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    }
}

function notate2(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    let s = "";
    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        let m = n.array[0] / 10 ** e;
        return e < 3 ? n.toFixed(0) : `${m.toPrecision(3)}e${e}`;
    }
    else if (n.array[1] < 2) {
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}e${Math.floor(n.array[0]).toLocaleString("pt-BR")}`;
    }
    else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    }
}


function Save() {
    saveData = game;
    localStorage.saveData = JSON.stringify(saveData);
};

function Load() {
    game = new Game(JSON.parse(localStorage.saveData));
    console.log("Save loaded");
    return saveData.obj || "default";
};
