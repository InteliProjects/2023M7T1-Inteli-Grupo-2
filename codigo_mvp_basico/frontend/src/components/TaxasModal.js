import React from 'react';
import '../pages/Home/taxas-modal-styles.css';
import Bandeira1 from '../assets/bandeira1.png';
import Bandeira2 from '../assets/bandeira2.png';

/**
 * Component that renders the modal where the user can see the taxes of the Ton plan
 * @param closeModal: function that closes the modal
 * @param buyTon: function that redirects the user to the page where he can choose the products from the Ton plan
 * */
const TaxasModal = ({ closeModal, buyTon }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
      <button className="close-button" onClick={closeModal}>X</button>
        <div className="corner-text">Ton</div>
        <div className="rectangle-below-ton">
          <div className="rectangle-text">
            O Ton tem taxas promocionais válidas para quem <strong>vende a partir de R$2.000,00 por mês</strong> no Plano PromoTon.
          </div>
          <div className="rectangle-text">
            As taxas são válidas por 30 dias, ou até atingir R$5.000,00 em vendas.
          </div>
        </div>
        <div className="recommended-text">
          Recomendado para
        </div>
        <div className="second-rectangle">
          Quem fatura até 15 mil reais por mês em vendas na Maquininha Ton
        </div>
        <div className="tax-promotom-text">Taxas Promotom</div>
        <div className="third-rectangle">
        <div className="table-header">
        <img src={Bandeira1} alt="Bandeira 1" className="flag-image" />
        <img src={Bandeira2} alt="Bandeira 2" className="flag-image" />
        <div className="center-word" style={{color: '#000' }}>Taxa Promo</div>
        <div className="right-word-header">Taxa Padrão</div>
      </div>  
        <div className="table-row">
    <div className="left-word">Débito</div>
    <div className="center-word">0,85%</div>
    <div className="right-word">1,35%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Crédito à vista</div>
    <div className="center-word">0,85%</div>
    <div className="right-word">3,15%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 2x</div>
    <div className="center-word">3,99%</div>
    <div className="right-word">5,49%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 3x</div>
    <div className="center-word">4,99%</div>
    <div className="right-word">6,19%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 4x</div>
    <div className="center-word">5,99%</div>
    <div className="right-word">6,99%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 5x</div>
    <div className="center-word">6,99%</div>
    <div className="right-word">7,69%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 6x</div>
    <div className="center-word">7,99%</div>
    <div className="right-word">8,49%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 7x</div>
    <div className="center-word">8,99%</div>
    <div className="right-word">8,99%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 8x</div>
    <div className="center-word">9,89%</div>
    <div className="right-word">9,99%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 9x</div>
    <div className="center-word">9,89%</div>
    <div className="right-word">10,99%</div>
  </div>
  <div className="table-row">
    <div className="left-word">Parcelado 10x</div>
    <div className="center-word">9,89%</div>
    <div className="right-word">11,49%</div>
  </div>
        </div>
        <button className="choose-ton-button" onClick={buyTon}>Escolher o Ton</button>
      </div>
    </div>
  );
};

export default TaxasModal;