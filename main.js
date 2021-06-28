class Game {
    constructor(data) {
        this.units = {
            total: data?.units?.total || 10,
            pow: data?.units?.pow || 0.9999,
            start: data?.units?.start || 10,
            end: data?.units?.end || 1.5,
            time: data?.units?.time || 0,
        };
        this.points = {
            total: data?.points?.total || 0,
            multiplier: data?.points?.multiplier || 1,
        };
        this.upgrade1 = {
            cost: data?.upgrade1?.cost || 1,
            level: data?.upgrade1?.level || 0,
            effect: data?.upgrade1?.effect || 1.00005,
        };
        this.upgrade2 = {
            cost: data?.upgrade2?.cost || 10,
            level: data?.upgrade2?.level || 0,
            effect: data?.upgrade2?.effect || 1.16,
        };
        this.upgrade3 = {
            cost: data?.upgrade3?.cost || 100,
            level: data?.upgrade3?.level || 0,
            effect: data?.upgrade3?.effect || 1.06,
        };
        this.upgrade4 = {
            cost: data?.upgrade4?.cost || 1e20,
            level: data?.upgrade4?.level || 0,
        };
        this.upgrade5 = {
            cost: data?.upgrade5?.cost || new OmegaNum("1e1000"),
            level: data?.upgrade5?.level || 0,
        };
        this.upgrade6 = {
            cost: data?.upgrade6?.cost || new OmegaNum("1e1000000"),
            level: data?.upgrade6?.level || 0,
        };
    };
};

var game = new Game();

function ui() {
    document.getElementById("units").innerHTML = `You have <strong>${notate(game.units.total)}</strong> units.`;
    document.getElementById("points").innerHTML = `You have <strong>${notate2(game.points.total)}</strong> points.`;
    document.getElementById("reset").innerHTML = `Resets for <strong>${notate(game.units.start)}</strong> units.`;
    document.getElementById("start").innerHTML = `Wait until ${notate(game.units.end)} units.`;
    document.getElementById("utime").innerHTML = `${notate(game.units.time)} seconds.`;
    if (OmegaNum.cmp(game.upgrade1.cost, 1) == 0) {
        document.getElementById("upgrade1").innerHTML = `Decrease the units amount faster <br> Cost: <strong>${notate2(game.upgrade1.cost)}</strong> point <br> Level: ${notate2(game.upgrade1.level)}`;
    } else {
        document.getElementById("upgrade1").innerHTML = `Decrease the units amount faster <br> Cost: <strong>${notate2(game.upgrade1.cost)}</strong> points <br> Level: ${notate2(game.upgrade1.level)}`;
    }
    document.getElementById("upgrade2").innerHTML = `Increase amount of points needed for more points <br> Cost: <strong>${notate2(game.upgrade2.cost)}</strong> points <br> Level: ${notate2(game.upgrade2.level)}`;
    document.getElementById("upgrade3").innerHTML = `Receive more points per reset <br> Cost: <strong>${notate2(game.upgrade3.cost)}</strong> points <br> Level: ${notate2(game.upgrade3.level)}`;
    document.getElementById("upgrade4").innerHTML = `The upgrade above becomes stronger <br> <br> Cost: <strong>${notate2(game.upgrade4.cost)}</strong> units <br> Level: ${notate2(game.upgrade4.level)}`;
    document.getElementById("upgrade5").innerHTML = `The upgrade above becomes stronger <br> <br> Cost: <strong>${notate2(game.upgrade5.cost)}</strong> units <br> Level: ${notate2(game.upgrade5.level)}`;
    document.getElementById("upgrade6").innerHTML = `The upgrade above becomes stronger <br> <br> Cost: <strong>${notate2(game.upgrade6.cost)}</strong> units <br> Level: ${notate2(game.upgrade6.level)}`;
};

function divUnits() {
    game.units.total = OmegaNum.pow(game.units.total, game.units.pow);
    if (OmegaNum.cmp(game.units.total, game.units.end) <= 0) {
        game.units.time = new OmegaNum("0");
        game.units.start = OmegaNum.pow(game.units.start, 1.05);
        game.units.total = game.units.start;
        game.points.total = OmegaNum.add(game.points.total, OmegaNum.times(OmegaNum.log10(game.units.start), game.points.multiplier));
    };
};

function upgrade1() {
    while (OmegaNum.cmp(game.points.total, game.upgrade1.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.upgrade1.cost);
        game.upgrade1.cost = OmegaNum.add(OmegaNum.pow(game.upgrade1.cost, 1.08), 1);
        game.units.pow = OmegaNum.div(game.units.pow, game.upgrade1.effect);
        game.upgrade1.level = OmegaNum.add(game.upgrade1.level, 1);
    };
};

function upgrade2() {
    while (OmegaNum.cmp(game.points.total, game.upgrade2.cost) >= 0) {
        game.points.total = OmegaNum.sub(game.points.total, game.upgrade2.cost);
        game.upgrade2.cost = OmegaNum.pow(100, OmegaNum.pow(1.15, game.upgrade2.level));
        game.units.end = OmegaNum.pow(game.units.end, game.upgrade2.effect);
        game.upgrade2.level = OmegaNum.add(game.upgrade2.level, 1);
    };
};

function upgrade3() {
    while (OmegaNum.cmp(game.points.total, game.upgrade3.cost) >= 0) {
        game.upgrade3.cost = OmegaNum.times(game.upgrade3.cost, 1.67);
        game.points.multiplier = OmegaNum.times(game.points.multiplier, game.upgrade3.effect);
        game.upgrade3.level = OmegaNum.add(game.upgrade3.level, 1);
    };
};

function upgrade4() {
    while (OmegaNum.cmp(game.units.total, game.upgrade4.cost) >= 0) {
        game.upgrade4.cost = OmegaNum.pow(game.upgrade4.cost, 1.63);
        game.upgrade1.effect = OmegaNum.pow(game.upgrade1.effect, 1.1);
        game.upgrade4.level = OmegaNum.add(game.upgrade4.level, 1);
    };
};

function upgrade5() {
    while (OmegaNum.cmp(game.units.total, game.upgrade5.cost) >= 0) {
        game.upgrade5.cost = OmegaNum.pow(game.upgrade5.cost, 2.2);
        game.upgrade2.effect = OmegaNum.add(game.upgrade2.effect, 0.02);
        game.upgrade5.level = OmegaNum.add(game.upgrade5.level, 1);
    };
};

function upgrade6() {
    while (OmegaNum.cmp(game.units.total, game.upgrade6.cost) >= 0) {
        game.upgrade6.cost = OmegaNum.pow(game.upgrade6.cost, 1.75);
        game.upgrade2.effect = OmegaNum.add(game.upgrade2.effect, 0.01);
        game.upgrade6.level = OmegaNum.add(game.upgrade6.level, 1);
    };
};

var mainGameLoop = window.setInterval(function () {
    divUnits();
}, 0);

var mainGameLoop = window.setInterval(function () {
    game.units.time = OmegaNum.add(game.units.time, 0.02);
}, 20);
