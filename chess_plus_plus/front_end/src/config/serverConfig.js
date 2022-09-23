function serverURL(path) {
    const host = process.env.PROXY_URL || 'http://localhost:5001'
    return `${host}${path}`
}

export default serverURL;