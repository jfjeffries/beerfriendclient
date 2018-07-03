let APIURL = ''

switch (window.location.hostname){
    case 'localhost':
        APIURL = 'http://localhost:3000';
        APIURL = ''
        break;
    case 'jfjbeerlistclient.herokuapp.com':
        APIURL = 'https://jfj-beerfriend.herokuapp.com'
}

export default APIURL