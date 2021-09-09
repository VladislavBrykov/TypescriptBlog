import {schema} from "./incoming.data.validator";
import functionHelpers from "../Service/Users/utils/search.user.service";

// async function validator(req, res, nex): Promise<any> {
//     return (req, res, next) => {
//     const incomingDataValid = await validationSchema.validate(req[targetValue]);
    
//     if (incomingDataValid.error) {
//         return res.status(401).json({error: incomingDataValid.error.details});
//     }

//     next();
//     }
// }


async function limitedCheckFactorWithoutToken(req, res, next) {
    const incomingDataValid = await schema.validate(req.body);
    if (incomingDataValid.error) {
        return res.status(401).json({error: incomingDataValid.error.details});
    }
    next();
}

async function limitedCheckFactorWithToken(req, res, next) {
    console.log("---------", req.body);
    
    const incomingDataValid = await schema.validate(req.body);
    console.log("--------", incomingDataValid);
    
    if (incomingDataValid.error) {
        return res.status(401).json({error: incomingDataValid.error.details});
    }
    if (await functionHelpers.searchUserService(req.headers.authorization) === false) {
        return res.status(403).json({error: 'not enough rights'});
    }
    next();

}

const limitedCheckFactor = {
    // validator,
    limitedCheckFactorWithoutToken,
    limitedCheckFactorWithToken,
}

export default limitedCheckFactor
