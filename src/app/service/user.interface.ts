export interface User {
  id: string;
  name: string;
  email: string;
  imagePath: string;
}

export interface MongoUser extends Omit<User, 'id'> {
  _id: string;
}
