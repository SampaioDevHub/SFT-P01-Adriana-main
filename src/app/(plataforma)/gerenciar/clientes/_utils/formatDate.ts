export function formatDate(data: Date | undefined): Date | undefined {
  if (!data) return undefined;

  const dia = data.getDate();
  const mes = data.getMonth(); // 0-11
  const ano = data.getFullYear();

  // Cria um novo Date com hora zerada
  return new Date(ano, mes, dia, 0, 0, 0, 0);
}