import { Op } from 'sequelize';
import models from 'models';
const { Namecard } = models;

export const da_namecardsBelongsToUserid = async (UserId, privacy) => {
  const namecards = await Namecard.findAll({
    where: {
      UserId,
      privacy: {
        [Op.in]: privacy
      }
    }
  });
  return namecards;
};

export const da_privateNamecardsBelongsToUserid = async UserId => {
  const namecards = await Namecard.findAll({
    where: {
      UserId,
      privacy: 'private'
    },
    attributes: ['id', 'tag', 'privacy']
  });
  return namecards;
};
