<template>
  <v-layout column justify-center>
    <v-flex>
      <v-tabs fixed-tabs v-model="tab">
        <v-tab key="printer-list">Принтеры</v-tab>
        <v-tab-item key="printer-list">
          <v-card flat>
            <v-card-title class="headline">Принтеры</v-card-title>
            <v-card-actions>
              <v-dialog v-model="editPrinter" persistent max-width="500px">
                <v-btn color="primary" dark slot="activator" @click="addPrinter">Добавить</v-btn>
                <v-card v-if="printer">
                  <v-card-title>
                    <span class="headline">Новый Принтер</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Имя" v-model="printer.name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            label="Модель"
                            :items="printerModels"
                            item-text="title"
                            v-model="printer.model"
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*обязательное поле</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click.native="editPrinter = false">Close</v-btn>
                    <v-btn color="success" flat @click.native="savePrinter">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
            <v-card-text>
              <template v-if="printers.length <= 0">
                <v-jumbotron color="grey lighten-2">
                  <v-container>
                    <v-layout align-center>
                      <v-flex>
                        <h3 class="title">У вас пока нет принтеров</h3>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-jumbotron>
              </template>
              <template v-else>
                <v-data-table
                  :headers="headers"
                  :items="printers"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td><span v-if="props.items.model">{{ props.item.model.title }}</span><span v-else>Неизвестна</span></td>
                  </template>
                </v-data-table>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab key="printer-model-list">Модели Принтеров</v-tab>
        <v-tab-item key="printer-model-list">
          <v-card flat>
            <v-card-title class="headline">Модели Принтеров</v-card-title>
            <v-card-actions>
              <v-dialog v-model="editPrinterModel" persistent max-width="500px">
                <v-btn color="primary" dark slot="activator" @click="addPrinterModel">Добавить</v-btn>
                <v-card v-if="printerModel">
                  <v-card-title>
                    <span class="headline" v-text="printerModel.title"></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Название" v-model="printerModel.title" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*обязательное поле</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click.native="editPrinterModel = false">Close</v-btn>
                    <v-btn color="success" flat @click.native="savePrinterModel">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
            <v-card-text>
              <template v-if="printerModels.length <= 0">
                <v-jumbotron color="grey lighten-2">
                  <v-container>
                    <v-layout align-center>
                      <v-flex>
                        <h3 class="title">Вы пока не добавили ни одной модели принтера</h3>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-jumbotron>
              </template>
              <template v-else>
                <v-data-table
                  :headers="printerModelHeaders"
                  :items="printerModels"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.title }}</td>
                  </template>
                </v-data-table>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab key="cartridge-model-list">Модели Картриджей</v-tab>
        <v-tab-item key="cartridge-model-list">
          <v-card flat>
            <v-card-title class="headline">Модели Картриджей</v-card-title>
            <v-card-actions>
              <v-dialog v-model="editCartridgeModel" persistent max-width="500px">
                <v-btn color="primary" dark slot="activator" @click="addCartridgeModel">Добавить</v-btn>
                <v-card v-if="cartridgeModel">
                  <v-card-title>
                    <span class="headline" v-text="cartridgeModel.title"></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Название" v-model="cartridgeModel.title" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*обязательное поле</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click.native="editCartridgeModel = false">Close</v-btn>
                    <v-btn color="success" flat @click.native="saveCartridgeModel">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
            <v-card-text>
              <template v-if="cartridgeModels.length <= 0">
                <v-jumbotron color="grey lighten-2">
                  <v-container>
                    <v-layout align-center>
                      <v-flex>
                        <h3 class="title">Вы пока не добавили ни одной модели картриджа</h3>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-jumbotron>
              </template>
              <template v-else>
                <v-data-table
                  :headers="cartridgeModelHeaders"
                  :items="cartridgeModels"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.title }}</td>
                  </template>
                </v-data-table>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'printers',
  computed: {
    printers: function () { return this.$store.state.printer.printers },
    printerModels: function () { return this.$store.state.printer.printerModels },
    cartridgeModels: function () { return this.$store.state.printer.cartridgeModels }
  },
  data: () => {
    return {
      tab: null,
      editPrinter: null,
      editPrinterModel: null,
      editCartridgeModel: null,
      printer: null,
      printerModel: null,
      cartridgeModel: null,
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Модель', value: 'model.title' }
      ],
      printerModelHeaders: [
        { text: 'Название', value: 'title' }
      ],
      cartridgeModelHeaders: [
        { text: 'Название', value: 'title' }
      ]
    }
  },
  methods: {
    addPrinter: function () {
      this.printer = this.$store.getters.newPrinter
      this.editPrinter = true
    },
    savePrinter: function () {
      this.editPrinter = false
      this.$store.commit('ADD_PRINTER', this.printer)
    },
    addPrinterModel: function () {
      this.printerModel = this.$store.getters.newPrinterModel
      this.editPrinterModel = true
    },
    savePrinterModel: function () {
      this.editPrinterModel = false
      this.$store.commit('ADD_PRINTER_MODEL', this.printerModel)
    },
    addCartridgeModel: function () {
      this.cartridgeModel = this.$store.getters.newCartridgeModel
      this.editCartridgeModel = true
    },
    saveCartridgeModel: function () {
      this.editCartridgeModel = false
      this.$store.commit('ADD_CARTRIDGE_MODEL', this.cartridgeModel)
    }
  }
}
</script>

<style scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
