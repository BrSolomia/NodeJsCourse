import { DataTypes, STRING } from 'sequelize';
import { db } from '../data-access';

export const UserGroup = db.define('usergroups', {
    groupid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userid: {
        type: DataTypes.ARRAY(STRING),
        allowNull: false
    }
}, {
    timestamps: false,
    logging: false
});