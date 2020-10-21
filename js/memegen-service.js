'use strict';

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
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}
var gFont = 'ariel';

function init() {
    gCanvas = document.querySelector('#memegen-canvas');
    gCtx = gCanvas.getContext('2d');
    // console.log('The context:', gCtx);
    setImgOnCanvas(1)
}


function setImgOnCanvas(imgID) {
    var selectedImg = getImgByID(imgID)
    var img = new Image()
    img.src = selectedImg.url
    // console.log(img.src)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText(gMeme.lines[0].txt, 234, 24);
    }

}

function getImgByID(id) {
    return gImgs.find((img) => img.id === id)
}

function drawText(text, x, y) {
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = '48px ' + gFont
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
