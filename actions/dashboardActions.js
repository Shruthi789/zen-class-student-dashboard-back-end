import { client } from '../index.js';

function detailsFind({name}){
    return client.db('studentDB').collection('studentDetails').findOne({name});
}

function detailsInsert(data){
    return client.db('studentDB').collection('studentDetails').insertOne(data);
}

export {detailsFind,detailsInsert};