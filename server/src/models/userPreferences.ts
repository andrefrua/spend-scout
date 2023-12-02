import { Model, DataTypes, Optional } from "sequelize";

import sequelize from "./sequelize";
import {
  UserPreferences as UserPreferencesAttributes,
  VerticalNavColor,
  VerticalNavItemColor
} from "./interfaces/userPreferences";

interface UserPreferencesCreationAttributes
  extends Optional<UserPreferencesAttributes, "id"> {}

class UserPreferences
  extends Model<UserPreferencesAttributes, UserPreferencesCreationAttributes>
  implements UserPreferencesAttributes
{
  public id!: number;
  public userId!: string;
  public isVerticalNavCollapsed!: boolean;
  public isDarkMode!: boolean;
  public isNavBarFixed!: boolean;
  public verticalNavColor!: VerticalNavColor;
  public verticalNavItemColor!: VerticalNavItemColor;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserPreferences.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID, // TODO: This should reference the User model
      allowNull: false
    },
    isVerticalNavCollapsed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isDarkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isNavBarFixed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    verticalNavColor: {
      type: DataTypes.ENUM(...Object.values(VerticalNavColor)),
      allowNull: true
    },
    verticalNavItemColor: {
      type: DataTypes.ENUM(...Object.values(VerticalNavItemColor)),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "UserPreferences"
  }
);

export default UserPreferences;
