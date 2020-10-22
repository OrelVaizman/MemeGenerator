'use strict';

function init() {
    gCanvas = document.querySelector('#memegen-canvas');
    gCtx = gCanvas.getContext('2d');
    // console.log('The context:', gCtx);
    renderGallery();
    addEventListener();
}

function setCanvasState() {
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
    console.log(elGallery)
    var strHTML = gImgs.map((img) => {
        return `<img src="${img.url}" id="${img.id}" class="gallery-item" onclick="onImageSelect(this.id)">`
    })
    elGallery.innerHTML = strHTML.join('');
}


function onImageSelect(imgid) {
    setSelectedImage(imgid);
}

function openMemeGen() {
    //Currently not toggle, TOBEUPDATED
    var elGallery = document.querySelector('.gallery-container');
    var elMemeGen = document.querySelector('.meme-display-container');
    elGallery.style.display = ('none');
    elMemeGen.style.display = ('flex')
}

function onSetFontSize(action) {
    setFontSize(action);
    setCanvasState();
}

function onSwitchLines() {
    setSelectedLine();
    updateTextInput();
}

function onMoveLine(action) {
    //TOBECHANGED
    // if (gMeme.lines[gMeme.selectedLineIdx].y >= gCanvas.height) {
    //     gMeme.lines[gMeme.selectedLineIdx].y === gCanvas.height - 5;
    // } else if (gMeme.lines[gMeme.selectedLineIdx].y <= 0) {
    //     gMeme.lines[gMeme.selectedLineIdx].y === 5;
    // }
    moveLine(action);
    setCanvasState();
}

function updateTextInput() {
    document.querySelector('.text-input').value = gMeme.lines[gMeme.selectedLineIdx].txt
}