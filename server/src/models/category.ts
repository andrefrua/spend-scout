import { Model, DataTypes, Optional } from "sequelize";

import sequelize from "./sequelize";
import {
  Category as CategoryAttributes,
  CategoryType
} from "./interfaces/category";

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public userId!: string;
  public type!: CategoryType;
  public name!: string;
  public description!: string;
  public filterField!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID, // Assuming your category IDs are UUIDs
      defaultValue: DataTypes.UUIDV4, // Generate a UUID automatically
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID, // Assuming user IDs are UUIDs
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(...Object.values(CategoryType)),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filterField: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Category"
  }
);

export default Category;
