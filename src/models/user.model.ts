import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import config from 'config';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>( // added <Userdocument>
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // let user = this as UserDocument;
  if (!this.isModified('password')) return next();

  // const salt = await bcrypt.genSalt(config.get<number>('salt'));
  // const hash = await bcrypt.hashSync(this.password, salt);

  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
