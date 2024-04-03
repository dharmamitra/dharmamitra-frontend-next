export const setRows = (input: string) => {
  const rows = Math.ceil(input.length / 70)
  return rows < 5 ? rows : 5
}
