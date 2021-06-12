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
    }
}