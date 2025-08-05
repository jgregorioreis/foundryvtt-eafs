/**
 * Sistema EA&FS para Foundry VTT
 */

// Classe da ficha de personagem
class EAFSActorSheet extends ActorSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["eafs", "sheet", "actor"],
      template: "systems/eafs/sheets/character.html",
      width: 600,
      height: 600,
      tabs: []
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    
    // Adiciona dados do sistema
    context.system = context.actor.system;
    
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Botão para rolar 1d6
    html.find('.roll-d6').click(this._onRollD6.bind(this));
    
    // Botão para rolar 1d20
    html.find('.roll-d20').click(this._onRollD20.bind(this));
  }

  /**
   * Rola 1d6 e exibe no chat
   */
  async _onRollD6(event) {
    event.preventDefault();
    
    const roll = new Roll("1d6");
    await roll.evaluate();
    
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `${this.actor.name} rolou 1d6`
    });
  }

  /**
   * Rola 1d20 e exibe no chat
   */
  async _onRollD20(event) {
    event.preventDefault();
    
    const roll = new Roll("1d20");
    await roll.evaluate();
    
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `${this.actor.name} rolou 1d20`
    });
  }
}

// Hook de inicialização
Hooks.once('init', async function() {
  console.log('EA&FS | Inicializando sistema...');
  
  // Registra a ficha de personagem
  Actors.registerSheet("eafs", EAFSActorSheet, {
    types: ["character"],
    makeDefault: true
  });
  
  console.log('EA&FS | Sistema inicializado com sucesso!');
});

// Hook para quando o sistema estiver pronto
Hooks.once('ready', async function() {
  console.log('EA&FS | Sistema pronto para uso!');
});

