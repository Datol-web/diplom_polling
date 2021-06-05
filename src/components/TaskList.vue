<template>
  <div>
    <h1 class="title_list_opros">Список опросов</h1>

    <hr />

    <div class="list_tasks-items" v-if="surveys.length">
      <!-- перебираем в цикле опросы -->
      <div class="taks_itemI" v-for="(item, index) in surveys" :key="index">
        <!-- {{item}} -->
        <!-- <span>{{ index }}</span> -->
        <span>{{ item.info.otherinfo.title }}</span>
        <span>{{ moment(item.info.otherinfo.date).format("YYYY-MM-DD") }}</span>
        <router-link
          tag="button"
          class="btn btn-small"
          :to="{
            name: 'task',
            params: { searchTags: item, id: item.id },
          }"
        >
          Открыть
        </router-link>
        <button
          v-on:click="delTask"
          v-bind:id-task="item.id"
          v-bind:index="index"
          class="deltaks btn red darken-1 btn-small"
        >
          Удалить
        </button>
      </div>
    </div>
    <!-- перебираем в цикле опросы -->
    <p v-else>Нет опросов</p>

    <transition name="fade">
      <div class="delTaskMessage" v-if="showModal == true">
        <h4 class="delTask_title">Подтвредить удаление</h4>

        <div class="controls-finish">
          <button v-on:click="delFinish" class="btn red darken-1">
            Да
          </button>
          <button v-on:click="noDelTask" class="btn">Нет</button>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
import firebase from "firebase/app"; //библиотека для работы с базой, ниже его компоненты
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import moment from "moment";

export default {
  data: () => ({
    surveys: "",
    dateparse: "",
    delTrigger: false,
    showModal: false,
    nowIdTaks: "",
    nowIndexTask: ""
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks;
    },
  },
  mounted() {
    window.M.FormSelect.init(this.$refs.select);
  },
  beforeCreate() {
    const db = firebase.firestore();
    // db.collection("surveys").onSnapshot((snap) => {
    //   this.surveys = snap.docs.map((doc) => doc.data()); //получение опросов из бады данных
    // });

    db.collection("surveys")
      .get()
      .then((querySnapshot) => {
        let dataopros = [];
        querySnapshot.forEach((doc) => {
          let getDataInArray = doc.data();
          let newData = {
            id: doc.id,
            info: getDataInArray,
          };
          dataopros.push(newData);
        });
        this.surveys = dataopros;
      });
  },
  methods: {
    delTask(e) {
      this.showModal = true;
      let idTask = e.target.getAttribute("id-task");
      let IndexTask = e.target.getAttribute("index");
      this.nowIdTaks = idTask;
      this.nowIndexTask = IndexTask;
    },
    delFinish() {
      let idTask = this.nowIdTaks;
      this.surveys.splice(this.nowIndexTask, 1);
      this.showModal = false;

      const db = firebase.firestore();
      db.collection("surveys")
        .doc(idTask)
        .delete()
        .then(() => {
          console.log("Опрос удален");
        })
        .catch((error) => {
          console.error("Ошибка при удалении опроса: ", error);
        });
    },
    noDelTask(){
      this.showModal = false;
    },
    moment: function () {
      return moment(); //инициалтзация библиотеки момент для преобразованяи даты
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>