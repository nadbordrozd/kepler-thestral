;
Quintus.KeplerMaster = function(Q) {
    Q.GameObject.extend("K", {
        init: function(p) {
            this.p = Q._extend({}, p);
            this.listeners = {};
            this.active_ships = {};
            this.stage_to_play = "TODO ";
            this.is_on = false;
        },
        set_level: function(level_name){
            this.stage_to_play = level_name;
        },
        //called when a player dies
        died: function(color) {
            var player = Q.PLAYERS[color];
            player.alive_now = false;
            delete this.active_ships[color];
            console.log("died");
            Q.state.dec("live_count", 1);
            if (Q.state.get("live_count") == 1) {
                console.log("muka");
                var allp = Q.state.get("players");
                for (var i in allp) {
                    console.log("w state.died " + allp[i].name + " " + allp[i].alive_now)
                    if (allp[i].alive_now) {
                        allp[i].inc_score();
                        console.log("gamestate changed");
                        Q.state.set("scores", {});
                        var stage = Q.state.get("game_stage");

//                        var start_button = stage.insert(new Q.UI.Button({x: 300, y: 300, fill: "#ABCDEF", label: "next"}));

                        Q.stageScene("level_selector");
         
                    }
                }
            }
        },
        insert_rocket: function(stage, properties) {
            var name = properties["name"];
            var player = Q.PLAYERS[name];
            properties.left = player.left;
            properties.right = player.right;
            properties.up = player.up;
            properties.down = player.down;
            properties.fire = player.fire;
            properties.angle = properties.angle || Math.random()*180*2;
			if(name == "PURPLE"){
				var rocket = stage.insert(new Q.PointAndClickRocket(properties));
			} else {
				var rocket = stage.insert(new Q.Rocket(properties));
			}
            this.active_ships[name] = rocket;
        },
        init_level: function() {
            var players = Q.state.get("players");
            var p_count = 0;
            for (var p_name in players) {
                players[p_name].before_level_init();
                p_count++;
            }
            Q.state.set("live_count", p_count);

        }
    });
    Q.master = new Q.GameMaster();


};