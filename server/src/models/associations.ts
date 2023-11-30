import Category from "./category";
import Transaction from "./transaction";

const setupAssociations = () => {
  Transaction.belongsTo(Category, {
    foreignKey: "categoryId"
  });
};

export default setupAssociations;
