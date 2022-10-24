function serverURL(path) {
    const host = process.env.PROXY_URL || 'http://localhost:5001'
    if (typeof path === 'undefined') {
        return host;
    }
    return `${host}${path}`
}

export default serverURL;