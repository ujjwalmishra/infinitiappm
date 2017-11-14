import request from 'request-promise';
import config from '../../config/config';
import * as driver from 'bigchaindb-driver';

const conn = new driver.Connection(config.bdbServer);


function getTransactionByAsset(assetId) {
	
	const options = {
		uri : config.bdbServer + 'transactions?asset_id={' + assetid + '}&operation=TRANSFER',
		json: true
	}

	return request(options);

}

function createAsset(signedTransaction) {

	const txid = signedTransaction.id;
	conn.postTransaction(signedTransaction);
	return checkTransactionStatus(txid);

}

function transferAsset(signedTransaction) {

	const txid = signedTransaction.id;
	conn.postTransaction(signedTransaction);
	return checkTransactionStatus(txid);
	
}

function checkTransactionStatus(txid) {

	return conn.pollStatusAndFetchTransaction(txid);

}



export default {getTransactionByAsset, createAsset};