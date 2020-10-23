'use strict';

var gOnMouseDown = false;
var gCanvas;
var gCtx;
var gSavedCanvas = [];
var gKeywords = {
    'funny': 6, 'baby': 4, 'black': 4, 'president': 3, 'movie': 3, 'dogs': 2, 'cute': 2, 'cat': 1, 'chill': 1,
    'cat': 1, 'victory': 1, 'hat': 1, 'happy': 1, 'gay': 1, 'actor': 1, 'usa': 1, 'puppies': 1,
    'sunglasses': 1
}

var gImgs = [
    {
        id: 1, url: 'imgs/patterns/1.jpg', keywords: ['funny', 'president', 'usa']
    }, {
        id: 2, url: 'imgs/patterns/2.jpg', keywords: ['dogs', 'puppies', 'cute']
    }, {
        id: 3, url: 'imgs/patterns/3.jpg', keywords: ['dogs', 'baby', 'cute',]
    }, {
        id: 4, url: 'imgs/patterns/4.jpg', keywords: ['cat', 'chill', 'cute']
    }, {
        id: 5, url: 'imgs/patterns/5.jpg', keywords: ['victory', 'baby']
    }, {
        id: 6, url: 'imgs/patterns/6.jpg', keywords: ['funny']
    }, {
        id: 7, url: 'imgs/patterns/7.jpg', keywords: ['black', 'baby', 'funny']
    }, {
        id: 8, url: 'imgs/patterns/8.jpg', keywords: ['hat', 'happy']
    }, {
        id: 9, url: 'imgs/patterns/9.jpg', keywords: ['baby', 'funny']
    }, {
        id: 10, url: 'imgs/patterns/10.jpg', keywords: ['black', 'president', 'funny']
    }, {
        id: 11, url: 'imgs/patterns/11.jpg', keywords: ['gay', 'black',]
    }, {
        id: 12, url: 'imgs/patterns/12.jpg', keywords: ['movie']
    }, {
        id: 13, url: 'imgs/patterns/13.jpg', keywords: ['actor']
    }, {
        id: 14, url: 'imgs/patterns/14.jpg', keywords: ['sunglasses', 'black']
    }, {
        id: 15, url: 'imgs/patterns/15.jpg', keywords: ['movie']
    }, {
        id: 16, url: 'imgs/patterns/16.jpg', keywords: ['funny']
    }, {
        id: 17, url: 'imgs/patterns/17.jpg', keywords: ['president']
    }, {
        id: 18, url: 'imgs/patterns/18.jpg', keywords: ['movie']
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

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        console.log(3, 'before');
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        gImgs.push({
            id: gImgs.length + 1, url: img.src
        })
        gMeme.selectedImgId = gImgs.length
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function saveImage() {
    const currImg = getImgByID(gMeme.selectedImgId)
    var copiedLines = JSON.parse(JSON.stringify(gMeme.lines))
    var copiedUrl = JSON.parse(JSON.stringify(currImg.url))
    var copiedImg = gCanvas.toDataURL('image/jpeg')
    gSavedCanvas.push({
        url: copiedUrl,
        lines: copiedLines,
        savedMemeImg: copiedImg
    })
    saveToStorage(STORGAGE_KEY, gSavedCanvas);
}

function loadSavedMemes() {
    var loadedMemes = [];
    loadedMemes = loadFromStorage(STORGAGE_KEY)
    if (!loadedMemes) return;
    gSavedCanvas = loadFromStorage(STORGAGE_KEY);
}

function setSavedMeme(savedMemeIdx) {
    console.log(savedMemeIdx)
    const newUrl = gSavedCanvas[savedMemeIdx].url;
    const lines = gSavedCanvas[savedMemeIdx].lines;
    const newId = gImgs.length + 1
    gImgs.push({
        id: newId, url: newUrl
    })
    gMeme.lines = lines;
    gMeme.selectedImgId = newId;
}
