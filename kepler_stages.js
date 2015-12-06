/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Quintus.KeplerStages = function(Q) {


	Q.scene("centripetal", function(stage) {
		stage.insert(new Q.KeplerRocket({x: 10, y: 200, vx: 100}));
		
		stage.insert(new Q.Collectible({x: 200, y: 200}));
		stage.insert(new Q.Collectible({x: 250, y: 200}));
		stage.insert(new Q.Collectible({x: 300, y: 200}));
		stage.insert(new Q.Collectible({x: 350, y: 200}));
		stage.insert(new Q.Collectible({x: 400, y: 200}));
		
		stage.insert(new Q.Collectible({x: 200, y: 545}));
		stage.insert(new Q.Collectible({x: 250, y: 545}));
		stage.insert(new Q.Collectible({x: 300, y: 545}));
		stage.insert(new Q.Collectible({x: 350, y: 545}));
		stage.insert(new Q.Collectible({x: 400, y: 545}));
		
		stage.insert(new Q.Collectible({x: 493, y: 215}));
		stage.insert(new Q.Collectible({x: 531, y: 230}));
		stage.insert(new Q.Collectible({x: 590, y: 270}));
		stage.insert(new Q.Collectible({x: 622, y: 301}));
		stage.insert(new Q.Collectible({x: 650, y: 414}));
		stage.insert(new Q.Collectible({x: 600, y: 490}));

    });
	
	
}
