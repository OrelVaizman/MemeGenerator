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
        id: 1, url: 'imgs/1.jpg', keywords: ['donald', 'trump', 'president', 'usa'],
    }, {
        id: 2, url: 'imgs/2.jpg', keywords: ['dogs', 'puppies', 'cute', 'dog']
    }, {
        id: 3, url: 'imgs/3.jpg', keywords: ['dog', 'baby', 'cute',]
    }, {
        id: 4, url: 'imgs/4.jpg', keywords: ['cat', 'chill', 'chilling', 'sleeping']
    }, {
        id: 5, url: 'imgs/5.jpg', keywords: ['victory', 'baby', 'winning', 'victorius']
    }, {
        id: 6, url: 'imgs/6.jpg', keywords: ['plan', 'listen-up',]
    }, {
        id: 7, url: 'imgs/7.jpg', keywords: ['black', 'baby', 'eyes', 'open']
    }, {
        id: 8, url: 'imgs/8.jpg', keywords: ['magician', 'hat', 'smiling', 'excited']
    }, {
        id: 9, url: 'imgs/9.jpg', keywords: ['mean', 'baby', 'laugh', 'wicked']
    }, {
        id: 10, url: 'imgs/10.jpg', keywords: ['black', 'barak', 'obama', 'laugh']
    }, {
        id: 11, url: 'imgs/11.jpg', keywords: ['gay', 'kissing', 'black',]
    }, {
        id: 12, url: 'imgs/12.jpg', keywords: ['haim', 'echt', 'What would you do?', 'tazdik']
    }, {
        id: 13, url: 'imgs/13.jpg', keywords: ['cheers', 'wine', 'leonardo', 'dicaprio']
    }, {
        id: 14, url: 'imgs/14.jpg', keywords: ['sunglasses', 'black']
    }, {
        id: 15, url: 'imgs/15.jpg', keywords: ['good', 'good-job']
    }, {
        id: 16, url: 'imgs/16.jpg', keywords: ['unbeliveable', 'grandpa', 'old']
    }, {
        id: 17, url: 'imgs/17.jpg', keywords: ['putin', 'russia', 'president']
    }, {
        id: 18, url: 'imgs/18.jpg', keywords: ['vision', 'one-day']
    },
];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text here!',
            size: 20,
            align: 'center',
            color: 'red',
            font: 'impact',
            x: 250,
            y: 50,
        },
        {
            txt: 'Enter text here!2',
            size: 20,
            align: 'center',
            color: 'red',
            font: 'impact',
            x: 250,
            y: 430,
        }
    ]
}

function getImgByID(id) {
    return gImgs.find((img) => img.id === id)
}

function updateText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    setCanvasState();
}

function setSelectedImage(imgid) {
    gMeme.selectedImgId = +imgid;
    setCanvasState();
    openMemeGen()
}

function setFontSize(action) {
    if (gMeme.lines.length === 0) return;
    if (action === 'increase') {
        gMeme.lines[gMeme.selectedLineIdx].size++
    } else if (action === 'decrease') {
        gMeme.lines[gMeme.selectedLineIdx].size--
    }
    console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}

function setSelectedLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
    console.log(gMeme.selectedLineIdx);
}
function moveLine(action) {
    if (action === 'down') {
        gMeme.lines[gMeme.selectedLineIdx].y += 10;
    } else if (action === 'up') {
        gMeme.lines[gMeme.selectedLineIdx].y -= 10;
    }
    console.log(gMeme.lines[gMeme.selectedLineIdx].y)
}

function addText() {
    gMeme.lines.push({
        txt: 'Text added',
        size: 20,
        align: 'center',
        color: 'red',
        font: 'impact',
        x: 250,
        y: 250,
    });
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteText() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1);
    gMeme.selectedLineIdx = 0
}

function alignText(action) {
gMeme.lines[gMeme.selectedLineIdx].align = action;
}