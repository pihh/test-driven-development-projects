function transformResponse(data = {},success=true){
    return {
        success,
        data
    }
}
module.exports = {
    transformResponse
}