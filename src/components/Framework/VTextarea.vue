<template>
  <div
    class="input-container"
    :class="{ focused: isFocused, value: isValuePresent, outlined: outlined, rounded: rounded }"
    :style="{
      width: width,
    }"
  >
    <span @click="focusInput" class="label">{{ label }}</span>
    <textarea
      ref="Input"
      :value="modelValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="updateModelValue($event.target.value)"
      :rows="rows"
      :style="{
        resize: resizable ? 'vertical' : 'none',
        width: width,
        marginTop: '10px',
      }"
    ></textarea>
  </div>
</template>
  
  <script>
export default {
  props: {
    rows: {
      type: Number,
      default: 4,
    },
    label: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "auto",
    },
    modelValue: {
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isFocused: false, // Gestisce lo stato di focus
    };
  },
  created() {},
  computed: {
    isValuePresent() {
      return (
        this.modelValue !== null &&
        this.modelValue !== undefined &&
        this.modelValue !== ""
      );
    },
  },
  methods: {
    updateModelValue(value) {
      this.$emit("update:modelValue", value);
    },
    focusInput() {
      this.$refs.Input.focus();
    },
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
  },
};
</script>
  <style scoped>
.input-container {
  border: solid grey;
  border-width: 0 0 1px 0;
  padding: 5px;
  padding-bottom: 0px;
  overflow: hidden;
  position: relative;
  transition: border-color 0.3s;
  max-width: 100%;
  overflow: visible;
  background: rgb(240, 240, 240);
}

.rounded {
  border-radius: 8px;
}

.input-container.outlined {
  border: solid grey 1px;
}

.input-container.focused {
  border-color: black;
}

.label {
  color: grey;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease; /* Animazione */
  pointer-events: none;
}

.input-container.value .label,
.input-container.value .label {
  top: 7px;
  font-size: 13px;
  color: grey;
}
.input-container.focused .label,
.input-container.focused .label {
  top: 7px;
  font-size: 13px;
  color: black;
}

input {
  border: none;
  padding-left: 0; /* Rimuove il padding a sinistra */
  background-color: transparent;
}
textarea {
  border: none;
  outline: none;
  background-color: transparent;
  resize: both; /* Permette il ridimensionamento */
  overflow: auto; /* Barra di scorrimento */
  min-height: 50px; /* Altezza minima */
  min-width: 100px; /* Larghezza minima */
}

input:focus {
  outline: none;
}
</style>
  