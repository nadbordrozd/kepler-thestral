;
Quintus.MyState = function(Q) {
    Q.Class.extend("Player", {
        init: function(name, color, left, right, up, down, fire) {
            this.name = name;
            this.score = 0;
            this.alive_now = true;
            this.color = color;
            this.left = left;
            this.right = right;
            this.up = up;
            this.down = down;
            this.fire = fire;
        },
        inc_score: function() {
            this.score += 1;
        },
        before_level_init: function(){
            this.alive_now = true;
        }
    });

    Q.PLAYERS = {RED: new Q.Player("RED", "#FF0000", "j", "l", "i", "k", "h"),
        GREEN: new Q.Player("GREEN", "#00FF00", "a", "d", "w", "s", "SPACE"),
        BLUE: new Q.Player("BLUE", "#0000FF", "left", "right", "up", "down", "SHIFT"),
        YELLOW: new Q.Player("YELLOW", "#FFFF00", "v", "n", "g", "b", "c"),
		PURPLE: new Q.Player("PURPLE", "#FF00FF", null, null, "mouse", null, "click")
		};

    Q.state.reset({players: {}, scores: {}, live_count: 0});

    Q.state.add_player = function(color) {
        var players = Q.state.get("players");
        players[color] = Q.PLAYERS[color];
    }
    Q.state.remove_player = function(color) {
        var players = Q.state.get("players");
        delete players[color];
    }

};