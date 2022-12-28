<script setup lang="ts">
import type { Field } from "../types/fields";
import { reactive, ref } from "vue";
import draggable from "vuedraggable";

const output = ref("");
const fields: Field[] = reactive([]);

const addField = () => {
  fields.push({
    id: `new_field_${fields.length + 1}`,
    required: false,
    type: "INPUT",
    name: "",
  });
};

const submit = () => {
  output.value = btoa(JSON.stringify(fields));
};

const deleteField = (index: number) => {
  fields.splice(index, 1);
};
</script>

<template>
  <div>
    <h1>Edit</h1>
  </div>

  <!-- ADD BUTTON -->
  <div style="margin-bottom: 50px">
    <button type="button" @click="addField()">ADD FIELD</button>
  </div>

  <!-- DRAGGABLE LIST -->
  <draggable
    tag="div"
    :list="fields"
    class="list-group"
    handle=".handle"
    item-key="id"
  >
    <template #item="{ index }: { element: Field, index: number }">
      <div class="field-group">
        <div class="handle">DRAG</div>

        <div class="input-group">
          <label>Type</label>
          <select v-model="fields[index].type">
            <option value="DIVIDER">Divider</option>
            <option value="INPUT">Input</option>
            <option value="NUMBER">Number</option>
            <option value="CHECKBOX">Checkbox</option>
          </select>
        </div>
        <div class="input-group" v-if="'DIVIDER' !== fields[index].type">
          <label>ID</label>
          <input v-model="fields[index].id" />
        </div>

        <div class="input-group">
          <label>Name</label>
          <input v-model="fields[index].name" type="text" />
        </div>
        <div
          class="input-group"
          v-if="['INPUT', 'NUMBER'].includes(fields[index].type)"
        >
          <label>Default Value</label>
          <input
            v-model="fields[index].value"
            :type="'NUMBER' === fields[index].type ? 'number' : 'text'"
          />
        </div>

        <div class="input-group" v-if="'CHECKBOX' === fields[index].type">
          <label>Default value</label>
          <input v-model="fields[index].checked" type="checkbox" />
        </div>

        <div class="input-group" v-if="'DIVIDER' !== fields[index].type">
          <label>Required</label>
          <input v-model="fields[index].required" type="checkbox" />
        </div>

        <button type="button" @click="deleteField(index)">Delete</button>
      </div>
    </template>
  </draggable>

  <!-- SUBMIT BUTTON -->
  <div style="margin: 40px 0">
    <button type="button" @click="submit()">SUBMIT</button>
  </div>

  <!-- RESULT AREA (base64) -->
  <div>
    <textarea readonly class="code" v-model="output"></textarea>
  </div>
</template>

<style>
.code {
  width: 100%;
  height: 200px;
}

.handle {
  cursor: grab;
}

.field-group {
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #777;
}

.input-group {
  margin-bottom: 10px;
}
</style>
