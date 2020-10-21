'use strict';

function init() {
    gCanvas = document.querySelector('#memegen-canvas');
    gCtx = gCanvas.getContext('2d');
    // console.log('The context:', gCtx);
    renderGallery();
    addEventListener();
}

function renderMeme() {
    var selectedImg = getImgByID(gMeme.selectedImgId);
    // console.log(selectedImg)
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
    var text = gMeme.lines[gMeme.selectedLineIdx].txt;
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
        // ev.preventDefault();
        onTextChange();
    });
}

function onTextChange() {
    var text = document.querySelector('.text-input').value;
    updateText(text);
}
function renderGallery() {
    var elGallery = document.querySelector('.gallery-container');
    var strHTML = gImgs.map((img) => {
        return `<img src="${img.url}" id="${img.id}" onclick="onImageSelect(this.id)">`
    })
    elGallery.innerHTML = strHTML.join('');
}


function onImageSelect(imgid) {
    setSelectedImage(imgid);
}

function togglePage() {
    //Currently not toggle, TOBEUPDATED
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = ('none');
}

function onSetFontSize(action) {
    setFontSize(action);
}

function onSwitchLines() {
    setSelectedLine()
}

function onMoveLine() {
    moveLine();
}