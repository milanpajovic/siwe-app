import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  freezeTableName: true,
  modelName: 'profiles',
  timestamps: true,
  underscored: true,
})
export default class Profile extends Model<Profile> {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @Unique
  @AllowNull(false)
  @Column
  username: string;

  @Unique
  @AllowNull(false)
  @Column
  wallet_address: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  phone: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  postal_code: string;

  @AllowNull(false)
  @Column
  city: string;
}
