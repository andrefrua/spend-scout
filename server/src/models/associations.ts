import Category from "./category";
import Transaction from "./transaction";
import User from "./user";
import UserPreferences from "./userPreferences";

const setupAssociations = () => {
  Transaction.belongsTo(Category, {
    foreignKey: "categoryId"
  });

  UserPreferences.belongsTo(User, { foreignKey: "userId", as: "user" });
};

export default setupAssociations;
