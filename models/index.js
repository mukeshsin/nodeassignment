import Address from "./address.js";
import User from "./user.js";

User.hasMany(Address, {
  as: 'addressDetails'
});
Address.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default { User, Address };