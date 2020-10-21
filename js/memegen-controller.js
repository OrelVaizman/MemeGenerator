'use strict';

function init() {
    gCanvas = document.querySelector('#memegen-canvas');
    gCtx = gCanvas.getContext('2d');
    // console.log('The context:', gCtx);
    renderMeme();
    addEventListener();
}

function renderMeme() {
    var selectedImg = getImgByID(gMeme.selectedImgId);
    var img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText()
    }
}

function drawText() {
    var x = 250;
    var y = 50;
    var text = gMeme.lines[0].txt;
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = '48px ' + gFont
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function addEventListener() {
    var text = document.querySelector('.text-input');
    text.addEventListener('keyup', (ev) => {
        ev.preventDefault();
        onTextChange();
    });
}

function onTextChange() {
    var text = document.querySelector('.text-input').value;
    updateText(text);
}