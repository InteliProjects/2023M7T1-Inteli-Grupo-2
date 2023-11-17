const ton = [
    {
      cenario: 'Débito',
      taxa: 0.85,
      rendaLiquida:[0,3000],
    },
    {
      cenario: 'Crédito à Vista',
      taxa: 3.15,
      rendaLiquida: [3001, 3600],
    },
    {
      cenario: 'Parcelado em 2x',
      taxa: 3.99,
      rendaLiquida:[3601,3800],
    },
    {
      cenario: 'Parcelado em 3x',
      taxa: 4.99,
      rendaLiquida:[3801,4000],
    },
    {
      cenario: 'Parcelado em 4x',
      taxa: 5.99,
      rendaLiquida:[4001,4200],
    },
    {
      cenario: 'Parcelado em 5x',
      taxa: 6.99,
      rendaLiquida:[4201,4500],
    },
    ];
    
  // Example of how to access the values in a loop: 
  for (const plano of planos) {
    console.log(`Cenário: ${plano.cenario}`);
    console.log(`Taxa: ${plano.taxa}%`);
    console.log(`Renda Líquida: R$ ${plano.rendaLiquida.toFixed(2)}`);
    console.log('--------------------------------');
  }
  