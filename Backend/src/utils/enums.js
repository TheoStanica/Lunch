const accountStatus = Object.freeze({
  active: 'active',
  pending: 'pending',
});

const accountRole = Object.freeze({
  user: 'user',
  admin: 'admin',
});

const restaurantStatus = Object.freeze({
  active: 'active',
  inactive: 'inactive',
});

module.exports = { accountStatus, accountRole, restaurantStatus };
