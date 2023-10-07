/**
 * TO BE Implemented along with support for json-ld
 */

import credentialsContext from 'credentials-context';

export class ContextManager {
    static getCreds() {
        console.log(credentialsContext);
    }
}

// to support verifiable credentials with json-ld by default use npm package credentials-context
// CONTEXT_URL from this package is CONTEXT_URL: 'https://www.w3.org/2018/credentials/v1',
// contexts from this package is a json object describing verifiable credentials (like temporary file verifiedCredential.json)
// # make sure that the credential schema from the verfiedCredential context matches...

// ToDo:
// ## Function to customize/add the @context property to the verifiable credential
// 1) Customize/add with custom document loader with digitalbazaar/vc
// ## Function that creates the @context definition given a credential type and corresponding credential schema written in JSON
// ## I am not sure how to do this yet....

export const DEFAULT_CONTEXT = 'https://www.w3.org/2018/credentials/v1'
