            module.exports = (client) => {
              const channelId = '855395588761190430'
              const updateMembers = (guild) => {
                let roleID = "665930928685580291";
                let membersWithRole = guild.roles.cache.get(roleID).members;
                const channel = guild.channels.cache.get(channelId)
                channel.setName(`Admins: ${membersWithRole.size.toLocaleString()}`)
              }
              client.on('guildMemberAdd', (member) => updateMembers(member.guild))
              client.on('guildMemberRemove', (member) => updateMembers(member.guild))
              const guild = client.guilds.cache.get('664915818076962816')
              updateMembers(guild)
            }