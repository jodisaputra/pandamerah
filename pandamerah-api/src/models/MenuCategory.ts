import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface IMenuCategoryAttributes {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

interface IMenuCategoryCreationAttributes extends Optional<IMenuCategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class MenuCategory extends Model<IMenuCategoryAttributes, IMenuCategoryCreationAttributes> implements IMenuCategoryAttributes {
  public id!: number;
  public name!: string;
  public status!: 'active' | 'inactive';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'MenuCategory',
    tableName: 'menu_categories',
    timestamps: true,
  }
);

export default MenuCategory; 