function MultiplierBoost() {
    if (OmegaNum.cmp(game.points.total, game.per1.requirement) >= 0) {
        game.points.total = 10;
        game.generator1.cost = 10;
        game.generator2.cost = 1000;
        game.generator3.cost = 100000;
        game.generator1.bought = 0;
        game.generator2.bought = 0;
        game.generator3.bought = 0;
        game.generator1.amount = 0;
        game.generator2.amount = 0;
        game.generator3.amount = 0;
        game.generator1.multiplier = 1;
        game.generator2.multiplier = 1;
        game.generator3.multiplier = 1;
        game.per1.reset += 1;
        game.per1.requirement = OmegaNum.pow(1e7, OmegaNum.pow(1.3, game.per1.reset));
        game.per1.total = OmegaNum.times(OmegaNum.pow(1.05, game.per1.reset), 1.1);
    };
}

function GeneratorBoost() {
    if (OmegaNum.cmp(game.points.total, game.per1.requirement) >= 0) {
        game.points.total = 10;
        game.generator1.cost = 10;
        game.generator2.cost = 1000;
        game.generator3.cost = 100000;
        game.generator1.bought = 0;
        game.generator2.bought = 0;
        game.generator3.bought = 0;
        game.generator1.amount = 0;
        game.generator2.amount = 0;
        game.generator3.amount = 0;
        game.generator1.multiplier = game.genmult.total;
        game.generator2.multiplier = game.genmult.total;
        game.generator3.multiplier = game.genmult.total;
        game.genmult.reset += 1;
        game.genmult.requirement = OmegaNum.times(2.5, game.genmult.reset).add(10);
        game.genmult.increase = OmegaNum.pow(game.genmult.increase, 1.01);
        game.genmult.total = OmegaNum.pow(game.genmult.increase, game.genmult.reset);
    };
}
