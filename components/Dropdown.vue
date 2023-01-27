<template>
  <div class="dropdown w-100">
    <button class="btn btn-secondary dropdown-toggle w-100 d-flex align-items-center" type="button"
            data-bs-toggle="dropdown">
      <span class="text-truncate flex-fill text-start">{{ activeText}}</span>
    </button>
    <ul class="dropdown-menu">
      <li v-for="(option, i) in options" :key="i + option.value"
          @click="$emit('update:modelValue', option.value)">
        <a class="dropdown-item" href="#"
           :class="{'active': option.value === modelValue}">
          {{ option.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { PropType } from '@vue/runtime-core'

export default defineComponent({
  name: 'Dropdown',
  props: {
    options: {
      type: Array as PropType<{ value: string, text: string }[]>,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const activeText = computed(() => {
      return props.options.find(option => option.value === props.modelValue).text
    })

    return {
      activeText
    }
  }
})
</script>

<style scoped>

</style>
