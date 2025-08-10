export class Snippet {
  constructor(
    public readonly _id: string,
    public text: string,
    public summary: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
