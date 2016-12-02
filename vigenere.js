'use strict';

var Vigenere = function() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    var block_size = 5;


    //get the mixed alphabet
     var get_mixed_alphabet = function(password) {
        var key_based = [];
        var temp_alphabet = [];
        var uniq_alphabet;
        var mixed_alphabet = "";
        var shifted_container = [];
	
	   //push the password character into array
        for (var i = 0; i < password.length; i++)
            key_based.push(password[i]);

	   //push alphabet character into array  
        for (var i = 0; i < alphabet.length; i++)
            temp_alphabet.push(alphabet[i]);
	    
    /*concatenate the two arrays and remove the duplicate by built-in function filter*/
	//uniq_alphabet = key_based.concat(temp_alphabet);
        uniq_alphabet = key_based.concat(temp_alphabet).filter(function(item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
	
        for (var size = 0; size < block_size; size++) {
            for (var i = size; i < uniq_alphabet.length; i+=block_size) {
                shifted_container.push(uniq_alphabet[i]);
            }
        }

        mixed_alphabet = shifted_container.join('');
        
        return mixed_alphabet;
    }

    /*get key*/
    this.get_key = function(password, message_len) {
        var key = [];
        for (var i = 0; i < message_len.length; i++) {
            var len = i % password.length;
            key.push(password[len]);
        }
        return key.join('');
    }
    
    /*get the vigenere table*/
    var get_vigenere = function(password, mixed_alphabet) {
        var temp = [];
        var vigenere = [];
        for (var i=0; i < mixed_alphabet.length; i++) {
            temp[i] = [];
            for (var j = 0; j < mixed_alphabet.length; j++) {
                var temp_character = i + j;
                if (temp_character >= mixed_alphabet.length) {
                    temp_character = temp_character - mixed_alphabet.length;
                }
                /*push into two dimensional array*/
                temp[i][j] = mixed_alphabet[temp_character];
            }
        }

	for(var i=0; i<temp.length;i++)
		vigenere.push((temp[i].join('')));
	
	//console.log(vigenere);	
	return vigenere;	
    }

    /*encrypt the message*/
    this.encrypt = function(password, msg) {
        var cipher = [];
        /*password = password.toLowerCase();
        msg = msg.toLowerCase();*/

	   //refer to vigenere table as the key alphabet
        var vigenere_table = get_vigenere(password, get_mixed_alphabet(password));
	   //load the key of the message*/	
        var keys = this.get_key(password, msg);
		
	console.log(vigenere_table);	
		
        for (var i = 0; i < alphabet.length; i++) {
            var key_alphabet = vigenere_table[i];
            var key = alphabet[i];
            cipher[key] = key_alphabet;
        }
	
        var encrypted_message = "";

        for (var i = 0; i < msg.length; i++) {
            var msg_char = msg[i];
            var msg_key = keys[i];
            var tmp_alphabet = cipher[msg_key];
            var msg_char_index = alphabet.indexOf(msg_char);
            var encrypted_char = tmp_alphabet[msg_char_index];

            encrypted_message += encrypted_char;
        }
        return encrypted_message;

    }

	
    /*decrypt the message*/

    this.decrypt = function(password, cipher_msg) {
        var decipher = [];
        /*password = password.toLowerCase();
        cipher_msg = cipher_msg.toLowerCase();*/

        var vigenere_table = get_vigenere(password, get_mixed_alphabet(password));
        var keys = this.get_key(password, cipher_msg);
	
        for (var i = 0; i < alphabet.length; i++) {
            var key_alphabet = vigenere_table[i];
            var key = alphabet[i];
            decipher[key] = key_alphabet;
        }
	
        var decrypted_message = "";
        for (var i = 0; i < cipher_msg.length; i++) {
             var decipher_msg_char = cipher_msg[i];
             var decipher_msg_key = keys[i];
             var temp_alphabet = decipher[decipher_msg_key];
             var decipher_msg_char_index = temp_alphabet.indexOf(decipher_msg_char);
	     var decrypted_char = alphabet[decipher_msg_char_index];

            decrypted_message += decrypted_char;
        }
       return decrypted_message;

    }
}

var v = new Vigenere();
//var message = "now is the time for all good men to come to the aid of their fellow man";
//var password = "excalibur";
var message = "PNPAA summer outing 2016 gateway to success";
var password = "Alumnimeetup2016";
var key = v.get_key(password,message);
var encrypted_message = v.encrypt(password, message);
var decrypted_message = v.decrypt(password, encrypted_message);
console.log('');
console.log("Original message: " + message);
console.log("Key of the message: "+ key);
console.log("Encrypted message: " + encrypted_message);
console.log("Decrypted message: " + decrypted_message);
