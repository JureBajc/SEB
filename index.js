
const Discord = require('discord.js')
const client = new Discord.Client()
const axios=require('axios')
const config = require('./config.json')
const command = require('./command')
const privateMessage=require('./privatmsg')
const clanstevc =require('./clan-stevc')
const adminstevc=require('./Admin-stevc')
const poll = require('./poll')
var sqlite3 = require('sqlite3').verbose()
client.login(config.token)

let db = new sqlite3.Database('/home/ec2-user/bot/Commands/test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Povezava na PD uspela');
});

  client.on('ready', () => {
    console.log('client deluje')
    privateMessage(client, 'ping', 'dela!')
    clanstevc(client)
    adminstevc(client)
    poll(client)
    client.users.fetch('328097481655058432').then((user) => {
    user.send('Deluje')
    })
  }) 



  command(client,'colours',async(message)=>{
    message.guild.roles.create({
      data: {
        name: 'test',
        color: '#00ff00',
      }
    })
      .then(console.log)
      .catch(console.error);
  })
///async ker mora pocakati na result 
  command(client,'uptime',async(message)=>{
    let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      let uptimeE = new Discord.MessageEmbed()
      .setTitle("UPTIME")
      .setColor("RANDOM")
      .setDescription(`\n Online ${days}D ${hours}H ${minutes}M ${seconds}S`)
      message.channel.send(uptimeE)
    return;
  })

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })

// če vklučuje specificno besedo v stringu 
  client.on("message", (message) => {
    let conten=message.content
    let Lcontent=conten.toLowerCase()
    
    if (Lcontent.includes('meme')) {
      var ran=Math.floor(Math.random() * 8);
      var test

      if(ran!=test){
      switch(ran) {
        case 0:
          console.log("0")
          message.channel.send("Evo", { files: ["./post/image0.gif"] });
          break;
        case 1:
          console.log("1")
          message.channel.send("Evo ", { files: ["./post/image1.gif"] });
          break;
        //case 2:
          //console.log("2")
          //message.channel.send("Evo", { files: ["./post/image2.gif"] });
          //break;          
        case 3:
          console.log("3")
          message.channel.send("Evo", { files: ["./post/image3.gif"] });
          break;
        case 4:
          console.log("4")
          message.channel.send("Evo", { files: ["./post/image4.mov"] });
          break;
        case 5:
          console.log("5")
          message.channel.send("Evo", { files: ["./post/image5.mp4"] });
          break;
        case 6:
          console.log("6")
          message.channel.send("Evo", { files: ["./post/image6.mp4"] });
          break;
        case 7:
          console.log("7")
          message.channel.send("Evo", { files: ["./post/image7.mp3"] });
      }
      test=ran
    }
    }
  })

  command(client,'removerole',(message)=>{

    
  })

///async ker mora pocakati na result 
  command(client, 'emotes', async(message) => {
      let Emojis = "";
      let EmojisAnimated = "";
      let EmojiCount = 0;
      let Animated = 0;
      let OverallEmojis = 0;

      function Emoji(id) {
        return client.emojis.cache.get(id).toString();
      }
      message.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
          Animated++;
          EmojisAnimated += Emoji(emoji.id);
        } else {
          EmojiCount++;
          Emojis += Emoji(emoji.id);
        }
      })
      let Embed = new Discord.MessageEmbed()
        .setTitle(`Emojis in ${message.guild.name} | Emojis [${OverallEmojis}] `)
        .setDescription(
          `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
        )
        .setColor('RANDOM');
  
      if (Embed.length > 2000) {
        return message.channel.send(
          `I'm sorry but, my limit is 2000 characters only!`
        );
      } else {
        message.channel.send(Embed);
      }
    })

  command(client, 'servers', (message) => {
    let server=[];
    client.guilds.cache.forEach((guild) => {
      server.push(guild.name)
    })
    message.channel.send('\n'+server)
  })

  command(client,'vip',async(message)=>{
    var myData=[];
    const content=message.content.replace('$vip ','')
    myData.push(content+'\n')//shrane podatke v string
    const fs=require('fs')
    fs.writeFile('VIP.txt',myData,{flag: 'a+'},err=>{})
  });

  command(client,'viplist',message=>{
    message.channel.send( {files: ["/home/ec2-user/bot/Commands/VIP.txt"] })
  })

  command(client, 'members', async(message) => {
    const testiram =message.guild.id
    const guild = client.guilds.cache.get(testiram)
    guild.members.fetch()
    .then(members => {
      let membernames = members.map(item => item.user.username)
      let names = membernames.join('\n')
      const fs=require('fs')
    fs.writeFile('/home/ec2-user/bot/Commands/testA.txt',names,err=>{
      if(err){
        console.error(err)
        return
      }
    })
    message.channel.send(`A file of all members in ${guild.name}`, 
    { files: ["/home/ec2-user/bot/Commands/testA.txt"] });
  })
})


command(client,'inrole',async(message)=>{
let role = message.mentions.roles.first();
if(!role) role = message.guild.roles.cache.find(r => r.id == args[0]);
if(!role) message.reply('that role does not exist!');
let arr = new Array();
role.members.forEach(user => {
  arr.push(`${user.user.username}\n`);
  const fs=require('fs')
    fs.writeFile('/home/ec2-user/bot/Commands/testA.txt',arr.join(''),err=>{
    if(err){
      console.error(err)
      return
    }
  })
});
message.channel.send(`A file of all members in ${role.name}`, { files: ["/home/ec2-user/bot/Commands/testA.txt"] });
})
  command(client,'status',message =>{
    if (message.member.hasPermission('ADMINISTRATOR')){
    const content=message.content.replace('$status','')
    client.user.setPresence({
      activity:{
        name: content,
        type:0,
      },
    })
  }
  })

  client.on("message", (message) => {
    let conten=message.content
    let Lcontent=conten.toLowerCase()
    const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(regex.test(str)){
        return true;
      }else{return false;}
    }
    
    if (Lcontent.includes('cat')) {
      if(validURL(Lcontent)){
      axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then((res)=>{
        message.reply(res.data[0].url)
      })
      .catch((err)=>{
        console.error('ERR:',err)
      })
    }
  }
  })

  client.on("message", (message) => {
    let conten=message.content
    let Lcontent=conten.toLowerCase()
    const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(regex.test(str)){
        return true;
      }else{return false;}
    }
    if (Lcontent.includes('dog')) {
      if(validURL(Lcontent)){
    axios
    .get('https://api.thedogapi.com/v1/images/search')
    .then((res)=>{
      message.reply(res.data[0].url)
    })
    .catch((err)=>{
      console.error('ERR:',err)
    })
  }
}
})

  command(client, 'serverinfo', (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')){
    let embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setTitle("**Server Information**")
      .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField(`🎫 Name of server:`, message.guild.name, true)
      .addField(`🆔 ID of server`, message.guild.id, true)
      .addField(`👑 Owner of server`, message.guild.owner, true)  
      .addField(`🗺 Region of server`, message.guild.region, true)
      .addField(`👥 Member total`, message.guild.memberCount.toLocaleString(), true)
      .addField(`🤖 Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
      .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
      .addField(`👻 Animated Emoji\'s:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
      .addField(`💬 Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
      .addField(`🎤 Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
      .addField(`🤠 Total Channels:`, message.guild.channels.cache.filter((c) => c.type === "text" || c.type === "voice").size, true) //nekako naredit da zgleda lepsi //fixed
      .addField(`👔 Total Amount of Roles:`, message.guild.roles.cache.size, true)
      .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png'}))
      message.channel.send(embed);
    }
    })
  
  command(client, 'cc',(message) => {
    if (message.member.hasPermission('ADMINISTRATOR')){
      var split = message.content.split(' ');
      let mc = split[1];
      console.log(mc)
    message.channel.bulkDelete(mc)
    .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
    .catch(console.error)
    }
  })
  
  command(client,'ban',message =>{
    const{member,mentions}=message

    if(member.hasPermission('ADMINISTRATOR'))
    {
    const target=mentions.users.first()
    if(target){
      const targetMember=message.guild.members.cache.get(target.id)
      targetMember.ban()
      message.channel.send(`<@${member.id}> Oseba je bila bannana`)
    }
    else{
      message.channel.send(`<@${member.id}> Ni osebe podane`)
    }
    }
    else{
      message.channel.send(`<@${member.id}> Nimaš dovoljenja`)
    }
    })

  command(client,'kick',message =>{
      const{member,mentions}=message
  
      if(member.hasPermission('ADMINISTRATOR'))
      {
      const target=mentions.users.first()
      if(target){
        const targetMember=message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`<@${member.id}> Oseba je bil kickan`)
      }
      else{
        message.channel.send(`<@${member.id}> Ni osebe podane`)
      }
      }
      else{
        message.channel.send(`<@${member.id}> Nimaš dovoljenja`)
      }
      })


/*command(client, 'role1', async(message) => {
  const testiram =message.guild.id
  const guild = client.guilds.cache.get(testiram) 
  guild.members.fetch({ roles:'735616700594126931'})
  .then(members => {
    let membernames = members.map(item => item.user.username);
    let names = membernames.join('\n')
    const fs=require('fs')
    fs.writeFile('/home/ec2-user/bot/Commands/testA.txt',names,err=>{
    if(err){
      console.error(err)
      return
    }
  })
  message.channel.send(`A file of all members in ${guild.name}`, { files: ["/home/ec2-user/bot/Commands/testA.txt"] });
})
})
*/
/*command(client, 'members2', async(message) => {
  const testiram =message.guild.id
  const guild = client.guilds.cache.get(testiram) ///ne vem kak specifirat od messega GUILDID
   guild.members.fetch()//pridobi podatke tehnicno niti ne rabi async 
   .then(members => {
    let myData = [];
     members.forEach((member) => {
       myData.push(member.user.username+'\n')//shrane podatke v string
       const fs=require('fs')
    fs.writeFile('/home/ec2-user/bot/Commands/testA.txt',myData,err=>{
      if(err){
        console.error(err)
        return
      }
    })
     })
    /*const fs=require('fs')
    fs.writeFile('/home/ec2-user/bot/Commands/testA.txt',myData,err=>{
      if(err){
        console.error(err)
        return
      }
    })
    message.channel.send("A file of all members in EXD", { files: ["/home/ec2-user/bot/Commands/testA.txt"] });
   })
 })
 */
 // let role = message.mentions.roles.first()

 // role.members(not finish u can refer to docs)
  
///async ker mora pocakati na result 
/*
 command(client, 'members', async(message) => {
   const guild = client.guilds.cache.get('734172493430128801') ///ne vem kak specifirat od messega GUILDID
    guild.members.fetch()//pridobi podatke tehnicno niti ne rabi async 
    .then(members => {
     let myData = [];
      members.forEach((member) => {
        myData.push(member.user.username)//shrane podatke v string
      })
      let arr = [];
      let msg = ``;
      for(let i = 0; i<myData.length; i++){ //zanka za deljenje sporocil max 2000
        if(msg.length > 1967){
         arr.push(msg);
          msg = ``;
        }
        msg += myData[i] + `, `;
      }
      arr.push(msg);
      arr.forEach(str => message.channel.send(str))
    })
  })
*/

/*command(client, '1', async(message) => {
  const testiram =message.guild.id
  const guild = client.guilds.cache.get(testiram) 
  let roleID = "735612961330036788";
  membersWithRole = guild.roles.cache.get(roleID).members
  .then(members => {
    console.log(members)
    let membernames = members.map(item => item.user.username);
    let names = membernames.join('\n')
    const fs=require('fs')
  fs.writeFile('/home/ec2-user/bot/Commands/testA.txt',names,err=>{
    if(err){
      console.error(err)
      return
    }
  })
  message.channel.send(`A file of all members in ${guild.name}`, { files: ["/home/ec2-user/bot/Commands/testA.txt"] });
})
})
*/

//message.guild.roles.cache.get('ROLE-ID').members.map(m=>m.user.id);