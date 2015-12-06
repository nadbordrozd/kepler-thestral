/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Quintus.MyStages = function(Q) {
    Q.scene("player_selector", function(stage) {

        var start_button = stage.insert(new Q.UI.Button({x: 100, y: 100, fill: "#ABCDEF", label: "start"}));
        start_button.on("click", function() {
            Q.clearStages();
            Q.stageScene("level_selector");
        });

        stage.insert(new Q.TogglePlayerButton({x: 200, y: 100, name: "RED",
            on_color: "#FF0000", off_color: "#FFAAAA", label: "jlikh", is_on: false}));
        stage.insert(new Q.TogglePlayerButton({x: 200, y: 200, name: "GREEN",
            on_color: "#00FF00", off_color: "#AAFFAA", label: "adwsSPACE", is_on: false}));
        stage.insert(new Q.TogglePlayerButton({x: 200, y: 300, name: "BLUE",
            on_color: "#0000FF", off_color: "#AAAAFF", label: "arrows SHIFT", is_on: false}));
        stage.insert(new Q.TogglePlayerButton({x: 200, y: 400, name: "YELLOW",
            on_color: "#FFFF00", off_color: "#FFFFAA", label: "vngbc", is_on: false}));
		stage.insert(new Q.TogglePlayerButton({x: 200, y: 500, name: "PURPLE",
            on_color: "#7700FF", off_color: "#AA77FF", label: "mouse", is_on: false}));

			
			
		var level1 = stage.insert(new Q.UI.Button({x: 450, y: 100, fill: "#ABCDEF", label: "level1"}));
		level1.on("click", function(){
			Q.clearStages();
			Q.stageScene("centripetal");
		});

    });

    Q.scene("level_selector", function(stage) {
        console.log("inserting like crazy");
        Q.master.is_on = false;
        var start_button = stage.insert(new Q.UI.Button({x: 700, y: 100, label: "start",  fill: "#ABCDEF"}));
//        start_button.
        Q.input.on("ENTER", function(){
            console.log(Q.master.is_on);
            if(Q.master.is_on){ return;}
            Q.master.is_on = true;
            Q.clearStages();
            Q.stageScene(Q.master.stage_to_play);
        });
        var next_stage = Q.master.stage_to_play;
        start_button.on("click", function(){
            Q.master.is_on = true;
            Q.clearStages();
            Q.stageScene(Q.master.stage_to_play);
        })
        var cosmos_button = stage.insert(new Q.UI.Button({x: 400, y: 100, fill: "#ABCDEF",
            label: "cosmos (no friction)"}));
        var dirt_button = stage.insert(new Q.UI.Button({x: 400, y: 200, fill: "#ABCDEF",
            label: "dirt (full friction)"}));
        var water_button = stage.insert(new Q.UI.Button({x: 400, y: 300, fill: "#ABCDEF",
            label: "water (some friction)"}));
        cosmos_button.on("click", function() {
            Q.master.set_level("cosmos");
//            Q.clearStages();
//            Q.stageScene("cosmos");
        });
        dirt_button.on("click", function() {
            Q.master.set_level("dirt");
//            Q.clearStages();
//            Q.stageScene("dirt");
        });
        water_button.on("click", function() {
            Q.master.set_level("lake");
//            Q.clearStages();
//            Q.stageScene("lake");
        });
    });

    var rand_xy = function() {
        var x = Math.random() * 0.6;
        if (x > 0.3)
            x += 0.4;
        var y = Math.random() * 0.6;
        if (y > 0.3)
            y += 0.4;
        var v = 0.01;
        return {x: x * Q.width, y: y * Q.height};
    }

    var rand = function(min, max) {
        return Math.random() * (max - min) + min;
    }
    var rand_int = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Q.scene("cosmos", function(stage) {
        Q.master.init_level();
        var players = Q.state.get("players");
        for (var player_name in players) {
            Q.master.insert_rocket(stage, {
                y: (Math.random() * 0.4 + 0.3) * Q.height,
                x: (Math.random() * 0.4 + 0.3) * Q.width,
                name: player_name,
                max_a: 25,
                max_epsilon: 300,
                v_frict: 0,
                omega_frict: 0});
        }
        var hud = stage.insert(new Q.HUD());
        hud.display_me(stage);
        for (var i = 0; i < rand_int(0,10); i++)
            stage.insert(new Q.LargeRock(rand_xy()));
        Q.state.set("game_stage", stage);
    });

    Q.scene("lake", function(stage) {
        Q.master.init_level();
        var players = Q.state.get("players");
        for (var player_name in players) {
            Q.master.insert_rocket(stage, {
                y: (Math.random() * 0.4 + 0.3) * Q.height,
                x: (Math.random() * 0.4 + 0.3) * Q.width,
                name: player_name,
                max_a: 35,
                max_epsilon: 300,
                v_frict: 0.3,
                omega_frict: 0.3});
        }
        var hud = stage.insert(new Q.HUD());
        hud.display_me(stage);
        for (var i = 0; i < rand_int(0,10); i++)
            stage.insert(new Q.LargeRock(rand_xy()));
        Q.state.set("game_stage", stage);
    });

    Q.scene("dirt", function(stage) {
        Q.master.init_level();
        var players = Q.state.get("players");
        for (var player_name in players) {
            Q.master.insert_rocket(stage, {
                y: (Math.random() * 0.4 + 0.3) * Q.height,
                x: (Math.random() * 0.4 + 0.3) * Q.width,
                name: player_name,
                max_a: 100,
                max_epsilon: 200,
                no_inertia: true});
        }
        var hud = stage.insert(new Q.HUD());
        hud.display_me(stage);
        for (var i = 0; i < rand_int(0,10); i++)
            stage.insert(new Q.LargeRock(rand_xy()));
        Q.state.set("game_stage", stage);
    });
<<<<<<< HEAD

=======
	
	
	Q.scene("centripetal", function(stage) {
		stage.insert(new Q.PointAndClickRocket({})
    });
	
>>>>>>> 8f8de5a28df00aaf9a1bd01b44a83db1a7bbc78e
	
}
