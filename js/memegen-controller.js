'use strict';

function init() {
    gCanvas = document.querySelector('#memegen-canvas');
    gCtx = gCanvas.getContext('2d');
    defaultTextsPoses = [
        { x: (gCanvas.width / 2), y: (gCanvas.height / 2) }
    ];
    renderGallery();
    addEventListeners();
}

function setCanvasState() {
    var selectedImg = getImgByID(gMeme.selectedImgId);
    // console.log(selectedImg)
    var img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawTexts();
        drawSelectedLineRect();
        gImgContent = gCanvas.toDataURL('image/jpeg');
    }
}

function drawTexts() {
    console.log('Wired')
    gMeme.lines.forEach((line) => {
        // console.log('before creating', 'text:', line.txt, gCtx.measureText(line.txt))
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = 'white'
        // gCtx.lineWidth = '2'
        gCtx.font = `${line.size}px ` + line.font
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        line.width = gCtx.measureText(line.txt);
    })
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
    setCanvasState();
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
    if (gMeme.lines.length === 0) return;
    document.querySelector('.text-input').value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onAddText() {
    addText();
    setCanvasState();
    updateTextInput();
}

function onDeleteText() {
    deleteText();
    setCanvasState();
    updateTextInput();
}

function onAlignText(action) {
    alignText(action);
    setCanvasState();
}

//TOBEUPDATED UI: Font selector value will have the font family set on its value
function onChangingFont(font) {
    setFontFamily(font);
    setCanvasState();
}

// function drawRect() {
//     gCtx.beginPath();
//     gCtx.rect(61.93359375, 62.533203125, 123.8671875, 100);
//     gCtx.stroke();
// }

function addEventListeners() {
    var text = document.querySelector('.text-input');
    text.addEventListener('keyup', (ev) => {
        ev.preventDefault();
        onTextChange();
    });
    gCanvas.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        onMouseSelectLine(ev);
    });
    gCanvas.addEventListener('mouseup', (ev) => {
        ev.preventDefault();
        // ev.stopPropagation();
        toggleMouseState();
    });
    gCanvas.addEventListener('mousemove', (ev) => {
        ev.preventDefault();
        // ev.stopPropagation();
        onMouseMoveLine(ev);
    });
}
function onMouseMoveLine(ev) {
    if (gOnMouseDown) {
        mouseMoveLine(ev);
        setCanvasState();
    }
}

function onMouseSelectLine(ev) {
    toggleMouseState();
    mouseSelectLine(ev);
    setCanvasState();
}
function onDownloadImg() {
    toggleDownloadMode()
    setCanvasState();
    elDownload.href = gImgContent;
    toggleDownloadMode();
}

