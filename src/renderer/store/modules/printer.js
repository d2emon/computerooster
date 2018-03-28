const state = {
  printers: [],
  printerModels: [],
  cartridgeModels: []
}

const getters = {
  newPrinter: state => ({
    name: 'Новый Принтер',
    model: ''
  }),
  newPrinterModel: function (state) {
    return {
      title: 'Новая Модель',
      cartridge: ''
    }
  },
  newCartridgeModel: function (state) {
    return {
      title: 'Новая Модель'
    }
  }
}

const mutations = {
  SET_PRINTERS (state, printers) {
    state.printers = printers
  },
  ADD_PRINTER (state, printer) {
    state.printers.push(printer)
  },
  ADD_PRINTER_MODEL (state, printerModel) {
    state.printerModels.push(printerModel)
  },
  ADD_CARTRIDGE_MODEL (state, cartridgeModel) {
    state.cartridgeModels.push(cartridgeModel)
  }
}

const actions = {
  loadPrinters ({ commit }) {
    // do something async
    commit('SET_PRINTERS', [])
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
