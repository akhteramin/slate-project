import $ from 'jquery';

const capitalizeFirstLetter = string => {
    return string.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const replaceSpace = string => string.split(' ').join('_');

const getDeviceID = () => {
    const deviceId = JSON.parse(localStorage.getItem('device_id'));
    if (deviceId) {
        return deviceId;
    }

    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let nameOffset, verOffset;

    // In Opera 15+, the true version is after "OPR/"
    if (nAgt.indexOf('OPR/') !== -1) {
        browserName = 'Opera';
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if (nAgt.indexOf('Opera') !== -1) {
        browserName = 'Opera';
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if (nAgt.indexOf('MSIE') !== -1) {
        browserName = 'InternetExplorer';
    }
    // In Chrome, the true version is after "Chrome"
    else if (nAgt.indexOf('Chrome') !== -1) {
        browserName = 'Chrome';
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if (nAgt.indexOf('Safari') !== -1) {
        browserName = 'Safari';
    }
    // In Firefox, the true version is after "Firefox"
    else if (nAgt.indexOf('Firefox') !== -1) {
        browserName = 'Firefox';
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    const guid = `browser-${browserName.toLowerCase()}-${navigator.mimeTypes.length}_${nAgt.replace(/\D+/g, '')}_${navigator.plugins.length}_${$(window).height() || ''}_${$(window).width() || ''}`;
    console.log('Util.getDeviceID(): ', guid);
    localStorage.setItem('device_id', JSON.stringify(guid));
    return guid;
};

const buttonPadding = {
    margin: '10px'
  };
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const failColor ={ background: '#fc4f2a ', text: "#FFFFFF" }
const successColor = { background: '#5ac9b6', text: "#FFFFFF" }


export { capitalizeFirstLetter, replaceSpace, getDeviceID, buttonPadding, customStyles,failColor,successColor };