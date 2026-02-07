export function formatDate(date) {
  const data = new Date(date);
  return data.toLocaleDateString("pt-BR");
}
