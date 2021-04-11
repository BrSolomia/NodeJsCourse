import { DataTypes } from 'sequelize';
import { db } from '../data-access';

const Permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export const Group = db.define('groups', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ENUM,
      values: Permissions,
      allowNull: false
    }
}, {
  timestamps: false,
  logging: false
});