<template>
    <div class="input-container">
      <input
        type="color"
        ref="colorInput"
        @change="updateModelValue($event.target.value)"
        :style="{
          position: 'absolute',
          visibility: 'hidden',
  
          width:
            (typeof size == 'number'
              ? size
              : size == 'md'
              ? 15
              : size == 'lg'
              ? 20
              : 10) + 'px',
          height:
            (typeof size == 'number'
              ? size
              : size == 'md'
              ? 15
              : size == 'lg'
              ? 20
              : 10) + 'px',
        }"
      />
      <div
        :style="{
            border:'1px solid black',
          backgroundColor: modelValue,
          width:
            (typeof size == 'number'
              ? size
              : size == 'md'
              ? 15
              : size == 'lg'
              ? 20
              : 10) + 'px',
          height:
            (typeof size == 'number'
              ? size
              : size == 'md'
              ? 15
              : size == 'lg'
              ? 20
              : 10) + 'px',
          borderRadius: '100%',
          marginRight: '5px',
        }"
        @click="clickColore"
      ></div>
      <span
        v-if="label_span"
        style="display: flex; align-items: center;"
        >{{ label }}</span
      >
    </div>
  </template>
    
    <script>
  export default {
    props: {
      label: {
        type: String,
        default: "",
      },
      modelValue: {
        type: String,
        default: "",
      },
      size: {
        type: [String, Number],
        default: "sm",
      },
    },
    data() {
      return {
        label_span: true,
      };
    },
    watch: {
      modelValue(newValue) {
        this.$refs.colorInput.value = newValue;
      },
    },
    methods: {
      updateModelValue(value) {
        
        this.$emit("update:modelValue", value);
        
      },
      clickColore() {
        this.$refs.colorInput.click();
      },
    },
  };
  </script>
  <style scoped>
  .input-container {
    display: flex;
    padding: 5px;
  }
  .label {
    color: grey;
    position: absolute;
    left: 5px;
  }
  input {
    border: none;
    padding-left: 0;
    background-color: transparent;
  }
  textarea {
    border: none;
    outline: none;
    background-color: transparent;
    resize: none;
  }
  input:focus {
    outline: none;
  }
  </style>