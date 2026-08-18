const fs = require('fs').promises
const path = require('path')

const dir = "C:/Users/armando.tammaro_kine/Desktop/note"
async function listFiles(){
    try{
        const files = await fs.readdir(dir)
        return files
    } catch(error){
        console.error(error)
        return []
    }
}

async function readFile(filename){
    const fullpath = path.join(dir,filename)
    try{
        const file = await fs.readFile(fullpath,'utf8')
        return file
    }catch(error){
        console.error(error)
        return null
    }
}
module.exports = {listFiles,readFile}

/*                 test                   */
/*
async function main(){
    const files = await listFiles()
    const file = await readFile(files[1])
    console.log(file)
}
main()
*/