import { ObjectID } from 'bson';
import { client } from '../index.js';

function detailsFind({name}){
    return client.db('studentDB').collection('studentDetails').findOne({name});
}