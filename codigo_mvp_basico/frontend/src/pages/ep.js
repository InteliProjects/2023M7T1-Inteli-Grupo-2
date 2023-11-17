const ep = [
    {
      cenario: 'Débito',
      taxa: 1.40,
      rendaLiquida: [4501, 4600],
    },
    {
      cenario: 'Crédito à Vista',
      taxa: 1.35,
      rendaLiquida: [4601, 4800],
    },
    {
      cenario: 'Parcelado em 2x',
      taxa: 12.49,
      rendaLiquida: [4801, 4900],
    },
    {
      cenario: 'Parcelado em 3x',
      taxa: 15.39,
      rendaLiquida: [4901, 5200],
    },
    {
      cenario: 'Parcelado em 4x',
      taxa: 14.59,
      rendaLiquida: [5201, 5500],
    },
    {
      cenario: 'Parcelado em 5x',
      taxa: 12.39,
      rendaLiquida: [5501, 5800],
    },
  ];
  
  // Example of how to access the values in a loop for the array 'ton':
  for (const plano of ton) {
    console.log(`Cenário: ${plano.cenario}`);
    console.log(`Taxa: ${plano.taxa}%`);
    console.log(`Faixa de Renda Líquida: R$ ${plano.rendaLiquida[0]} - R$ ${plano.rendaLiquida[1]}`);
    console.log('--------------------------------');
  }
  