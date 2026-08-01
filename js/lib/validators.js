export function validateBackup(payload) {
  if (!payload || typeof payload !== 'object') return { valid: false, message: 'O arquivo não contém um objeto JSON válido.' };
  if (payload.app !== 'habitos-app') return { valid: false, message: 'Este arquivo não pertence ao Hábitos App.' };
  if (!payload.data || typeof payload.data !== 'object') return { valid: false, message: 'A propriedade de dados não foi encontrada.' };
  if (!payload.data.settings || !payload.data.days) return { valid: false, message: 'O backup está incompleto.' };
  if (typeof payload.data.days !== 'object' || Array.isArray(payload.data.days)) return { valid: false, message: 'Os registros diários são inválidos.' };
  return { valid: true, message: 'Backup válido.' };
}
