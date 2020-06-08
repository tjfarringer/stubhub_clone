// Going to define the mongoose user model here
import mongoose, { mongo } from 'mongoose';
import { Password } from '../services/password';

// interface describing what is required for a user
interface UserAttrs {
  email: string;
  password: string;
}

// interface describing what the user model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// interface describing a user document
interface UserDoc extends mongoose.Document {
  // this is where to add additional properties if we wanted to store them
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      // Note that mongoose does not share these types to typescript..
      // Part of the pain between mongoose and TS
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // Need to map the "_id" field to "id"
        ret.id = ret._id;
        // note delete is a native JS keyworkd
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// anytime we try to save something to the db
// this function will run
userSchema.pre('save', async function (done) {
  // Note:  this will return true for the first time we create a user
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// These <something> pieces are:
// They are types being provided to the function as arguments
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
