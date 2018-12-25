const actionMap = {
    EXECUTE: 'Matched',
    SKIP: 'Skipped'
};

const statusMap = {
    102: {
        name: 'IN PROGRESS',
        icon: 'time',
        color: 'warning'
    },
    200: {
        name: 'DONE',
        icon: 'ok-circle',
        color: 'success'
    }
};

const categoryContainer = [
    {value: 'SUCCESSFUL', style: 'success'},
    {value: 'REVERTED', style: 'info'},
    {value: 'FAILED', style: 'danger'}
];

console.log("hostname:: ",window.location.hostname);
const API = {
    typicode: 'https://jsonplaceholder.typicode.com',
    bizz: '',
    central_auth:''
    };
// const APPLICATION_ID = 10; //TEST
let APPLICATION_ID = 7; //DEV
let imageBaseURL = 'https://dev.ipay.com.bd'
// const APPLICATION_ID = 11; //Live


export {APPLICATION_ID, actionMap, statusMap, categoryContainer, API, imageBaseURL};