const { database } = require('../../../../settings.json');
const { makeSheetEmbed } = require('../../../output/embed');
const { NotFoundError, searchingObjType } = require('../../../err/errors');

module.exports = {
    name: 'profile',
    description: 'Shows a players character sheet.',
    args: {
        limitCount: false,
        specifics: []
    },
    async execute(message, _args, mongo, _discordClient) {
        //get character name
        const playerData = await mongo.tryFind(database.collections.players, { discordID: message.author.id });
        if (!playerData) {
            throw new NotFoundError(searchingObjType.player, message.author.id);
        }
        const characterName = playerData.character;

        //get character sheet
        const sheet = await mongo.tryFind(database.collections.characters, { characterName: characterName });
        if (!sheet) {
            throw new NotFoundError(searchingObjType.sheet, characterName);
        }

        return await message.reply({
            embed: makeSheetEmbed(message.member.displayHexColor, sheet)
        });
    }
};