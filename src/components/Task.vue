<template>
  <div class="row">
    <div
      v-if="showblock == true"
      class="task_item">
      <h1>Тема опроса: {{ surveyNow.otherinfo.title }}</h1>
      <p class="description_task">Описание: {{ surveyNow.otherinfo.description }}</p>

      <div class="title_qw" v-for="surveyI of surveyNow.data" :key="surveyI.id">
        {{ surveyI.itemopros.title }}

        <div v-for="user in surveyI.itemopros.variants" :key="user.key">
          <label>
            <input type="checkbox" v-bind:value="user" v-model="checkedNames" />
            <span class="title_qw-item">{{ user.variantinfo }}</span>
          </label>
        </div>
      </div>

      <div class="finish">
        <a @click="finish" class="waves-effect waves-light btn-large">Готово</a>
      </div>
    </div>

    <div class="task_item finish_step" v-else>
        <h3 class="finish_step__title">Поздравляю, вы прошли опрос</h3>
        <h4 class="finish_step__title">Вы можете отправить результат на почту или сохранить в файл</h4>

        <div class="controls-finish">

          <div class="btn modal-trigger" @click="showModal">Отправить на почту</div>
          <!-- Modal Structure -->
          <div :class="['modal', open ? 'open' : '']" :style="[open ? modalStyle: '']">
            <div class="modal-content">
              <h4>Отправить резульататы на почту</h4>
              <form>
                <input type='text' placeholder="Ваше имя"/>
                <input type='text' placeholder="Ваш email"/>
                <button class="btn" @click='send()'>Отправить результаты на почту</button>
              </form>
              <button class="btn" @click="step1">Назад</button>
            </div>
          </div>

          <download-excel 
            :data="checkedNames"
            :name='`${surveyNow.otherinfo.title + " " + moment(surveyNow.otherinfo.date).format("YYYY-MM-DD")}.xls`'>
            <a class="waves-effect waves-light btn">Экспорт в Excel</a>
          </download-excel>

        </div>



    </div>

  </div>
</template>

<script>
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import moment from 'moment'
 
Vue.component("downloadExcel", JsonExcel);

export default {
  props: ["title", "survey"],
  data() {
    return { //через параматры, которые предает роут получаем данных об обпросе
      id: this.$route.params["id"],
      surveyNow: this.$route.params.searchTags,
      checkedNames: [],
      showblock: true,
      open: false,
      modalStyle: {
        'z-index': 1003,
        'display': 'block', 
        'opacity': 1,
        'transform': 'scaleX(1); top: 10%'
      }
    };
  },
  mounted() {
    window.M.Modal.init("#modal1"); //инициализация модалки
  },
  methods: {
    finish() {
      this.showblock = false //при завершении скрываем блок
    },
    showModal() { //открытие модалки, если в опросе не выбран хотя бы одни ответ, то будет вываливаться в ошибку
      if(!this.checkedNames.length == 0) {
        this.open = true;
      }else {
        alert("Необходимо пройти опрос")
      }
     
    },
    step1(){
      this.open = false;
    },
    moment: function () {
      return moment(); //инизализация библиотеки для работы со временем
    }
  }
};
</script>

<style lang="scss" scoped>
</style>