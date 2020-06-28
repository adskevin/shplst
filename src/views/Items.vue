<template>
  <div>
    <b-container class="mt-5">
      <b-row>
        <b-col cols="12">
          <b-card>
            <div slot="header">
              <b-row>
                <b-col cols="9">
                  <h4>{{lista.name}}</h4>
                </b-col>
                <b-col cols="3" style="text-align: right;">
                  <b-button small variant="info" @click="addItem">
                    <span>Inserir</span>
                  </b-button>
                </b-col>
              </b-row>
            </div>
            <div class="tamanhoFixo">
              <b-table
                responsive
                :fields="fieldsItem"
                :items="item"
                :show-empty="true"
                empty-text="Não há itens na lista."
              >
                <template v-slot:cell(actions)="row">
                  <b-button small class="mr-1" variant="info" @click="editItem(row.item.id)">Editar</b-button>
                  <b-button small variant="danger" @click="deleteItem(row.item.id)">Deletar</b-button>
                </template>
                <template v-slot:cell(adicionarItens)="row">
                  <b-button
                    small
                    class="mr-1"
                    variant="info"
                    @click="adicionarItensLista(row.item.id)"
                  >Adicionar Itens</b-button>
                </template>
              </b-table>
            </div>
            <b-row>
              <b-col cols="9"></b-col>
              <b-col cols="3" style="text-align: right;">
                <b-button variant="primary" @click="voltarLista()">Voltar</b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-modal hide-footer id="modalAddItens">
        <template
          v-slot:modal-title
        >{{itensSelecionada.id == undefined ? 'Adicionar um item a Lista de Compras' : 'Editar Item da Lista de Compras'}}</template>
        <b-form-row>
          <b-col cols="12">
            <b-alert variant="danger" :show="alertError" class="p-3 mb-3 text-secondary">
              <div v-if="errors.length">
                <p class="pb-2 text-danger text-center">
                  <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                </p>
                <ul class="list-group">
                  <li
                    class="list-group-item list-group-item-danger"
                    v-for="error in errors"
                    :key="error"
                  >{{ error }}</li>
                </ul>
              </div>
            </b-alert>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <label for="titulo">Nome do Item:</label>
              <b-form-input aria-describedby="nome" v-model="itensSelecionada.name"></b-form-input>
              <b-form-invalid-feedback
                id="nome"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label for="titulo">Quantidade:</label>
              <b-form-input type="number" v-model="itensSelecionada.quantity"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label for="titulo">Tipo:</label>
              <b-form-input required v-model="itensSelecionada.type"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <label for="titulo">Nota:</label>
              <b-form-textarea v-model="itensSelecionada.note"></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col class="12" style="text-align: right;">
            <b-button variant="primary" class="mx-3" @click="saveItem()">Salvar</b-button>
            <b-button variant="secondary" @click="hideModal()">Cancelar</b-button>
          </b-col>
        </b-form-row>
      </b-modal>
      <div>
        <Chat
          iconColorProp="#e6e6e6"
          messageOutColorProp="#007bff"
          messageInColorProp="#f1f0f0"
          messageBackgroundColorProp="#ffffff"
          :messageListProp="content"
          :initOpenProp="initOpen"
          @onToggleOpen="handleToggleOpen"
          @onMessageWasSent="handleMessageReceived"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import { itemService } from "../service/item.service.js";
import { messagesService } from "@/service";
import Chat from "../components/Chat.vue";

export default {
  name: "itens",
  components: {
    Chat
  },
  data() {
    return {
      lista: [],
      item: [],
      itensSelecionada: {},
      fieldsItem: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "200px !important" }
        },
        {
          key: "name",
          label: "Nome do Item",
          thStyle: { width: "250px !important" }
        },
        {
          key: "quantity",
          label: "Quantidade",
          thStyle: { width: "150px !important" }
        },
        { key: "note", label: "Avisos" },
        { key: "type", label: "Tipo", thStyle: { width: "100px !important" } }
      ],
      errorMsg: null,
      infoMsg: null,
      toastCount: 0,
      errors: [],
      alertError: false,

      // Itens do Chat
      messageList: [],
      initOpen: false,
      toggledOpen: false,
      messageSend: {},
      nomeLogado: "",
      idLogado: null,
      content: []
    };
  },
  methods: {
    addItem() {
      this.itensSelecionada = {};
      this.$bvModal.show("modalAddItens");
      this.errors = [];
      this.alertError = false;
    },
    hideModal() {
      this.$bvModal.hide("modalAddItens");
    },
    findItens() {
      itemService.getByList(this.lista.id).then(response => {
        this.item = response.data;
      });
    },

    saveItem() {
      this.errors = [];
      this.alertError = false;
      
      if (!this.itensSelecionada.name) {
        this.errors.push("O campo 'Nome' é obrigatório.");
        this.alertError = true;
      }
      if (!this.itensSelecionada.type) {
        this.errors.push("O campo 'Tipo' é obrigatório.");
        this.alertError = true;
      }
      if (!this.itensSelecionada.quantity) {
        this.errors.push(
          "O campo 'Quantidade' é obrigatório e so aceita números."
        );
        this.alertError = true;
      }

      if (this.alertError == true) {
        return;
      }

      if (this.itensSelecionada.id == undefined) {
        this.itensSelecionada.List_id = this.lista.id;
        this.itensSelecionada.checked = false;
        itemService
          .save(this.itensSelecionada)
          .then(() => {
            this.findItens();
            this.$bvModal.hide("modalAddItens");
            this.infoMsg = "Item adicionado com sucesso!";
            this.showAlertSuccess();
          })
          .catch(error => {
            // this.errorMsg = error;
            console.log(error);
            this.errorMsg = "Erro ao salvar o item";

            this.showAlertDanger();
          });
      } else {
        itemService
          .edit(this.itensSelecionada, this.itensSelecionada.id)
          .then(() => {
            this.findItens();
            this.$bvModal.hide("modalAddItens");
            this.infoMsg = "Item atualizado com sucesso!";
            this.showAlertSuccess();
          })
          .catch(error => {
            // this.errorMsg = error;
            console.log(error);
            this.errorMsg = "Erro ao salvar o item";
            this.showAlertDanger();
          });
      }
    },
    editItem(idItem) {
      this.errors = [];
      this.alertError = false;
      const row = this.item.filter(data => data.id == idItem);
      if (row != null) {
        this.itensSelecionada = row[0];
        this.$bvModal.show("modalAddItens");
      }
    },
    deleteItem(idItem) {
      this.$bvModal
        .msgBoxConfirm("Deseja excluir esse item ?")
        .then(confirmed => {
          if (confirmed) {
            itemService.delete(idItem).then(() => {
              this.findItens();
              this.infoMsg = "Deletado com sucesso!";
              this.showAlertSuccess();
            });
          }
        })
        .catch(error => {
          this.errorMsg = error;
          this.showAlertDanger();
        });
    },
    voltarLista() {
      this.$router.push("/home");
    },
    showAlertSuccess(append = false) {
      this.toastCount++;
      this.$bvToast.toast(this.infoMsg, {
        title: "Sucesso",
        autoHideDelay: 5000,
        appendToast: append,
        variant: "success",
        solid: true
      });
    },
    showAlertDanger(append = false) {
      this.toastCount++;
      this.$bvToast.toast(this.errorMsg, {
        title: "Error",
        autoHideDelay: 5000,
        appendToast: append,
        variant: "danger",
        solid: true
      });
    },

    // Itens do Chat
    // Send message from you
    handleMessageReceived(message) {
      (this.messageSend.List_id = this.lista.id),
        (this.messageSend.Person_id = this.idLogado),
        (this.messageSend.content = message.body);
      this.messageSend.person_name = message.author;
      this.content.push(message);

      messagesService.save(this.messageSend);
    },
    handleToggleOpen(open) {
      this.toggledOpen = open;
    },

    findMensagens() {
      if (this.lista) {
        messagesService.getByList(this.lista.id).then(response => {
          this.messageList = response.data;
          this.content = [];
          this.messageList.forEach(element => {
            this.content.push({
              body: element.content,
              author: element.person_name
            });
          });
        });
      }
    }
  },
  mounted() {
    this.nomeLogado = localStorage.getItem("name");
    this.idLogado = localStorage.getItem("id");
    this.lista = this.$route.params.lista;
    if (this.lista == undefined) {
      this.$router.push({
        name: "home"
      });
    }
    this.findItens();
    this.findMensagens();
  },
  watch: {
    // messageList: function(newList) {
    //   const nextMessage = newList[newList.length - 1];
    //   const isIncoming = (nextMessage || {}).author !== "you";
    //   if (isIncoming && this.toggledOpen) {
    //     this.handleMessageResponseSound();
    //   }
    // }
  },
  created() {
    setInterval(this.findMensagens, 3000);
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

@media screen and (max-width: 1000px) {
  .tamanhoFixo {
    width: 100% !important;
    /* position: relative; */
    white-space: nowrap;
    overflow-x: hidden;
  }
}
</style>