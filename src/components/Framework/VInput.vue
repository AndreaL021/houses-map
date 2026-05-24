


<template>
  <div
    class="input-container"
    :class="{ focused: isFocused, value: isValuePresent, outlined: outlined, rounded: rounded }"
    :style="{
      width: width,
      height: '24px',
      padding:clearable&&type=='password' ? '5px 50px 5px 5px' : clearable||type=='password' ? '5px 30px 5px 5px' : '5px 5px 5px 5px',
    }"
  >
    <span @click="focusInput" class="label">{{ label }}</span>
    <input
      ref="Input"
      style="width: 100%; padding-left: 0; margin-top: 10px"
      :type="type_wrapper"
      :value="modelValue"
      :readonly="readonly"
      @focus="onFocus"
      @blur="onBlur"
      @input="updateModelValue($event.target.value)"
      @keydown="check($event)"
    />
    <slot name="appendIcon">
      <fa-i
        v-if="clearable&&modelValue"
        @click="updateModelValue(modelValue, true);"
        icon="fa-solid fa-circle-xmark"
        class="appendIcon"
        :style="{
          top: '9px',
          right: type=='password'?'30px':'5px'
        }"
      ></fa-i>
    </slot>
      <fa-i
        v-if="type=='password'"
        @click="type_wrapper=type_wrapper=='password'?'text':'password'"
        :icon="type_wrapper=='password'?'fa-solid fa-eye':'fa-solid fa-eye-slash'"
        class="appendIcon"
        :style="{
          top: '9px',
          right: '5px',
          opacity: '1'
        }"
      ></fa-i>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    width: {
      type: String,
      default: "auto",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocused: false, // Gestisce lo stato di focus
      type_wrapper:'text'
    };
  },
  mounted() {
    this.type_wrapper=this.type
  },
  computed: {
    isValuePresent() {
      if (this.type == "text"||this.type == "password") {
        return (
          this.modelValue !== null &&
          this.modelValue !== undefined &&
          this.modelValue !== ""
        );
      } else {
        return (
          this.modelValue !== null &&
          this.modelValue !== undefined &&
          !isNaN(this.modelValue)
        );
      }
    },
  },
  methods: {
    updateModelValue(value, clear) {
      if (clear) {
        value = this.type == "text"||this.type == "password" ? "" : 0;
      }
      this.$emit("update:modelValue", value);
    },
    check(event) {
      if (this.type == "number") {
        if (
          event.key === "e" ||
          event.key === "E" ||
          event.key === "-" ||
          event.key === "+" ||
          event.key === ","
        ) {
          event.preventDefault();
        }
      }
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
/* Rimuove frecce in Chrome, Safari e Edge */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Rimuove frecce in Firefox */
input[type="number"] {
    -moz-appearance: textfield; /* Per Firefox */
    appearance: textfield; /* Per altri browser */
}
.input-container {
  background: rgb(240, 240, 240);
  border: solid grey;
  border-width: 0 0 1px 0;
  padding-top: 2px !important;
  padding-bottom: 4px !important;
  position: relative;
}

.input-container.outlined {
  border: solid grey 1px;
  transition: border-color 0.3s;
  position: relative;
}

.rounded{
  border-radius: 8px;
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

.input-container:hover .appendIcon,
.input-container:hover .appendIcon {
  opacity: 1;
}
.appendIcon {
  font-size: 17px;
  color: grey;
  position: absolute;
  cursor: pointer;
  opacity: 0;
}
.appendIcon:hover {
  color: black;
}

input {
  border: none;
  padding-left: 0; /* Rimuove il padding a sinistra */
  background-color: transparent;
}
input:focus {
  outline: none;
}
</style>
