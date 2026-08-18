

function addEnterListener(element,callback){
    element.addEventListener('keydown',(e)=>{
        if(e.key === 'Enter'){
            callback()
        }
    })
}

