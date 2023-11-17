const flex = [
    {
      cenario: 'Débito',
      taxa: 0.90,
      rendaLiquida:[5800,6200],
    },
    {
      cenario: 'Crédito à Vista',
      taxa: 4.80,
      rendaLiquida: [6201, 7500],
    },
    {
      cenario: 'Parcelado em 2x',
      taxa: 5.20,
      rendaLiquida:[7501,7800],
    },
    {
      cenario: 'Parcelado em 3x',
      taxa: 8.90,
      rendaLiquida:[7801,9500],
    },
    {
      cenario: 'Parcelado em 4x',
      taxa: 10.20,
      rendaLiquida:[9501,10500],
    },
    {
      cenario: 'Parcelado em 5x',
      taxa: 15.70,
      rendaLiquida:[10500,"infinito"],
    },
    ];
    
  // Example of how to access the values in a loop: 
  for (const plano of planos) {
    console.log(`Cenário: ${plano.cenario}`);
    console.log(`Taxa: ${plano.taxa}%`);
    console.log(`Renda Líquida: R$ ${plano.rendaLiquida.toFixed(2)}`);
    console.log('--------------------------------');
  }
  