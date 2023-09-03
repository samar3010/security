var operation = 0; //Integer indicating Encryption/Decryption
var alphabetic = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let selectedMethod = Monoalphabetic;
function oper(op){
    operation = op;
    if(op == 0){
        document.getElementById("cipherText").disabled = true;
        document.getElementById("plainText").disabled = false;
    } else if(op == 1){
        document.getElementById("plainText").disabled = true;
        document.getElementById("cipherText").disabled = false;
    }
}

// Method choosing ->
function chosenMethod(x){
    switch(x){
        case 0: selectedMethod = Monoalphabetic;
            break;
        case 1: selectedMethod = Caeser;
            break;
        case 2: selectedMethod = Vigenere;
            break;
        case 3: selectedMethod = railFence;
            break;
        case 4: selectedMethod = rowTransportation;
            break;
    }
}

// Start Button ->
function start(){
    var plaintextBox = document.getElementById("plainText");
    var ciphertextBox = document.getElementById("cipherText");
    let keyBox = document.getElementById("keyInput").value;
    if(operation == 0){
        ciphertextBox.value = selectedMethod(keyBox, plaintextBox.value);
        plaintextBox.value = plaintextBox.value.toLowerCase();
    }
    else if(operation == 1){
        plaintextBox.value = selectedMethod(keyBox, ciphertextBox.value);
        ciphertextBox.value = ciphertextBox.value.toUpperCase();
    }
}

// Monoalphabetic Function ->
function Monoalphabetic(key, text){
    key = key.split("");
    text.split();
    if(operation == 0){
        let ciphertext = "";
        for(i = 0; i < text.length; i++) ciphertext += key[alphabetic.indexOf(text[i])];
        console.log(ciphertext);
        return ciphertext.toUpperCase();
    }
    else if(operation == 1){
        let plaintext = "";
        for(i = 0; i < text.length; i++) plaintext += alphabetic[key.indexOf(text[i])];
        return plaintext.toLowerCase();
    }
}

// Caeser Function ->
function Caeser(key, text){
    text = text.split("");
    key = parseInt(key);
    if(operation == 0){
        let ciphertext = "";
        for(i = 0; i < text.length; i++) ciphertext += alphabetic[(alphabetic.indexOf(text[i]) + key) % 26];
        return ciphertext.toUpperCase();
    }
    else if(operation == 1){
        let plaintext = "";
        for(i = 0; i < text.length; i++){
            let index = alphabetic.indexOf(text[i]) - key;
            if(index < 0) index = index + 26;
            else index = index % 26;
            plaintext += alphabetic[index];
        }
        return plaintext.toLowerCase();
    }
}

















// Vigenere Function ->
function Vigenere(key, text){
    text = text.split("");
    while(key.length < text.length) key+=key;
    key = key.split("");
    if(operation == 0){
        let ciphertext = "";
        for(i = 0; i < text.length; i++) ciphertext += alphabetic[(alphabetic.indexOf(text[i]) + alphabetic.indexOf(key[i])) % 26];
        return ciphertext.toUpperCase();
    }
    else if(operation == 1){
        let plaintext = "";
        for(i = 0; i < text.length; i++){
            let index = alphabetic.indexOf(text[i]) - alphabetic.indexOf(key[i]);
            if(index < 0) index = index + 26;
            else index = index % 26;
            plaintext += alphabetic[index];
        }
        return plaintext.toLowerCase();
    }
}

// Rail-fence Function ->
function railFence(key, text){
    if(operation == 0){
        let plaintext = text.split("");
        let ciphertext = "";
        let depth = parseInt(key);
        let i = 0;
        let index = 1;
        while(ciphertext.length < plaintext.length){
          ciphertext+=plaintext[i];
          i = i + depth;
          if(i >= plaintext.length) i = index++;
        }
        return ciphertext.toUpperCase();
    }
    else if(operation == 1){
        let ciphertext = text.split("");
        let plaintext = "";
        let depth = Math.round(ciphertext.length/parseInt(key));
        let i = 0;
        let index = 1;
        while(plaintext.length < ciphertext.length){
          plaintext+=ciphertext[i];
          i = i + depth;
          if(i >= ciphertext.length) i = index++;
        }
        return plaintext.toLowerCase();
      }
}

function rowTransportation(key, text){
    //Word to Array
    text = text.split("");
    key = key.split("");
    let table = [];
    let row = [];
    while(text.length > 0){
      let element = text.shift();
      row.push(element);
      if(row.length == key.length){
          console.log("RRR");
        table.push(row);
        row = [];
      }
    }
    table.push(row);

    // Take array, return word.
    function toWord(array, key){
      let ret = "";
      for(i = 0; i < array.length; i++){
        for(j = 0; j < key.length; j++){
          let ans = array[i][j];
          if(ans == undefined) ans = "_";
          ret+=ans;
        }
      }
      return ret;
    }
    let resultArr = structuredClone(table);
    if(operation == 0){
      for(i = 0; i < table.length; i++){
          for(j = 0; j < key.length; j++){
              let elm = table[i][parseInt(key[j])-1];
              if(elm == undefined) elm == "_";
              resultArr[i][j] = elm;
          }
      }
      return toWord(resultArr, key).toUpperCase();

    } else if (operation == 1){
      for(i = 0; i < table.length; i++){
          for(j = 0; j < key.length; j++){
            let elm = table[i][j];
            resultArr[i][parseInt(key[j])-1] = elm;
          }
      }
      let finalResult = toWord(resultArr, key).toLowerCase();
      while(finalResult.includes("_")) finalResult = finalResult.replace("_", "");
      return finalResult;
    }
}