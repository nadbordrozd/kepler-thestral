;
Quintus.MySprites = function(Q) {
    Q.SPRITE_NONE = 0;
    Q.SPRITE_SHIP = 1;
    Q.SPRITE_BULLET = 2;
    Q.SPRITE_ASTEROID = 4;
    Q.SPRITE_ALL = 7;


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
    Q.VectorSprite.extend("Rocket", {
        init: function(p) {
            this._super(p, {x: 500, y: 200, w: 80, h: 250, vx: 0, vy: 0,
                gravity: 0.0, acc: 0, omega: 0, epsilon: 0, age: 0,
                last_fired: 0, fire_interval: 2,
                max_epsilon: 300, max_a: 25,
                type: Q.SPRITE_SHIP, v_frict: 0.01, omega_frict: 0.1,
                collisionMask: Q.SPRITE_ALL,
                points: [[0, -10], [5, 10], [-5, 10]],
                left: "left2", right: "right2", up: "up2", down: "down2",
                nothing: "text in rocket",
                fire: "fire", max_health: 1});
            this.p.health = this.p.max_health;
            this.add("2d, reposition");
            this.p.color = p.color || Q.PLAYERS[p.name].color;
            Q.input.on(this.p.fire, this, "fireWeapon");
            this.on("hit.sprite", this, "collision");
        },
        collision: function(collision) {
            console.log("I'm a rocket and I just collided");
            this.p.health--;
            if (this.p.health <= 0) {

                this.destroy();
                Q.master.died(this.p.name);

            }
        },
        fireWeapon: function() {
            var p = this.p;
            if (p.age - p.last_fired < p.fire_interval)
                return;
            p.last_fired = p.age;
            var v = 300;
            var d =35;
            var sin = Math.sin(p.angle / 360 * 2 * 3.14159653);
            var mcos = -Math.cos(p.angle / 360 * 2 * 3.14159653);
            this.stage.insert(new Q.Bullet({
                x: p.x + d * sin,
                y: p.y + d * mcos,
                vx: p.vx + v * sin,
                vy: p.vy + v * mcos,
                color: p.color,
                angle: p.angle}));
        },
        step: function(dt) {
			var p = this.p;
            p.age += dt;
            p.acc = Q.inputs[p.up] ? p.max_a : (Q.inputs[p.down] ? -p.max_a : 0);
	
            p.epsilon = Q.inputs[p.right] ? p.max_epsilon : (Q.inputs[p.left] ? -p.max_epsilon : 0);
            p.ax = p.acc * Math.sin(p.angle / 360 * 2 * 3.14159653);
            p.ay = -p.acc * Math.cos(p.angle / 360 * 2 * 3.14159653);
			
			p.vx += dt * p.ax;
			p.vy += dt * p.ay;
			p.x += dt * p.vx;
			p.y += dt * p.vy;
			p.omega += dt * p.epsilon;
			p.angle += dt * p.omega;
        }
    });
	
	Q.Rocket.extend("PointAndClickRocket", {
        step: function(dt) {
			var p = this.p;

            p.age += dt;
			p.angle = Math.atan2(Q.inputs.mouseY - p.y, Q.inputs.mouseX - p.x) * 60 + 90;
            p.acc = Q.inputs[p.up] ? p.max_a : (Q.inputs[p.down] ? -p.max_a : 0);
            p.ax = p.acc * Math.sin(p.angle / 360 * 2 * 3.14159653);
            p.ay = -p.acc * Math.cos(p.angle / 360 * 2 * 3.14159653);
			
			p.vx += dt * p.ax;
			p.vy += dt * p.ay;
			p.x += dt * p.vx;
			p.y += dt * p.vy;
			
        }
	});

    Q.Sprite.extend("Bullet", {
        init: function(p) {
            this._super(p, {x: 500, y: 200, w: 20, h: 20, vx: 0, vy: 0,
                gravity: 0.0, acc: 0, omega: 0,
                lifetime: 1.3,
                epsilon: 0,
                type: Q.SPRITE_BULLET,
                collisionMask: Q.SPRITE_ALL});
            this.add("2d, reposition");
            this.p.collo = "#00FF00";
            this.on("hit.sprite", this, "hit");
        },
        hit: function(collision) {
            this.destroy();
        },
        draw: function(ctx) {
            ctx.fillStyle = this.p.color;
            ctx.fillRect(-this.p.cx-1, -this.p.cy-1, this.p.w+2, this.p.h+2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
        },
        step: function(dt) {
            var p = this.p;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.lifetime -= dt;
            if (p.lifetime < 0)
                this.destroy();
        }
    });

    Q.Sprite.extend("Missile", {
        init: function(p) {
            this._super(p, {x: 500, y: 200, w: 2, h: 2, vx: 0, vy: 0,
                gravity: 0.0, acc: 0, omega: 0,
                lifetime: 10.3,
                activation_time: 0.5,
                epsilon: 0,
                type: Q.SPRITE_BULLET,
                collisionMask: Q.SPRITE_ALL});
            this.add("2d, reposition");
            this.p.collo = "#00FF00";
            this.on("hit.sprite", this, "hit");
        },
        hit: function(collision) {
            this.destroy();
        },
        draw: function(ctx) {
            ctx.fillStyle = this.p.color;
            ctx.fillRect(-this.p.cx-1, -this.p.cy-1, this.p.w+2, this.p.h+2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
        },
        step: function(dt) {
            var p = this.p;
            if(p.lifetime>p.activation){
                //[x,y]
                var target = this.find_nearest_rocket_vector();
//                p.vx = 
            }
            
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.lifetime -= dt;
            if (p.lifetime < 0)
                this.destroy();
        }
    });

    Q.Sprite.extend("LargeRock", {
        init: function(p) {
            this._super(p, {asset: "coil.png",
                type: Q.SPRITE_ASTEROID,
                collisionMask: Q.SPRITE_SHIP ^ Q.SPRITE_BULLET,
                scale: 0.5,
                omega: 1, epsilon: 0, omega_frict: 0, v_frict: 0, acc: 0});
            this.add("2d, reposition, float");
            this.on("hit.sprite", this, "hit");
            var v = 20;
            this.p.vx = (Math.random()-0.5) * v;
            this.p.vy=  (Math.random()-0.5) * v;

        },
        hit: function(collision) {
            var p = this.p;
            var fi = Math.PI * Math.random();
            var vr = 40;
            var r = 100;
            var n = 3;
            var delta = Math.PI * 2 / n;
            var stage = this.stage;
             this.destroy();
            for (var i = 0; i < n; i++) {
                var x = p.x + Math.cos(fi + i * delta) * r;
                var y = p.y + Math.sin(fi + i * delta) * r;
                var vx = p.vx + Math.cos(fi + i * delta) * vr;
                var vy = p.vy + Math.sin(fi + i * delta) * vr;
                stage.insert(new Q.MediumRock({x: x, y: y, vx: vx, vy: vy, omega: (Math.random() - 0.5) * 100 + p.omega}));
            }
           

        }
    });


    Q.Sprite.extend("MediumRock", {
        init: function(p) {
            this._super(p, {asset: "wall-e.png",
                type: Q.SPRITE_ASTEROID, scale: 0.5, 
                collisionMask: Q.SPRITE_SHIP ^ Q.SPRITE_BULLET,
                omega: 1, epsilon: 0, omega_frict: 0, v_frict: 0, acc: 0});
            this.add("2d, reposition, float");
            this.on("hit.sprite", this, "hit");
        },
        hit: function(collision) {
            var p = this.p;
            var fi = Math.PI * Math.random();
            var vr = 80;
            var r = 100;
            var n = 4;
            var delta = Math.PI * 2 / n;
            var stage = this.stage;
            for (var i = 0; i < n; i++) {
                var x = p.x + Math.cos(fi + i * delta) * r;
                var y = p.y + Math.sin(fi + i * delta) * r;
                var vx = p.vx + Math.cos(fi + i * delta) * vr;
                var vy = p.vy + Math.sin(fi + i * delta) * vr;
                stage.insert(new Q.LittleRock({x: x, y: y, vx: vx, vy: vy, omega: (Math.random() - 0.5) * 100 + p.omega}));
            }
            this.destroy();
        }
    });

    Q.Sprite.extend("LittleRock", {
        init: function(p) {
            this._super(p, {asset: "wheatley.png", scale: 0.2, omega_frict: 0,
                epsilon: 0, v_frict: 0, type: Q.SPRITE_ASTEROID,
                collisionMask: Q.SPRITE_SHIP ^ Q.SPRITE_BULLET});
            this.on("hit.sprite", this, "hit");
            this.add("2d, reposition");
        },
        hit: function(collision) {
            this.destroy();
        }
    });


    Q.UI.Container.extend("HUD", {
        init: function(p) {
            var that = this;
            this._super(p, {x: 50, y: 60, width: 100, height: 100, fill: "rgba(255, 255,0,100)"});
            Q.state.on("change.scores", this, "update_scores");
        },
        display_me: function() {
            var players = Q.state.get("players");
            this.scores = {};
            var offset = 0;
            for (var i in players) {
                var p = players[i];
                var tex = new Q.UI.Text({x: offset, label: "0", width: 10, height: 10, fill: "#FFFFFF", color: p.color});
                this.scores[p.name] = tex;
                this.insert(tex);
                offset += 20;
            }
            this.update_scores();
        },
        update_scores: function() {
            console.log("updating scores");
            var players = Q.state.get("players");
            for (var i in players) {
                var pla = players[i];
                this.scores[pla.name].p.label = pla.score + "";
            }
            ;
        }
    });


    Q.UI.Button.extend("TogglePlayerButton", {
        init: function(p) {
            this._super(p);
            this.on("click", this, "click");
            this.update_display();
        },
        click: function() {
            if (this.p.is_on) {
            } else {
                Q.state.add_player(this.p.name);
            }
            this.p.is_on = !this.p.is_on;
            this.update_display();
        },
        update_display: function() {
            if (this.p.is_on) {
                this.p.fill = this.p.on_color;
            } else {
                this.p.fill = this.p.off_color;
            }
        }
    });

    Q.Sprite.extend("Explosion", {
        init: function(p) {
            this._super(p, {x: 100, y: 100, w: 5, h: 5, vx: 0, vy: 0, maxr: 50, scale: 1, gravity: 0});
            var that = this;

            this.on("hit", function(collision) {

                if (collision.obj.isA("Question") && collision.obj.p.collisionMask) {
                    collision.obj.explode();
                }
            });
        },
        step: function(dt) {
            this.p.scale += 120 * dt;
            if (this.p.scale > this.p.maxr) {
                this.destroy();
            }
        },
        draw: function(ctx) {
            ctx.fillStyle = "Red";
            ctx.fillRect(-1,
                    -1,
                    2,
                    2);
        }
    });





};