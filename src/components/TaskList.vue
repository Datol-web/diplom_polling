<template>
  <div>
    <h1 class="title_list_opros">Список опросов</h1>

    <hr />

    <div
      class="list_tasks-items" 
      v-if="surveys.length">
      <!-- перебираем в цикле опросы -->
      <div
        class="taks_itemI"
        v-for="(item, index) in surveys" :key="index">
        <span>{{ index }}</span>
        <span>{{ item.otherinfo.title }}</span>
        <span>{{moment(item.otherinfo.date).format('YYYY-MM-DD')}}</span>
        <router-link
          tag="button"
          class="btn btn-small"
          :to="{
            name: 'task',
            params: { searchTags: item, id: item.otherinfo.id },
          }"
        >
          Открыть
        </router-link>
      </div>
    </div>
    <!-- перебираем в цикле опросы -->

    <p v-else>Нет опросов</p>
    
  </div>
</template>

<script>
import firebase from "firebase/app"; //библиотека для работы с базой, ниже его компоненты
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// import Task from './Task'
import moment from 'moment'



export default {
  data: () => ({
    surveys: "",
    dateparse: ""
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
    db.collection("surveys").onSnapshot((snap) => {
      this.surveys = snap.docs.map((doc) => doc.data()); //получение опросов из бады данных
    });
  },
  methods: {
    moment: function () {
      return moment(); //инициалтзация библиотеки момент для преобразованяи даты
    }
},
};
</script>

<style lang="scss" scoped>
.td {
  max-width: 400px;
}

.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>