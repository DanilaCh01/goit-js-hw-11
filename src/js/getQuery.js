function getQuery(string) {
  return string.trim().toLowerCase().split(' ').join('+');
}

export { getQuery };