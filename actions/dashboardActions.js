import { client } from '../index.js';

function detailsFind(name){
    return client.db('studentDB').collection('studentDetails').findOne({name});
}

function detailsInsert(data){
    return client.db('studentDB').collection('studentDetails').insertOne(data);
}

function detailsUpdate(id,data){
    return client.db('studentDB').collection('studentDetails').updateOne(id,{$set:data});
}

export {detailsFind,detailsInsert,detailsUpdate};