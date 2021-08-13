const fetch = require("node-fetch");

const legendaryHero = "875723439367917599";
const epicHero = "875723598944403507"; 
const rareHero = "875723543650910239";

module.exports = async function(message, args) { 
    const list = guilds.get("875356593229795329");
    list.members.fetch().then(members => console.log(members))
        if (args.length > 0) { 
            policyId = args.join(" ");
        };
 //Crypto Heroez API checking if token is real
    const heroezApi = `https://cryptoheroez.io/api/policy/${policyId}`; 
    let response = await fetch(heroezApi); 
    let json = await response.json(); 
    console.log(json); 
    if(json.valid && json.policy !== message.member.memberid) { 
        //Rare heroes
        if(json.title === 'Michael Saylor') { 
            message.member.roles.remove(epicHero, legendaryHero);
            message.member.roles.add(rareHero);
        //Epic heroes
        } else if (json.title === 'Charles Hoskinson') { 
            message.member.roles.remove(epicHero, rareHero)
            message.member.roles.add(legendaryHero);
        //Legendary heroes
        } else if (json.title === 'Dorian Nakamoto') { 
            message.member.roles.remove(epicHero, rareHero)
            message.member.roles.add(legendaryHero);
        } 
    } else { 
        message.channel.send("Sorry this heroID is already in use"); 
    };
    message.member.memberid = json.policy; 
    console.log(message.member.memberid);
};