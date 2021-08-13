const fetch = require("node-fetch");

const legendaryHero = 875723439367917599;
const epicHero = 875723598944403507; 
const rareHero = 875723543650910239;

module.exports = async function(message, args) { 
        if (args.length > 0) { 
            policyId = args.join(" ");
        };
 //Crypto Heroez API checking if token is real
    const heroezApi = `https://cryptoheroez.io/api/policy/${policyId}`; 
    let response = await fetch(heroezApi); 
    let json = await response.json(); 
    if(json.valid) { 
        if(json.title === 'Michael Saylor') { 
            message.member.addRole(rareHero);
        } else if (json.title === 'Dorian Nakamoto') { 
            message.member.addRole(legendaryHero);
        };
    };
};