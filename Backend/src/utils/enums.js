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

const courseRequiredType = Object.freeze({
  restaurant: 'restaurant',
  takeaway: 'takeaway',
  both: 'both',
});

const orderStatus = Object.freeze({
  active: 'active',
  cancelled: 'cancelled',
});

const courseTypes = Object.freeze({
  description: 'description',
  requiredType: 'requiredType',
});

module.exports = {
  accountStatus,
  accountRole,
  restaurantStatus,
  courseRequiredType,
  orderStatus,
  courseTypes,
};
