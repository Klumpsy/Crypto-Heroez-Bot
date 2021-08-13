//remove first userinput (which will be the command) and join the remaining elements (search input)
const fetch = require("node-fetch");

module.exports = async function(message, args) { 
        if (args.length > 0) { 
            policyId = args.join(" ");
        };
 //Crypto Heroez API checking if token is real
    const heroezApi = `https://cryptoheroez.io/api/policy/${policyId}`; 
    let response = await fetch(heroezApi); 
    let json = await response.json(); 
    if(json.valid) { 
        message.channel.send(`Name: ${json.title}, your Crypto hero is the real deal!`);
    } else { 
        message.channel.send("BEEP BEEP !!!NOT A REAL HERO!!! BEEP BEEP");
    }
};