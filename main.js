window.addEventListener("load", function() {
    var Q = window.Q = Quintus({audioSupported: ['ogg']})
            .include("Sprites, Scenes, 2D, Input, Touch, UI, Anim, MyStages, \n\
                        MySprites, MyState, Reposition, GameMaster, \n\
						KeplerSprites, KeplerStages")
            .setup({maximize: true})//({  width: 1024, height: 768})         // {maximize: true} Maximize this game to whatever the size of the browser is
            .controls();         // And turn on default input controls and touch input (for UI)
    Q.touch(Q.SPRITE_UI, [1, 0]);
	Q.input.mouseControls({cursor: "on"});
    Q.gravityX = 0;
    Q.gravityY = 0;

	keymap = {
		CONTROL: "CONTROL",
		SHIFT: "SHIFT",
		SPACE: 'SPACE',
		ENTER: 'ENTER'
	}
	for(var i = 65; i<=90; i++){
      var c = String.fromCharCode(i);
      keymap[c] = c.toLowerCase();
	}
	Q.input.keyboardControls(keymap);

    Q.load(["Canti.png", "wheatley.png", "wall-e.png", "coil.png", "ship_red.png"], function() {
        console.log("assets loaded");
        //var ball = new Q.Rocket();
//        Q.stageScene("level1");
        Q.stageScene("player_selector");
//        Q.stageScene("level_selector");
    });

    Q.debug = true;


}); 