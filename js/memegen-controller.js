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
        drawTexts()
    }
}

function drawTexts() {
    console.log('Wired')
    gMeme.lines.forEach((line) => {
        gCtx.strokeStyle = 'red'
        gCtx.fillStyle = 'white'
        gCtx.lineWidth = '2'
        gCtx.font = `${line.size}px ` + line.font
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
    })
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
    renderMeme();
}

function onSwitchLines() {
    setSelectedLine();
    updateTextInput();
}

function onMoveLine() {
    moveLine();
}

function updateTextInput() {
    document.querySelector('.text-input').value = gMeme.lines[gMeme.selectedLineIdx].txt
}