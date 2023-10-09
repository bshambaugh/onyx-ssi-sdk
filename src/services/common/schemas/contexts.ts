/**
 * TO BE Implemented along with support for json-ld
 */

/*
Functionality to Implement

    Function to customize/add to the @context property of the Verifiable Credential ..  can be URLs, but actually anything specified by JSON-LD
    Function that creates the @context definition given a Credential Type and corresponding Credential Schema written in JSON
    Optional functionality includes providing the ability to sign the JSON-LD VC with a Linked Data Proof type.
*/

//import credentialsContext from 'credentials-context';
//import * as credentialsContext from 'credentials-context';
const credentialsContext = require('credentials-context');
// https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam/42505940#42505940
const jsonld = require('jsonld');
//const vc = require("@digitalbazaar/vc");
const jldsigntures = require('jsonld-signatures');

export class ContextManager {
    static getCreds() {
        console.log(credentialsContext);
        return credentialsContext;
    }

   
    static getCredsContextMap() {
      for (const [key, value] of credentialsContext.contexts) { // Using the default iterator (could be `map.entries()` instead)
        console.log(`The value for key ${key} is ${value}`);
      }
      /*
      const iterator = credentialsContext.context[Symbol.iterator]();

      for (const item of iterator) {
        console.log(item);
      }
      */

     //console.log(credentialsContext.contexts.get('https://www.w3.org/2018/credentials/v1'));
     console.log(credentialsContext.contexts.get(credentialsContext.CREDENTIALS_CONTEXT_V1_URL)); // get the value (schema) at the context URL
     console.log(credentialsContext.CREDENTIALS_CONTEXT_V1_URL);

     console.log(credentialsContext.constants);

     credentialsContext.constants["CREDENTIALS_CONTEXT_V1_URL"] = 'https://www.w3.org/2018/credentials/v2';

     console.log(credentialsContext.constants);

     credentialsContext.constants["CREDENTIALS_CONTEXT_V1_URL"] = 'https://www.w3.org/2018/credentials/v1';

     credentialsContext.constants["CREDENTIALS_CONTEXT_V2_URL"] = 'https://www.w3.org/2018/credentials/v2';

     console.log(credentialsContext.constants);

     // add a new mapping from "CREDENTIALS_CONTEXT_V2_URL" and a json file. 
     credentialsContext.contexts.set('CREDENTIALS_CONTEXT_V2_URL',credentialsContext.contexts.get(credentialsContext.CREDENTIALS_CONTEXT_V1_URL));

    // for some reason this returns undefined, perhaps there is another way to update the constants and the corresponding json files
     console.log(credentialsContext.contexts.get(credentialsContext.CREDENTIALS_CONTEXT_V2_URL)); // get the value (schema) at the context URL

     credentialsContext.contexts.set('CREDENTIALS_CONTEXT_V1_URL','buba');
     // document loader
     console.log(credentialsContext.documentLoader(credentialsContext.CREDENTIALS_CONTEXT_V1_URL));

     console.log(credentialsContext.contexts.get('CREDENTIALS_CONTEXT_V1_URL')); // get the value (schema) at the context URL
    } 

    static getCredsContext() {
        console.log(JSON.stringify(credentialsContext.CREDENTIALS_CONTEXT_V1_URL));
        return credentialsContext.CREDENTIALS_CONTEXT_V1_URL;
    }

    static getJSONLD() {
        console.log(jsonld);
        return jsonld;

        // const doc = { ... this is a verifiable credential document from the vc data model examples
        // const schema = { .. this is the schema from verifiable credentials...

        // try to read type = 'verifiableCredential' from schema
        // try to read type = 'verifiablePresentation' from schema
    }

    // this jsonld document loader, works. Now I need to figure out how to modify contexts in credentialsContext.contexts 
    static getJSONLDdocLoader() {
      const nodeDocumentLoader = jsonld.documentLoaders.node();

      const customLoader = async (url,options) => {
      if(url in credentialsContext.contexts) { // if(url === 'did:test:context:foo')
     //  if(url === credentialsContext.contexts) { // if(url === 'did:test:context:foo')
      //  if(url in 'did:test:context:foo') {
           return {
              contextUrl: null,
              document: credentialsContext.contexts[url], // url === 'did:test:context:foo'
              documentUrl: url   // myCustomContext
           };
        }
        return nodeDocumentLoader(url);
      };

      jsonld.documentLoader = customLoader;
/*
      const doc = {
        "http://schema.org/name": "Manu Sporny",
        "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
        "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
      };
      const context = {
        "name": "http://schema.org/name",
        "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
        "image": {"@id": "http://schema.org/image", "@type": "@id"}
      };
      */
/*
      const customVC = async (doc,context,{documentLoader: customLoader}) => {
       const compacted = await jsonld.compact(doc, context, {documentLoader: customLoader});
       console.log(compacted);
       console.log('hello');
      };
*/
  //    console.log(customVC(doc,context,{documentLoader: customLoader}).then());

      console.log(credentialsContext.constants); // this is not updated, what does the document loader do?

      console.log(credentialsContext.contexts.get(credentialsContext.CREDENTIALS_CONTEXT_V1_URL));

      console.log(credentialsContext.contexts.get(credentialsContext.CREDENTIALS_CONTEXT_V1_URL.VerifiablePresentation)); // need @context, 
      // credentialsContext.CREDENTIALS_CONTEXT_V1_URL.'@context'.VerifiablePresentation

      // how do I load a document with an '@context' property?

      console.log(credentialsContext.contexts.get(credentialsContext.CREDENTIALS_CONTEXT_V1_URL.VerifiableCredential));

    }

    static getJSONLDsignatures() {
      console.log(jldsigntures);
      return jldsigntures;
    }
}

// to support verifiable credentials with json-ld by default use npm package credentials-context
// CONTEXT_URL from this package is CONTEXT_URL: 'https://www.w3.org/2018/credentials/v1',
// contexts from this package is a json object describing verifiable credentials (like temporary file verifiedCredential.json)
// # make sure that the credential schema from the verfiedCredential context matches...

// credential types: Verifiable Credential, Verifiable Presentation
/*

    Function to customize/add to the @context property of the Verifiable Credential (you can update objects and maps) .. how to create a vc with the schema
    Function that creates the @context definition given a Credential Type and corresponding Credential Schema written in JSON  (you can update objects and maps)
    Optional functionality includes providing the ability to sign the JSON-LD VC with a Linked Data Proof type.

**/
// ToDo:
// ## Function to customize/add the @context property to the verifiable credential
// 1) Customize/add with custom document loader with digitalbazaar/vc
// ## Function that creates the @context definition given a credential type and corresponding credential schema written in JSON
// ## I am not sure how to do this yet....

/**
 * const doc = {
  "http://schema.org/name": "Manu Sporny",
  "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
  "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
};
const context = {
  "name": "http://schema.org/name",
  "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
  "image": {"@id": "http://schema.org/image", "@type": "@id"}
};

// compact a document according to a particular context
const compacted = await jsonld.compact(doc, context);
console.log(JSON.stringify(compacted, null, 2));
/* Output:
{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
    "image": {"@id": "http://schema.org/image", "@type": "@id"}
  },
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/",
  "image": "http://manu.sporny.org/images/manu.png"
}
*/

/**
 * // how to override the default document loader with a custom one -- for
// example, one that uses pre-loaded contexts:

// define a mapping of context URL => context doc
const CONTEXTS = {
  "http://example.com": {
    "@context": ...
  }, ...
};

// grab the built-in Node.js doc loader
const nodeDocumentLoader = jsonld.documentLoaders.node();
// or grab the XHR one: jsonld.documentLoaders.xhr()

// change the default document loader
const customLoader = async (url, options) => {
  if(url in CONTEXTS) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: CONTEXTS[url], // this is the actual document that was loaded
      documentUrl: url // this is the actual context URL after redirects
    };
  }
  // call the default documentLoader
  return nodeDocumentLoader(url);
};
jsonld.documentLoader = customLoader;

// alternatively, pass the custom loader for just a specific call:
const compacted = await jsonld.compact(
  doc, context, {documentLoader: customLoader});
 */

  /**
   * import * as credentialsContext from 'credentials-context';

const {AuthenticationProofPurpose} = jsigs.purposes;
const {constants: {CREDENTIALS_CONTEXT_V1_URL}} = credentialsContext;

// https://github.com/digitalbazaar/vc/blob/main/lib/index.js#L43C1-L46C70

   * export function createPresentation({
  verifiableCredential, id, holder, now
} = {}) {
  const presentation = {
    '@context': [CREDENTIALS_CONTEXT_V1_URL],
    type: ['VerifiablePresentation']
  };

  // https://github.com/digitalbazaar/vc/blob/main/lib/index.js#L328C1-L334C5
   */

  /**
   * export function _checkCredential({
  credential, now = new Date(), mode = 'verify'
} = {}) {
  if(typeof now === 'string') {
    now = new Date(now);
  }
  // ensure first context is 'https://www.w3.org/2018/credentials/v1'
  if(credential['@context'][0] !== CREDENTIALS_CONTEXT_V1_URL) {
    throw new Error(
      `"${CREDENTIALS_CONTEXT_V1_URL}" needs to be first in the ` +
      'list of contexts.');
  }
  // https://github.com/digitalbazaar/vc/blob/main/lib/index.js#L43C1-L46C70
   */

  /**
   * export const credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  id: 'http://example.edu/credentials/1872',
  type: ['VerifiableCredential', 'AlumniCredential'],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: '<span lang="en">Example University</span>'
  }
};

// https://github.com/digitalbazaar/vc/blob/d491d918a9f3b5804a43ceec493ac8d7817b2ad6/test/mocks/credential.js#L7
   */

/**
 * import constants from '../constants.js';

export const mock = {};

const didContexts = [
  constants.DID_CONTEXT_URL,
  constants.VERES_ONE_CONTEXT_URL
];

const credentials = mock.credentials = {};

credentials.alpha = {
  "@context": [
    constants.CREDENTIALS_CONTEXT_URL, {
      "ex1": "https://example.com/examples/v1",
      "AlumniCredential": "ex1:AlumniCredential",
      "alumniOf": "ex1:alumniOf"
    }
  ],
  "id": "http://example.edu/credentials/58473",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  }
};

const presentations = mock.presentations = {};

presentations.alpha = {
  "@context": [constants.CREDENTIALS_CONTEXT_URL],
  "type": ["VerifiablePresentation"],
  "verifiableCredential": [],
};

 * https://github.com/digitalbazaar/vc/blob/d491d918a9f3b5804a43ceec493ac8d7817b2ad6/test/mocks/mock.data.js#L2-L36
 */


export const DEFAULT_CONTEXT = 'https://www.w3.org/2018/credentials/v1'
