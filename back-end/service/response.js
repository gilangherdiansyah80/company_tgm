const response = (statusCode, datas, message, res) => {
    res.status(statusCode).json({
        payload: {
            statusCode : statusCode,
            datas: datas,
            message: message,
        }, 
        pagination: {
            prev: '',
            next: '',
            max: ''
        }
    })
}

export default response;