;
Quintus.KeplerSprites = function(Q) {
    Q.SPRITE_NONE = 0;
    Q.SPRITE_SHIP = 1;
    Q.SPRITE_BULLET = 2;
    Q.SPRITE_ASTEROID = 4;
    Q.SPRITE_ALL = 7;

/*
    Q.Sprite.extend("VectorSprite", {
        draw: function(ctx) {
            var p = this.p;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(p.points[0][0], p.points[0][1]);
            for (var i = 1, max = p.points.length; i < max; i++) {
                ctx.lineTo(p.points[i][0], p.points[i][1]);
            }
            ctx.fill();
        }
    });
	*/
	
    Q.VectorSprite.extend("KeplerRocket", {
        init: function(p) {
            this._super(p, {x: 500, y: 200, w: 80, h: 250, vx: 0, vy: 0,
                gravity: 0.0, acc: 0,
                last_fired: 0, fire_interval: 2,
				max_a: 30, color: 'red',
                type: Q.SPRITE_SHIP, v_frict: 0.01, omega_frict: 0.1,
                collisionMask: Q.SPRITE_ALL,
                points: [[0, -10], [5, 10], [-5, 10]],
                fire: "fire"});
            this.p.health = this.p.max_health;
            //this.add("2d");
            //this.p.color = p.color;
            //this.on("hit.sprite", this, "collision");
        },
        collision: function(collision) {
            console.log("I'm a rocket and I just collided");
            this.p.health--;
            if (this.p.health <= 0) {

                this.destroy();
                Q.master.died(this.p.name);

            }
        },

        step: function(dt) {
			var p = this.p;
			rand = Math.random() > 0.9;
			if(rand){
				console.log(p.x, p.y);
			}
            p.age += dt;
			p.angle = Math.atan2(Q.inputs.mouseY - p.y, Q.inputs.mouseX - p.x) * 60 + 90;
            p.acc = Q.inputs['mouse'] ? p.max_a : 0;
            p.ax = p.acc * Math.sin(p.angle / 360 * 2 * 3.14159653);
            p.ay = -p.acc * Math.cos(p.angle / 360 * 2 * 3.14159653);
			
			p.vx += dt * p.ax;
			p.vy += dt * p.ay;
			p.x += dt * p.vx;
			p.y += dt * p.vy;
			
        }
    });

	Q.VectorSprite.extend("Collectible", {
        init: function(p) {
            this._super(p, {x: 200, y: 200, w: 20, h: 20,
                gravity: 0.0,
                type: Q.SPRITE_ASTEROID,
                collisionMask: Q.SPRITE_ALL,
                points: [[0, 10], [-10, 0], [0, -10], [10, 0]]});
            this.add("2d");
            this.p.color = "white";
            this.on("hit.sprite", this, "collision");
        },
        collision: function(collision) {
           this.destroy();
        },
    });
	
};