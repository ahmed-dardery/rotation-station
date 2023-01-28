class Graphics {
    canvas;
    ctx;

    adjustment = 0.92;

    boardSize = {
        width: 3,
        height: 3
    }

    state = {

    }
    constructor() {
        this.canvas = document.getElementById("game-area");
        this.ctx = this.canvas.getContext("2d");

        this.ctx.lineWidth = 8;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCircle(cx, cy, r, startAngle=0, endAngle = 2*Math.PI) {
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, startAngle, endAngle);
        this.ctx.save();
        this.ctx.clip();
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawCell(x, y, r, openTop, openLeft, openBottom, openRight) {
        const ratio = Math.sqrt(2) / 2 ;
        const dist = Math.sqrt(2);
        r *= this.adjustment;

        this.ctx.save();
        this.ctx.translate(x,y);

        this.ctx.beginPath();
        this.ctx.moveTo(-ratio*r, -ratio*r);

        if(openTop) {
            this.ctx.arcTo(0,0,ratio*r, -ratio*r, r);
        } else{
            this.ctx.arcTo(0,-dist*r,ratio*r, -ratio*r, r);
        }
        if(openRight){
            this.ctx.arcTo(0,0,ratio*r, ratio*r, r);
        } else{
            this.ctx.arcTo(dist*r,0,ratio*r, ratio*r, r);
        }
        if(openBottom){
            this.ctx.arcTo(0,0,-ratio*r, ratio*r, r);
        } else{
            this.ctx.arcTo(0,dist*r,-ratio*r, ratio*r, r);
        }
        if(openLeft){
            this.ctx.arcTo(0,0,-ratio*r, -ratio*r, r);
        } else{
            this.ctx.arcTo(-dist*r,0,-ratio*r, -ratio*r, r);
        }

        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.stroke();

        if (this.isFlatCell(openTop, openLeft, openBottom, openRight)){
            if(openRight) {
                this.drawCircle(1.5 * r, 0, 1.5 * r);
                this.drawCircle(-1.5 * r, 0, 1.5 * r);
            } else{
                this.drawCircle(0,1.5 * r,  1.5 * r);
                this.drawCircle(0,-1.5 * r,  1.5 * r);
            }
        } else if (this.isThreeWayCell(openTop, openLeft, openBottom, openRight)){
            this.drawCircle(0, 0, 0.66 * r);

            if(!openBottom) {
                this.drawCircle(0, -0.5 * r, 0.66 * r);
            } else if(!openTop) {
                this.drawCircle(0, 0.5 * r, 0.66 * r);
            } else if(!openRight) {
                this.drawCircle(0.5 * r, 0, 0.66 * r);
            } else {
                this.drawCircle(-0.5 * r, 0, 0.66 * r);
            }
        } else{
            this.drawCircle(0,0,0.66*r);
            this.drawCircle(0,0,0.33*r);
        }

        this.ctx.restore();
    }

    drawPiece(x, y, r, dir) {
        r *= this.adjustment;

        const ratio = Math.sqrt(2) / 2;
        this.ctx.save();
        this.ctx.translate(x, y);

        if(dir === 'h') {
            this.ctx.rotate(Math.PI/2);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(0, -ratio*r);
        this.ctx.arcTo(-ratio*r, 0, 0, ratio*r, r);
        this.ctx.arcTo(ratio*r, 0, 0, -ratio*r, r);

        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.stroke();

        this.ctx.restore();
    }

    isFlatCell(openTop, openLeft, openBottom, openRight){
        return openTop === openBottom && openLeft === openRight && openLeft!== openTop;
    }

    isThreeWayCell(openTop, openLeft, openBottom, openRight){
        return openTop + openLeft + openBottom + openRight === 3;
    }
}

class Game {

    constructor() {
        this.g = new Graphics();
    }



    init() {
        const r = 100;
        this.g.ctx.translate(r, r);

        const d = Math.sqrt(2) * r;

        this.g.drawCell(0, 0, r, false, false, false, true);
        this.g.drawCell(d, 0, r, false, true, true, true);
        this.g.drawCell(2*d, 0, r, false, true, false, true);
        this.g.drawCell(3*d, 0, r, false, true, true, false);

        this.g.drawCell(0, d, r, true, true, true, true);
        this.g.drawCell(d, d, r, false, false, false, false);
        this.g.drawCell(2*d, d, r, true, true, false, true);
        this.g.drawCell(3*d, d, r, true, false, true, false);

        this.g.ctx.strokeStyle='red';
        this.g.drawPiece(1.5*d, 0, r);
        this.g.ctx.strokeStyle='blue';

        this.g.drawPiece(3*d, 0.5*d, r, 'h');
    }
}

new Game().init();

