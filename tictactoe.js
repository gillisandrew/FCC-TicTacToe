round = function(n) {
    this.roundNumber = n;
    this.roundStartTime = new Date();
    this.roundEndTime = null;
    this.turn = 0;
    this.squares = new Object();
    this.squares.free = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.squares.player = [];
    this.squares.cpu = [];
    this.cpuTurn = function() {
        this.turn++;
        var cpuPick;
        switch(this.turn) {
            case 1:
                var ideal = [1, 3, 4, 7, 9];
                cpuPick = ideal[Math.floor(Math.random() * ideal.length + 1) - 1];
                break;
            case 2:
                if(this.squares.free.indexOf(4) === -1) {
                    var ideal = [1, 3, 7, 9];
                    cpuPick = ideal[Math.floor(Math.random() * ideal.length + 1) - 1];
                }else {
                    cpuPick = 4;
                }
                break;
            case 3:
        }
        return cpuPick;
    };
    this.playerTurn = function(selection) {
        this.turn++;
        var index = this.squares.free.indexOf(selection)
        if(index !== -1) {
            this.squares.free[index] = false;
            this.squares.player.push(selection);
        }
    };
}