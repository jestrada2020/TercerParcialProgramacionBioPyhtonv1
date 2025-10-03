const correctAnswers = {
  // Categoría 1: Ciclos FOR básicos (7 preguntas = 7 puntos)
  q1: ["for", "%", "else"],
  q2: [">=", "elif", "else"],
  q3: ["len", "continue", "in"],
  q4: ["lower", "if", "+="],
  q5: ["range", "11", "+="],
  q6: ["for", "==", "break"],
  q7: ["<", "str", "else"],

  // Categoría 2: Ciclos WHILE (6 preguntas = 12 puntos)
  q8: ["while", "<=", "+="],
  q9: ["while", "True", "break"],
  q10: [">", "*=", ":"],
  q11: ["while", "pop", "len"],
  q12: ["!=", "lower", "if"],
  q13: [">", "-="],

  // Categoría 3: Iteración en estructuras (6 preguntas = 12 puntos)
  q14: ["i", "enumerate", "1"],
  q15: ["zip", "<", "categoria"],
  q16: ["for", "in", "else"],
  q17: ["latitud", "<", "i"],
  q18: ["<", "[i]", "+="],
  q19: ["False", "and", "True"],

  // Categoría 4: Algoritmos clásicos (6 preguntas = 9 puntos)
  q20: ["for", "+=", "//"],
  q21: ["range", "-1", "*="],
  q22: ["range", "a", "13"],
  q23: ["while", "<=", "34"],
  q24: ["1", "+="],
  q25: ["<", "=="],

  // Categoría 5: Matrices (5 preguntas = 10 puntos)
  q26: ["for", "in", "print"],
  q27: ["range", "len", "[i]"],
  q28: ["==", "True", "break"],
  q29: ["[]", "append", "fila_actual"],
  q30: ["<", "+="]
};

const pointValues = {
  // Categoría 1: 1 punto cada una
  q1: 1, q2: 1, q3: 1, q4: 1, q5: 1, q6: 1, q7: 1,

  // Categoría 2: 2 puntos cada una
  q8: 2, q9: 2, q10: 2, q11: 2, q12: 2, q13: 2,

  // Categoría 3: 2 puntos cada una
  q14: 2, q15: 2, q16: 2, q17: 2, q18: 2, q19: 2,

  // Categoría 4: q20 y q24 = 1 punto, q21-q23 = 2 puntos, q25 = 1 punto
  q20: 1, q21: 2, q22: 2, q23: 2, q24: 1, q25: 1,

  // Categoría 5: 2 puntos cada una
  q26: 2, q27: 2, q28: 2, q29: 2, q30: 2
};