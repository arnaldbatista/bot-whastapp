const request = require('request')

async function urlDownload(url) {
    try {
        const options = {
            url: `https://api.ummy.net/api/convert?url=${url}`,
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: null
        }
        
        const response = await new Promise((resolve, reject) => {
            request(options, (error, res, body) => {
                if (error) {
                    reject(error)
                    console.log(error)
                    return
                } else {
                    try{
                        const contentType = res.headers['content-type']
                        if(contentType.includes('application/json')){
                            const respondeObj = JSON.parse(res.body)
                            if (respondeObj.error) {
                                console.log(respondeObj.error)
                                resolve(`error`)
                                return
                            }
                            resolve(respondeObj)
                        }else{
                            resolve(`API em manuntenção.`)
                            return
                        }
                    }catch(e){
                        console.log(e)
                        resolve(`API em manuntenção.`)
                        return
                    }
                }
            })
        })

        return response
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log(error)
            return "API em manuntenção."
        }
    }
}

// const url = 'https://www.youtube.com/watch?v=HgVkG_WjcOM&list=RDAMVMSYM-RJwSGQ8'
// urlDownload(url)
module.exports =  urlDownload
