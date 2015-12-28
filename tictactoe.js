round = function (n) {
    this.roundNumber = n;
    this.roundStartTime = new Date();
    this.roundEndTime = null;
    this.turn = 0;
    this.squares = new Object();
    this.squares.win = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]
    this.squares.free = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.squares.player = [];
    this.squares.cpu = [];
    this.checkOutcomes = function () {
        var choice1 = [];
        var choice2 = [];
        for (var i = 0; i < this.squares.win.length; i++) {
            var cpuCount = 0;
            var playerCount = 0;
            var odd = [];
            for (var j = 0; j < this.squares.win[i].length; j++) {
                if (this.squares.free[this.squares.win[i][j]] === true) {
                    cpuCount++;
                } else if (this.squares.free[this.squares.win[i][j]] === false) {
                    playerCount++;
                } else if (typeof this.squares.free[this.squares.win[i][j]] === 'number') {
                    odd.push(this.squares.win[i][j]);
                }
            }
            if (cpuCount === 2 && playerCount === 0) {
                console.log('CPU Win!');
                console.log(this.squares.win[i]);
                return odd[0];
            } else if (playerCount === 2 && cpuCount === 0) {
                console.log('CPU Blocks!')
                choice1.push(odd[0]);
            } else if (cpuCount === 1 && playerCount === 0) {
                choice2.push(odd[0], odd[1]);
            }
        }
        console.log(choice1);
        console.log(choice2);
        if (choice1.length) {
            return choice1[0];
        } else {
            var ideal;
            var nIdeal = 0;
            for (var i = 0; i <= 8; i++) {
                var count = choice2.reduce(function (n, val) {
                    return n + (val === i);
                }, 0);
                if (count > nIdeal) {
                    ideal = i;
                }
            }
            if(ideal === undefined) {
                var choice3 = this.squares.free.filter(function(check) {
                    return typeof check === 'number';
                });
                return choice3[Math.floor(Math.random() * choice3.length + 1) - 1];
            }else {
                return ideal;
            }
        }
    }
    this.cpuTurn = function () {
        this.turn++;
        var cpuPick;
        switch (this.turn) {
            case 1:
                var ideal = [0, 2, 4, 6, 8];
                cpuPick = ideal[Math.floor(Math.random() * ideal.length + 1) - 1];
                break;
            case 2:
                if (!this.squares.free[4]) {
                    var ideal = [0, 2, 6, 8];
                    cpuPick = ideal[Math.floor(Math.random() * ideal.length + 1) - 1];
                } else {

                    cpuPick = 4;
                }
                break;
            default:
                cpuPick = this.checkOutcomes();
                break;
        }
        console.log(cpuPick);
        this.squares.free[cpuPick] = true;
        $('.square[data-square=' + cpuPick + ']').addClass('o');
        return cpuPick;
    };
    this.playerTurn = function (selection) {
        var index = this.squares.free.indexOf(selection)
        if (index !== -1) {
            this.turn++;
            this.squares.free[index] = false;
            this.squares.player.push(selection);
            $('.square[data-square=' + selection + ']').addClass('x');
            this.cpuTurn();
        }
        console.log(this.squares.free)
    };
}