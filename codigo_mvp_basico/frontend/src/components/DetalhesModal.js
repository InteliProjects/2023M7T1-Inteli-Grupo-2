import React from 'react';
import '../pages/Home/detalhes-modal-styles.css';

/**
 * Component that renders the modal where the user can see the details of the Stone plan
 * @param closeModal: function that closes the modal
 * @param buyStone: function that redirects the user to the page where he can choose the products from the Stone plan
 */
const DetalhesModal = ({ closeModal, buyStone }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">Essencial Pro</div>
        <button className="modal-close" onClick={closeModal}>X</button>
        <div className="modal-section">Recomendado para</div>
        <div className="modal-rect" id='modal-rect-fix'>
          Quem fatura até 30 mil reais por mês em vendas na Maquininha Stone.
        </div>
        <div className="modal-section2">Condições</div>
        <div className="modal-rect2">
        <div className="horizontal-line-row">
        <div className="left-word">Onde recebe</div>
        <div className="right-word">Conta Stone</div>
  </div>
  <div className="horizontal-line"></div>
  <div className="horizontal-line-row">
    <div className="left-word">Quando recebe</div>
    <div className="right-word">Todo dia</div>
  </div>
  <div className="horizontal-line"></div>
  <div className="horizontal-line-row">
    <div className="left-word">Perfil de contrato</div>
    <div className="right-word">Sem fidelização</div>
  </div>
  <div className="horizontal-line"></div>
  
  <div className="horizontal-line-row">
    <div className="left-word">Modelo de contratação</div>
    <div className="right-word">Comodato</div>
  </div>
  <div className="horizontal-line"></div>
  
  <div className="horizontal-line-row">
    <div className="left-word">Valor a partir de</div>
    <div className="right-word ">12x de R$ 49,90</div>
  </div>
      </div>
        <div className="modal-section3">Vendas por pix</div>
        <div className="modal-rect3">
        <div className="horizontal-line-row2">
          <div className="left-word left-align">Pix na maquininha</div>
          <div className="right-word">0,75%</div>
        </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Pix no app</div>
    <div className="right-word">Grátis</div>
        </div>
        </div>
        <div className="taxa-bandeiras">Taxa das bandeiras</div>
        <div className="modal-rect4">
        <div className="horizontal-line-row2">
    <div className="left-word left-align">Débito</div>
    <div className="right-word">1,40%</div>
  </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Crédito à vista</div>
    <div className="right-word">1,35%</div>
  </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Parcelado 2x</div>
    <div className="right-word">12,49%</div>
  </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Parcelado 3x</div>
    <div className="right-word">15,39%</div>
  </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Parcelado 4x</div>
    <div className="right-word">14,59%</div>
  </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Parcelado 6x</div>
    <div className="right-word">12,39%</div>
  </div>
  <div className="horizontal-line2"></div>
  <div className="horizontal-line-row2">
    <div className="left-word left-align">Parcelado 7x</div>
    <div className="right-word">36,42%</div>
      </div>
      </div>
      <button className="modal-button" onClick={buyStone}>Escolha o Essencial</button>
      </div>
    </div>
  );
};

export default DetalhesModal;
