function getHostName(websiteURL) {
    var getTheHostName;
    if (websiteURL.indexOf("//") > -1) {
       getTheHostName = websiteURL.split('/')[2];
    } else {
       getTheHostName = websiteURL.split('/')[0];
    }
    getTheHostName = getTheHostName.split(':')[0];
    getTheHostName = getTheHostName.split('?')[0];
    return getTheHostName;
}

module.exports = getHostName;