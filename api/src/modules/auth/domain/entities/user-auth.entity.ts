export class UserAuthEntity {
  constructor(
    public readonly _id: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
