'use strict';
var gImg;
var gFont = 'impact';
var gCanvas;
var gCtx;
var gKeywords = {
    'happy': 12, 'funny puk': 1
}
var gImgs = [
    {
        id: 1, url: 'imgs/1.jpg', keywords: ['trump', 'president', 'usa'],
    }, {
        id: 2, url: 'imgs/2.jpg', keywords: ['dogs', 'puppies', 'cute', 'dog']
    }
];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text here!',
            size: 20,
            align: 'left',
            color: 'red',
            font: 'impact',
            x: 250,
            y: 50,
        },
        {
            txt: 'Enter text here!2',
            size: 20,
            align: 'left',
            color: 'red',
            font: 'impact',
            x: 100,
            y: 30,
        }
    ]
}

function getImgByID(id) {
    return gImgs.find((img) => img.id === id)
}

function updateText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    renderMeme();
}

function setSelectedImage(imgid) {
    gMeme.selectedImgId = +imgid;
    renderMeme();
    togglePage();
}

function setFontSize(action) {
    if (action === 'increase') {
        gMeme.lines[gMeme.selectedLineIdx].size++
    } else if (action === 'decrease') {
        gMeme.lines[gMeme.selectedLineIdx].size--
    }
    console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}

function setSelectedLine() {
    if (gMeme.lines.length === 0) {
        return;
    }
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
    console.log(gMeme.selectedLineIdx);
}
function moveLine() {

}