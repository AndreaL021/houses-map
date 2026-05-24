<template>
  <div style="display: flex; align-items: center">
    <fa-i
      :style="{
        cursor: 'pointer',
        color:
          model_type == 'boolean' && modelValue
            ? 'rgb(0, 255, 0)'
            : model_type == 'boolean' && !modelValue
            ? 'red'
            : model_type == 'array' && checkArray()
            ? 'rgb(0, 255, 0)'
            : model_type == 'array' && !checkArray()
            ? 'red'
            : modelValue == itemValue
            ? 'rgb(0, 255, 0)'
            : 'red',
      }"
      @click="updateModelValue(modelValue)"
      :icon="
        'fa-solid fa-' +
        (rounded ? 'circle' : 'square') +
        (model_type == 'boolean' && modelValue
          ? '-check'
          : model_type == 'boolean' && !modelValue
          ? '-xmark'
          : model_type == 'array' && checkArray()
          ? '-check'
          : model_type == 'array' && !checkArray()
          ? '-xmark'
          : modelValue == itemValue
          ? '-check'
          : '-xmark')
      "
      :size="size ? size : null"
    ></fa-i>
    <span style="display: flex; align-items: center; margin-left: 5px">{{
      label
    }}</span>
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
      type: [String, Number, Boolean, Array],
      default: null,
    },
    size: {
      type: String,
      default: "sm",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    itemValue: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      isFocused: false, // Gestisce lo stato di focus
      model_type: null,
    };
  },
  mounted() {
    this.model_type = typeof this.modelValue;
    if (Array.isArray(this.modelValue)) {
      this.model_type = "array";
    }
    if (this.modelValue == null) {
      this.model_type = "number";
    }
  },
  methods: {
    checkArray() {
      if (this.modelValue.filter((item) => item == this.itemValue).length > 0) {
        return true;
      } else {
        return false;
      }
    },
    updateModelValue(value) {
      if (this.model_type == "boolean") {
        // boolean
        this.$emit("update:modelValue", !value);
        this.$emit("change");
      } else if (this.model_type == "array") {
        // array
        if (this.checkArray()) {
          let newVal = value.filter((item) => item != this.itemValue);
          this.$emit("update:modelValue", newVal);
          this.$emit("change");
        } else {
          let newVal = Array.from(value);
          newVal.push(this.itemValue);
          this.$emit("update:modelValue", newVal);
          this.$emit("change");
        }
      } else {
        // string/number
        if (value == this.itemValue) {
          let newVal = this.model_type == "string" ? "" : null;
          this.$emit("update:modelValue", newVal);
          this.$emit("change");
        } else {
          this.$emit("update:modelValue", this.itemValue);
          this.$emit("change");
        }
      }
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
  