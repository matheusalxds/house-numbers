export interface IIAAdapter {
  perform: (params: string) => Promise<string>
}
