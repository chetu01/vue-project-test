<script setup lang="ts">
import type { Field } from "../types/fields";
import { ref } from "vue";

const input = ref("");
const errorMsg = ref("");
const fields = ref<Field[]>([]);

const submit = () => {
  try {
    errorMsg.value = "";
    const data: Field[] = JSON.parse(atob(input.value));

    // validate data.
    if (!Array.isArray(data)) {
      throw "Invalid data";
    }

    console.log(data);

    fields.value = data;
  } catch (error) {
    errorMsg.value = "Invalid Input";
    console.error(error);
  }
};
</script>

<template>
  <div>
    <h1>Render</h1>
  </div>

  <div>
    <textarea class="code" v-model="input"></textarea>
  </div>

  {{ errorMsg }}

  <div style="margin: 40px 0">
    <button type="button" @click="submit()">SUBMIT</button>
  </div>

  <!-- RENDER FORM -->
  <div v-for="(field, index) in fields" :key="index" class="field-group">
    <div class="input-group" v-if="'DIVIDER' === field.type">
      <h2>{{ field.name }}</h2>
    </div>

    <div class="input-group" v-else>
      <label :for="field.id">{{ field.name }}</label>
      <template v-if="['INPUT', 'NUMBER'].includes(field.type)">
        <input
          :value="field.value"
          :type="'NUMBER' === field.type ? 'number' : 'text'"
          :name="field.id"
          :required="field.required"
        />
      </template>
      <template v-else>
        <input
          type="checkbox"
          value="1"
          :name="field.id"
          :checked="field.checked"
          :required="field.required"
        />
      </template>
    </div>
  </div>
</template>

<style>
.code {
  width: 100%;
  height: 200px;
}

.field-group {
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 10px;
}
</style>
