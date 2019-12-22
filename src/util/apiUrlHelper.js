const _ = require('lodash');

const apiUrls = {
  USERS: '/users/$id',
  ROLES: '/users/roles/',
  AUTHENTICATION: '/authentication/',
};
export default function getAbsoluteUrl(entity, id) {
  const url = id ? _.replace(apiUrls[entity], '$id', id) : _.replace(apiUrls[entity], '$id', '');
  return url;
}