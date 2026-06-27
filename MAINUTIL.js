function elem(el){
    return document.getElementById(el);
}

function hideElem(el){
    elem(el).style.display = "none"
}

function showElem(el){
    elem(el).style.display = "block"
}

function getStyle(element, style){
    return eval("getComputedStyle(elem(element))."+style)
}

//these are useful for scaling images constantly
function pixelToVh(value) {
    return (100 * value) / window.innerHeight
}

function pixelToVw(value) {
    return (100 * value) / window.innerWidth
}

function vhToPixel(value) {
    return (window.innerHeight * value) / 100
}

function vwToPixel(value) {
    return (window.innerWidth * value) / 100
}

function percantage(x, y){
    return x / 100 * y
}

function random(max){
    return Math.round(Math.random() * max);
}

function removeItem(array, ...itemsToRemove) {
    var i = 0;

    try{
        for(; i<itemsToRemove.length; i++){
            const index = array.indexOf(itemsToRemove[i]);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }
    }
    catch(err){
        console.log("Item does not exist in array: removeItem("+array+", "+itemToRemove+")")
    }
}

let currentAnims = {}
let currentSounds = new Map() //turn this to a map

//for func in playsound and animation, you can use the same ones in addeventlistener

function playSound(elem, sound, level, loop, func, ...parameters){
    if(currentSounds.has(elem))
        return false;

    if(sound == undefined)
        return;

    
    if(loop==true){
        t = new Audio(sound)
        t.id = "hi"
        t.volume = level
        t.play()
        document.body.appendChild(t)
        currentSounds.set(elem, t)
        t.addEventListener('ended', () => {
            if(!currentSounds.has(elem)) return;
            if(func != undefined) func.apply(null, parameters)
            t.pause()
            t.currentTime = 0
            t.play()
        })
    }
    else{
       t = new Audio(sound)
        t.id = elem
        t.volume = level
        t.play()
        document.body.appendChild(t)
        currentSounds.set(elem, t)
        t.addEventListener('ended', () => {
            if(currentSounds.has(elem)){
                currentSounds.get(elem).pause()
                currentSounds.get(elem).remove()
                currentSounds.delete(elem)
                
                if(func != undefined) func.apply(null, parameters)
            }
        });
    }
}

function endSound(elem){
    if(currentSounds.has(elem)){
        currentSounds.get(elem).pause()
        currentSounds.get(elem).remove()
        currentSounds.delete(elem)
    }
}

function animate(elem, asset, loop, func, ...parameters){
    const frame = 24
    const elemtmp = elem

    if(eval("currentAnims."+elemtmp) != undefined){
        eval("clearInterval(currentAnims."+elemtmp+")")
    }

    window[elem] = 0

    switch(loop){
        case false:
            var i=0;
            elem = setInterval(() => {
                document.getElementById(elemtmp).src = asset[i];
                if(i >= asset.length - 1){
                    if(func != undefined) func(parameters)
                    eval("delete currentAnims."+elemtmp)
                    eval("clearInterval(currentAnims."+elemtmp+")")
                }
                else
                    i++
            }, frame);
            break;
        case true:
            var i=0;
            elem = setInterval(() => {
                document.getElementById(elemtmp).src = asset[i];
                if(func != undefined) func(parameters)
                if(i >= asset.length - 1){
                    i=0
                }
                else
                    i++
            }, frame);
    }

    currentAnims[elemtmp] = elem

    return true;
}

function stirinText(el, text, speed){
    var interval = (speed*1000) / text.length 
    var i=0
    var t = setInterval(() => {
       elem(el).innerText = text.slice(0, i) + "#"
       i++
       if(i > text.length){clearInterval(t); elem(el).innerText = text}
    }, interval);
}
