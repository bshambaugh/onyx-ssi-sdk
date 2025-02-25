import { DIDWithKeys } from "../did/did";
import { SignatureService } from "./signatures";
import { CredentialPayload, PresentationPayload, Issuer, CreatePresentationOptions, CreateCredentialOptions } from 'did-jwt-vc';
export declare class JWTService implements SignatureService {
    name: string;
    /**
     * Creates a Verifiable Credential JWT given a {@link CredentialPayload} and a {@link DIDWithKeys}.
     *
     * This method transforms the payload into the [JWT encoding](https://www.w3.org/TR/vc-data-model/#jwt-encoding)
     * described in the [W3C VC spec](https://www.w3.org/TR/vc-data-model) and then validated to conform to the minimum
     * spec.
     *
     * `DIDWithKeys` is converted to an {@link Issuer} which is then used to sign the JWT.
     *
     *`token`, `Issuer` and `options` are forwarded to {@link createVerifiableCredentialJwt} in did-jwt-vc
    *
    * @param keys - `DIDWithKeys` - the DID and the keypair that will sign the token
    * @param token - `CredentialPayload` - the Credential object
    * @param options - Use these options to tweak the creation of the JWT Credential. These are forwarded to did-jwt.
    * @return a `Promise` that resolves to the JWT encoded verifiable credential
    * Throws `TypeError` if the `payload` is not W3C compliant
    */
    signVC(keys: DIDWithKeys, token: CredentialPayload, options?: CreateCredentialOptions): Promise<JWT>;
    /**
     * Creates a Verifiable Presentation JWT given a {@link PresentationPayload} and a {@link DIDWithKeys}.
     *
     * This method transforms the payload into the [JWT encoding](https://www.w3.org/TR/vc-data-model/#jwt-encoding)
     * described in the [W3C VC spec](https://www.w3.org/TR/vc-data-model) and then validated to conform to the minimum
     * spec.
     *
     * `DIDWithKeys` is converted to an {@link Issuer} which is then used to sign the JWT.
     *
     * `token`, `Holder` and `options` are forwarded to {@link createVerifiablePresentationJwt} from did-jwt-vc
     *
     * @param keys - `DIDWithKeys` - the DID and the keypair that will sign the token
     * @param token - `PresentationPayload` - the Presentation object
     * @param options - Use these options to tweak the creation of the JWT Presentation. These are forwarded to did-jwt.
     * @return a `Promise` that resolves to the JWT encoded verifiable presentation
     * Throws `TypeError` if the `payload` is not W3C compliant
     */
    signVP(keys: DIDWithKeys, token: PresentationPayload, options?: CreatePresentationOptions): Promise<JWT>;
    /**
     * Helper function to convert a {@link DIDWithKeys} to an {@link Issuer}
     *
     * This method transforms the privateKey to a supported Signer based on key algorithm type
     * The Signer is from did-jwt. {@link ES256KSigner} and {@link EdDSASigner} are the spported signers
     *
     * @param keys - `DIDWithKeys` - the DID and the keypair
     * @return an `Issuer` - DID and Signer
     * Throws `TypeError` if supplied key algorithm is not supported
     */
    convertKeys(keys: DIDWithKeys): Issuer;
    /**
     * Helper function to decode a JWT
     *
     * This method uses jsonwebtoken to decode a JWT to its {header, payload, signature}
     *
     * @param jwt - JWT string to be decoded
     * @return decoded JWT object {header, payload, signature}
     */
    decodeJWT(token: JWT): import("jsonwebtoken").Jwt;
}
/**
 * Represents a readonly representation of a JWT encoded verifiable object
 */
export type JWT = string;
//# sourceMappingURL=jwt.d.ts.map