'use strict';

class Vigenere {
    #alphabet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    #blockSize = 5;

    #getMixedAlphabet(password) {
        // combine password chars + alphabet chars, remove duplicates
        const uniqAlphabet = [...password, ...this.#alphabet].filter(
            (item, index, arr) => arr.indexOf(item) === index
        );

        // block shift / columnar transposition
        const shifted = [];
        for (let size = 0; size < this.#blockSize; size++) {
            for (let i = size; i < uniqAlphabet.length; i += this.#blockSize) {
                shifted.push(uniqAlphabet[i]);
            }
        }

        return shifted.join('');
    }

    #getVigenereTable(mixedAlphabet) {
        const table = [];
        for (let i = 0; i < mixedAlphabet.length; i++) {
            const row = [];
            for (let j = 0; j < mixedAlphabet.length; j++) {
                let index = i + j;
                if (index >= mixedAlphabet.length) {
                    index -= mixedAlphabet.length;
                }
                row.push(mixedAlphabet[index]);
            }
            table.push(row.join(''));
        }
        return table;
    }

    #buildCipherMap(password) {
        const mixedAlphabet = this.#getMixedAlphabet(password);
        const vigenereTable = this.#getVigenereTable(mixedAlphabet);
        const map = new Map();
        for (let i = 0; i < this.#alphabet.length; i++) {
            map.set(this.#alphabet[i], vigenereTable[i]);
        }
        return map;
    }

    getKey(password, message) {
        let key = '';
        for (let i = 0; i < message.length; i++) {
            key += password[i % password.length];
        }
        return key;
    }

    encrypt(password, message) {
        const cipherMap = this.#buildCipherMap(password);
        const keys = this.getKey(password, message);
        let encryptedMessage = '';

        for (let i = 0; i < message.length; i++) {
            const msgChar = message[i];
            const msgKey = keys[i];
            const msgCharIndex = this.#alphabet.indexOf(msgChar);

            // pass through characters not in alphabet
            if (msgCharIndex === -1) {
                encryptedMessage += msgChar;
                continue;
            }

            const rowAlphabet = cipherMap.get(msgKey);
            encryptedMessage += rowAlphabet[msgCharIndex];
        }

        return encryptedMessage;
    }

    decrypt(password, cipherMessage) {
        const cipherMap = this.#buildCipherMap(password);
        const keys = this.getKey(password, cipherMessage);
        let decryptedMessage = '';

        for (let i = 0; i < cipherMessage.length; i++) {
            const cipherChar = cipherMessage[i];
            const cipherKey = keys[i];
            const rowAlphabet = cipherMap.get(cipherKey);

            // pass through characters not in alphabet
            if (!rowAlphabet) {
                decryptedMessage += cipherChar;
                continue;
            }

            const charIndex = rowAlphabet.indexOf(cipherChar);
            decryptedMessage += this.#alphabet[charIndex];
        }

        return decryptedMessage;
    }
}

// --- Usage ---
const v = new Vigenere();
const message  = "PNPAA summer outing 2016 gateway to success";
const password = "Alumnimeetup2016";

const key              = v.getKey(password, message);
const encryptedMessage = v.encrypt(password, message);
const decryptedMessage = v.decrypt(password, encryptedMessage);

console.log("Original message  : " + message);
console.log("Key of the message: " + key);
console.log("Encrypted message : " + encryptedMessage);
console.log("Decrypted message : " + decryptedMessage);
