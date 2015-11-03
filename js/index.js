var canvas, ctx;
var clockRadius;
var hmc,sc,fc,cfc;

function getcolor(){
    sc = document.getElementById('scolor').value;
    hmc = document.getElementById('hmcolor').value;
    fc = document.getElementById('fcolor').value;
    cfc = document.getElementById('cfcolor').value;
}

function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
        
function drawScene() {
    clear();
    getcolor();
    
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours > 12 ? hours - 12 : hours;
    var hour = hours + minutes / 60;
    var minute = minutes + seconds/60;
    ctx.save();
    
    ctx.translate(clockRadius, clockRadius);
    
    ctx.strokeStyle = fc;
    ctx.lineWidth = '30';
    ctx.beginPath();
    ctx.arc(0,0,clockRadius*0.3, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
 
    ctx.beginPath();
    ctx.strokeStyle = fc;
    ctx.lineWidth = '60';
    ctx.arc(0,0,clockRadius*0.8, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    
    ctx.font = '38px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = cfc;
    ctx.textBaseline = 'middle';
    for (var n = 1; n <= 12; n++) {
        var theta = (n-3) * Math.PI * (2/12);
        var x = clockRadius * 0.8 * Math.cos(theta);
        var y = clockRadius * 0.8 * Math.sin(theta);
        ctx.fillText(n, x, y);
    }
    ctx.save();
    
    var thetato = (hour - 3) * (2/12 * Math.PI);
    ctx.rotate(thetato);
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(-15, 5);
    ctx.lineTo(clockRadius * 0.5, 1);
    ctx.lineTo(clockRadius * 0.5, -1);
    ctx.closePath();
    ctx.fillStyle = hmc;
    ctx.fill();
    ctx.restore();
    
    ctx.save();
    var thet = (minute - 15) * (2/60 * Math.PI);
    ctx.rotate(thet);
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.lineTo(-15, 4);
    ctx.lineTo(clockRadius * 0.8, 1);
    ctx.lineTo(clockRadius * 0.8, -1);
    ctx.closePath();
    ctx.fillStyle = hmc;
    ctx.fill();
    ctx.restore();
 
    ctx.save();
    var the = (seconds - 15) * (2/60 * Math.PI);
    ctx.rotate(the);
    ctx.beginPath();
    ctx.moveTo(-15, -3);
    ctx.lineTo(-15, 3);
    ctx.lineTo(clockRadius * 0.9, 1);
    ctx.lineTo(clockRadius * 0.9, -1);
    ctx.closePath();
    ctx.fillStyle = sc;
    ctx.fill();
    ctx.restore();
    ctx.restore();
}
$(function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    clockRadius = canvas.width/2;
    
    canvas.width = 300;
    canvas.height = 300;

    setInterval(drawScene, 1000);
});