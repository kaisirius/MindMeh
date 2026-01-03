export type T_content = {
  link: string,
  title: string,
  description: string,
  typeOfContent: "Youtube" | "Twitter" | "Reddit" | "Medium" | "Other"
  createdAt: string,
  brainId: string,
  _id: string
  embedding?: number[]
}
