function generateWords(): string {
  const timestamp = Date.now();
  const caracteres = 'abcdefghijklmnopqrstuvwxyz';
  const comprimentoMinimo = 6;
  const comprimentoMaximo = 10;

  // Usar o timestamp como semente para o gerador de números aleatórios
  let seed = timestamp;
  function aleatorio() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Determinar o comprimento da palavra (entre 6 e 10 caracteres)
  const comprimento = Math.floor(aleatorio() * (comprimentoMaximo - comprimentoMinimo + 1)) + comprimentoMinimo;

  // Gerar a palavra
  let palavra = '';
  for (let i = 0; i < comprimento; i++) {
    const indice = Math.floor(aleatorio() * caracteres.length);
    palavra += caracteres[indice];
  }

  return palavra;
}
