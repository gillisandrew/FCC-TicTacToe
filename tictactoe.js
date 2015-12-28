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
                for (var i = 0; i < this.squares.win.length; i++) {
                    var cpuCount = 0;
                    var playerCount = 0;
                    for (j = 0; j < this.squares.win[i].length; j++) {
                        if (this.squares.cpu.indexOf(this.squares.win[i][j]) !== 0) {
                            cpuCount++;
                            console.log('cpu')
                        }
                        if (this.squares.player.indexOf(this.squares.win[i][j]) !== 0) {
                            playerCount++;
                            console.log('player')
                        }
                    }
                }
                break;


        }
        console.log(cpuPick)
        return cpuPick;
    };
    this.playerTurn = function (selection) {
        var index = this.squares.free.indexOf(selection)
        if (index !== -1) {
            this.turn++;
            this.squares.free[index] = false;
            this.squares.player.push(selection);
            this.cpuTurn();
        }
        console.log(this.squares.free)
    };
}