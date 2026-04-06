export function extractEntities(text) {
  const budgetMatch = text.match(/(\d+)\s*(ر\.س|دولار|usd)/i);
  const priceMatch = text.match(/(غالي|رخيص|متوسط|اقتصادي|فاخر)/i);
  const useMatch = text.match(/(برمجة|دراسة|ألعاب|تصميم|عمل مكتبي)/i);

  return {
    budgetNumeric: budgetMatch ? parseFloat(budgetMatch[1]) : null,
    budgetLabel: priceMatch ? priceMatch[1].toLowerCase() : null,
    useCase: useMatch ? useMatch[1].toLowerCase() : null
  };
}
