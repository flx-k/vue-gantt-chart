function createCanvas(boxId,id, Id1, Id2) {
    var d1 = document.getElementById(Id1)
    var d2 = document.getElementById(Id2)
    let fx, fy, tx, ty;
    fx = parseInt(d1.style.left) + parseInt(d1.style.width);
    fy = parseInt(d1.style.top) + parseInt(d1.style.height) / 2;
    tx = parseInt(d2.style.left);
    ty = parseInt(d2.style.top) + parseInt(d2.style.height) / 2;
    _createCanvas(boxId,id, fx, fy, tx, ty)
}

function _createCanvas(boxId,id, fx, fy, tx, ty) {
    var canvasList = document.getElementById(boxId);
    var canvas = document.createElement('canvas');
    canvas.id = id;
    canvasList.appendChild(canvas);
    canvas.width = tx - fx + 10; //☜
    canvas.height = ty - fy;
    canvas.style.position = 'absolute';
    canvas.style.top = fy - 5 + 'px';
    canvas.style.left = fx - 5 + 'px';
}

function drawLine(id, Id1, Id2) {
    var d1 = document.getElementById(Id1)
    var d2 = document.getElementById(Id2)
    let fx, fy, tx, ty;
    fx = parseInt(d1.style.left) + parseInt(d1.style.width);
    fy = parseInt(d1.style.top) + parseInt(d1.style.height) / 2;
    tx = parseInt(d2.style.left);
    ty = parseInt(d2.style.top) + parseInt(d2.style.height) / 2;
    _drawLine(id, fx, fy, tx, ty)
}

function _drawLine(id, fx, fy, tx, ty) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    if (fx < tx) {
        c.style.left = fx - 5 + 'px';
        c.style.top = fy - 5 + 'px';
        c.width = tx - fx + 10;
        c.height = ty - fy + 10;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.moveTo(5, 5);
        ctx.lineTo(c.width/2, 5);
        ctx.lineTo(c.width/2, c.height - 5);
        ctx.lineTo(c.width - 5, c.height - 5);
    } else {
        c.style.left = tx - 5 + 'px';
        c.style.top = fy - 5 + 'px';
        c.width = fx - tx + 10;
        c.height = ty - fy + 10;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.moveTo(5, c.height - 5);
        
        ctx.lineTo(c.width/2, c.height - 5);
        
        ctx.lineTo(c.width/2, 5);

        ctx.lineTo(c.width - 5, 5);
    }
    ctx.stroke()
    ctx.closePath();
}
function repaint(arr, id) {
    arr.forEach(element => {
        if (element.indexOf(id) >= 0) {
            let ids=element.split('_')
            drawLine(element, ids[0], ids[1])
        }
    });

}
export{
    drawLine,createCanvas,repaint
}