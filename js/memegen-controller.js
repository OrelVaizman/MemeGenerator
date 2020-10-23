'use strict';

function init() {
    gCanvas = document.querySelector('#memegen-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    addEventListeners();
}

function setCanvasState() {
    const selectedImg = getImgByID(gMeme.selectedImgId);
    // console.log(selectedImg)
    const img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawTexts();
        drawSelectedLineRect();
    }
}

function drawTexts() {
    gMeme.lines.forEach((line) => {
        gCtx.strokeStyle = line.strokeStyle
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px ` + line.font
        gCtx.textAlign = 'left'
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
    })
}

function onTextChange() {
    var text = document.querySelector('.text-input').value;
    updateText(text);
}

function renderGallery(imgs = gImgs) {
    var elGallery = document.querySelector('.gallery-container');
    var strHTML = imgs.map((img) => {
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


function addEventListeners() {
    var text = document.querySelector('.text-input');
    text.addEventListener('keyup', (ev) => {
        onTextChange();
    });
    gCanvas.addEventListener('mousedown', (ev) => {
        onMouseSelectLine(ev);
    });
    gCanvas.addEventListener('mouseup', (ev) => {
        toggleMouseState();
    });
    gCanvas.addEventListener('mousemove', (ev) => {
        onMouseMoveLine(ev);
    });

    var search = document.querySelector('#search');
    search.addEventListener('keyup', (ev) => {
        // console.log(search.value);
        onSearchKeywords(search.value);
    })
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

function onDownloadImg(elDownload) {
    toggleDownloadMode();
    setCanvasState();
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elDownload.href = imgContent;
    // toggleDownloadMode();
}

function onSearchKeywords(keyword) {
    renderGallery(getFilteredKeywords(keyword));
}

function onSetStrokeStyle(strokeStyle) {
    setStrokeStyle(strokeStyle);
    setCanvasState();
}
function onSetColor(color) {
    setColor(color);
    setCanvasState();
}