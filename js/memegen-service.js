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
            color: 'red'
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