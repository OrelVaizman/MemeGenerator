'use strict';
var gOnMouseDown = false;
var gCanvas;
var defaultTextsPoses;
var gCtx;
var gKeywords = {
    'happy': 12, 'funny puk': 1
}

var gImgs = [
    {
        id: 1, url: 'imgs/patterns/1.jpg', keywords: ['Donald', 'trump', 'president', 'usa'],
    }, {
        id: 2, url: 'imgs/patterns/2.jpg', keywords: ['dogs', 'puppies', 'cute', 'dog']
    }, {
        id: 3, url: 'imgs/patterns/3.jpg', keywords: ['dog', 'baby', 'cute',]
    }, {
        id: 4, url: 'imgs/patterns/4.jpg', keywords: ['cat', 'chill', 'chilling', 'sleeping']
    }, {
        id: 5, url: 'imgs/patterns/5.jpg', keywords: ['victory', 'baby', 'winning', 'victorius']
    }, {
        id: 6, url: 'imgs/patterns/6.jpg', keywords: ['plan', 'listen-up',]
    }, {
        id: 7, url: 'imgs/patterns/7.jpg', keywords: ['black', 'baby', 'eyes', 'open']
    }, {
        id: 8, url: 'imgs/patterns/8.jpg', keywords: ['magician', 'hat', 'smiling', 'excited']
    }, {
        id: 9, url: 'imgs/patterns/9.jpg', keywords: ['mean', 'baby', 'laugh', 'wicked']
    }, {
        id: 10, url: 'imgs/patterns/10.jpg', keywords: ['black', 'barak', 'obama', 'laugh']
    }, {
        id: 11, url: 'imgs/patterns/11.jpg', keywords: ['gay', 'kissing', 'black',]
    }, {
        id: 12, url: 'imgs/patterns/12.jpg', keywords: ['haim', 'echt', 'What would you do?', 'tazdik']
    }, {
        id: 13, url: 'imgs/patterns/13.jpg', keywords: ['cheers', 'wine', 'leonardo', 'dicaprio']
    }, {
        id: 14, url: 'imgs/patterns/14.jpg', keywords: ['sunglasses', 'black']
    }, {
        id: 15, url: 'imgs/patterns/15.jpg', keywords: ['good', 'good-job']
    }, {
        id: 16, url: 'imgs/patterns/16.jpg', keywords: ['unbeliveable', 'grandpa', 'old']
    }, {
        id: 17, url: 'imgs/patterns/17.jpg', keywords: ['putin', 'russia', 'president']
    }, {
        id: 18, url: 'imgs/patterns/18.jpg', keywords: ['vision', 'one-day']
    },
];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    downloadMode: false,
    lines: [
        {
            txt: 'Enter text here!',
            size: 20,
            font: 'impact',
            color: 'white',
            strokeStyle: 'black',
            x: 170,
            y: 25,
        },
        {
            txt: 'Enter another text here!',
            size: 20,
            font: 'impact',
            color: 'white',
            strokeStyle: 'black',
            x: 170,
            y: 445,
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
    //TOBEUPDATED: validation of -1 of the selectedLine
    if (gMeme.lines.length === 0 || gMeme.selectedLineIdx === -1) return;
    if (action === 'increase') {
        gMeme.lines[gMeme.selectedLineIdx].size++
    } else if (action === 'decrease') {
        gMeme.lines[gMeme.selectedLineIdx].size--
    }
    console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}

function setSelectedLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++;
    } else if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    }
    console.log(gMeme.selectedLineIdx);
}

function moveLine(action) {
    if (gMeme.lines.length === 0) return;
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
        align: 'left',
        font: 'impact',
        color: 'white',
        strokeStyle: 'black',
        x: 250,
        y: 250,
    });

    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteText() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1);
    gMeme.selectedLineIdx = 0;
}

function alignText(action) {
    const selectedLine = gMeme.selectedLineIdx;
    const line = gMeme.lines;
    if (line.length === 0 || line === -1) return;
    if (action === 'right') line[selectedLine].x += 50;
    if (action === 'left') line[selectedLine].x -= 50
    if (action === 'center') return;

}

function setFontFamily(font) {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}
function drawSelectedLineRect() {
    const selectedLine = gMeme.selectedLineIdx
    const line = gMeme.lines[selectedLine]
    if (gMeme.downloadMode === true || selectedLine === -1 || gMeme.lines.length === 0) return;
    const x = line.x;
    const y = line.y;
    const width = +gCtx.measureText(line.txt).width
    const height = line.size * 1.286
    gCtx.strokeRect(x, y, width, -height);
}

function mouseMoveLine(ev) {
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.lines[gMeme.selectedLineIdx].x = ev.offsetX;
    gMeme.lines[gMeme.selectedLineIdx].y = ev.offsetY;
}

function toggleMouseState() {
    gOnMouseDown = !gOnMouseDown;
    setCanvasState();
}

function mouseSelectLine(ev) {
    const { offsetX, offsetY } = ev;
    gMeme.selectedLineIdx = gMeme.lines.findIndex((line) => {
        var width = gCtx.measureText(line.txt).width
        return offsetY > (line.y - line.size) && offsetY < line.y && offsetX > line.x && offsetX < line.x + width;
    })
}

function toggleDownloadMode() {
    gMeme.downloadMode = !gMeme.downloadMode;
}

function getFilteredKeywords(keyword) {
    var filteredKeywords = [];
    gImgs.forEach(img => {
        if (img.keywords.find(word => word.includes(keyword))) {
            filteredKeywords.push(img);
        }
    })
    return filteredKeywords;
}

function setStrokeStyle(strokeStyle) {
    gMeme.lines[gMeme.selectedLineIdx].strokeStyle = strokeStyle;

}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}