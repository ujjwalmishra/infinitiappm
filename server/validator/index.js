import request from 'request-promise';
import config from '../../config/config';

function validateAssetSSN(assetId) {
    const options = {
        uri : config.validatorServer + '/ssn/validation/'+ assetId,
        json : true
    }

    return request(options);

}

export default {validateAssetSSN};