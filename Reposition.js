/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
;
Quintus.Reposition = function(Q) {
    Q.component("reposition", {
        added: function() {

            this.entity.on("step", this, "step");
        },
        step: function(dt) {

            var p = this.entity.p;
            var maxSide = Math.sqrt(p.h * p.h + p.w + p.w);
            maxSide = 0;
            if (p.x > Q.width + maxSide) {
                p.x -= Q.width + maxSide
            }
            if (p.x < -maxSide) {
                p.x += Q.width + maxSide
            }

            if (p.y > Q.height + maxSide) {
                p.y -= Q.height + maxSide
            }
            if (p.y < -maxSide) {
                p.y += Q.height + maxSide
            }
        }

    });

    Q.component("float", {
        added: function() {

            this.entity.on("step", this, "step");
        },
        step: function(dt) {
            var p = this.entity.p;
            if (p.no_inertia) {
                p.omega = p.epsilon;
                p.vx = p.ax;
                p.vy = p.ay;
            } else {
                p.omega += p.epsilon * dt - p.omega_frict * p.omega * dt;
                p.vx += p.ax * dt - p.v_frict * p.vx * dt;
                p.vy += p.ay * dt - p.v_frict * p.vy * dt;
            }
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            p.angle += p.omega * dt;
        }
    });
};