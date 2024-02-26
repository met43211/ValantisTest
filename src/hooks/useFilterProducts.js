export const useFilterProducts = (products) => {
  const normalizeProducts = []
  const usedKeys = {}
  products.forEach(product => {
    if (!usedKeys[product.id]) {
      normalizeProducts.push(product)
      usedKeys[product.id] = true
    }
  });
  return normalizeProducts
}
