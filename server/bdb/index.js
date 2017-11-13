import request from 'request-promise';
import config from '../../config/config';
import * as driver from 'bigchaindb-driver';

const conn = new driver.Connection(config.bdbServer);

console.log(conn);

function getTransactionByAsset(assetId) {
	
	const options = {
		uri : config.bdbServer + 'transactions?asset_id={' + assetid + '}&operation=TRANSFER',
		json: true
	}

	return request(options);

}

function createAsset(signedTransaction) {

	return conn.postTransaction(signedTransaction);

}



export default {getTransactionByAsset, createAsset};