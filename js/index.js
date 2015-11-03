// Внутренние переменные
var canvas, ctx;
var clockRadius;
var hmc,sc,fc,cfc;
function use() {
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
    use();

    //Внешний круг
    ctx.beginPath();
    ctx.strokeStyle = fc;
    ctx.lineWidth = '60';
    ctx.arc(clockRadius,clockRadius,clockRadius*0.8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    // Внутрений круг
    ctx.beginPath();
    ctx.fillStyle = fc;
    ctx.lineWidth = '30';
    ctx.arc(clockRadius,clockRadius,clockRadius*0.3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    // Вытаскивает текущее время
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours > 12 ? hours - 12 : hours;
    var hour = hours + minutes / 60;
    var minute = minutes + seconds / 60;

    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.beginPath();

    // Циферблат
    ctx.font = '38px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = cfc;
    ctx.textBaseline = 'middle';
    for (var n = 1; n <= 12; n++) {
        var theta = (n-3) * Math.PI * (2 / 12);
        var x = clockRadius * 0.8 * Math.cos(theta);
        var y = clockRadius * 0.8 * Math.sin(theta);
        ctx.fillText(n, x, y);
    }

    // Часовая стрелка
    ctx.save();
    var thetato = (hour - 3) * 2 / 12 * Math.PI ;
    ctx.rotate(thetato);
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(-15, 5);
    ctx.lineTo(clockRadius * 0.5, 1);
    ctx.lineTo(clockRadius * 0.5, -1);
    ctx.fillStyle = hmc;
    ctx.fill();
    ctx.restore();

    // Минутная стрелка
    ctx.save();
    var thet = (minute - 15) * 2 / 60 * Math.PI;
    ctx.rotate(thet);
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.lineTo(-15, 4);
    ctx.lineTo(clockRadius * 0.8, 1);
    ctx.lineTo(clockRadius * 0.8, -1);
    ctx.fillStyle = hmc;
    ctx.fill();
    ctx.restore();

    // Секундная стрелка
    ctx.save();
    var the = (seconds - 15) * 2 / 60 * Math.PI;
    ctx.rotate(the);
    ctx.beginPath();
    ctx.moveTo(-15, -3);
    ctx.lineTo(-15, 3);
    ctx.lineTo(clockRadius * 0.9, 1);
    ctx.lineTo(clockRadius * 0.9, -1);
    ctx.fillStyle = sc;
    ctx.fill();
    ctx.restore();
    ctx.restore();
}
$(function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    clockRadius = canvas.width/2;

    setInterval(drawScene, 1000);
});