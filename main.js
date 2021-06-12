class Game {
    constructor(data) {
        this.time = data?.time || 0;

        this.points = {
            total: data?.points?.total || 10,
            perTick: data?.points?.perTick || 0,
        };

        this.per1 = {
            total: data?.per1?.total || 1.1,
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
    if (OmegaNum.cmp(game.points.total, game.generator1.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.generator1.cost);
        game.generator1.cost = OmegaNum.pow(3, OmegaNum.add(game.generator1.bought, 1)).times(10);
        game.generator1.multiplier = OmegaNum.times(game.generator1.multiplier, game.per1.total);
        game.generator1.bought = OmegaNum.add(game.generator1.bought, 1);
        game.generator1.amount = OmegaNum.add(game.generator1.amount, 1);
    }
}

function gen2() {
    if (OmegaNum.cmp(game.points.total, game.generator2.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.generator2.cost);
        game.generator2.cost = OmegaNum.pow(5.196, OmegaNum.add(game.generator2.bought, 1)).times(1000);
        game.generator2.multiplier = OmegaNum.times(game.generator2.multiplier, game.per1.total);
        game.generator2.bought = OmegaNum.add(game.generator2.bought, 1);
        game.generator2.amount = OmegaNum.add(game.generator2.amount, 1);
    };
};

function gen3() {
    if (OmegaNum.cmp(game.points.total, game.generator3.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.generator3.cost);
        game.generator3.cost = OmegaNum.pow(11.84, OmegaNum.add(game.generator3.bought, 1)).times(100000);
        game.generator3.multiplier = OmegaNum.times(game.generator3.multiplier, game.per1.total);
        game.generator3.bought = OmegaNum.add(game.generator3.bought, 1);
        game.generator3.amount = OmegaNum.add(game.generator3.amount, 1);
    };
};

var mainGameLoop = window.setInterval(function() {
    AddPoints();
}, 20);

function ui() {
    document.getElementById("Points").innerHTML = `<p style="text-align: center; font-family: a; font-size: 200%;">You have ${notate2(game.points.total)} points.</p>`;
    document.getElementById("pps").innerHTML = `<p style="text-align: center; font-family: a; bottom: 0.5cm; position: relative;">(${notate(OmegaNum.times(game.points.perTick, 50))}/s)</p>`;
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
}

var mainGameLoop = window.setInterval(function() {
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