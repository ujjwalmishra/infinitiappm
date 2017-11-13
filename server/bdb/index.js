import request from 'request-promise';
import config from '../../config/config';

function getTransactionByAsset(assetId) {
	
	const options = {
		uri : config.bdbServer + 'transactions?asset_id={' + assetid + '}&operation=TRANSFER',
		json: true
	}

	return request(options);

}



export default {getTransactionByAsset};