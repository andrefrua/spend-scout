import { Model, DataTypes, Optional } from "sequelize";

import sequelize from "./sequelize";
import Category from "./category"; // Import the Category model
import { Transaction as TransactionAttributes } from "./interfaces/transaction";

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: string;
  public userId!: string;
  public transactionDate!: string;
  public valueDate!: string;
  public description!: string;
  public balance!: number;
  public amount!: number;
  public categoryId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID, // Assuming your category IDs are UUIDs
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Transaction"
  }
);

// Define the association with the Category model
Transaction.belongsTo(Category, {
  foreignKey: "categoryId"
});

export default Transaction;