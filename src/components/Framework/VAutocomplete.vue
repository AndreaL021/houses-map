


<template>
  <div
    class="input-container"
    :class="{
      focused: isFocused,
      value: isValuePresent,
      outlined: outlined,
      rounded: rounded,
    }"
    :style="{
      width: width,
      height: '24px',
      padding: clearable && !readonly ? '5px 30px 5px 5px' : '5px 5px 5px 5px',
    }"
    @blur="onBlur"
  >
    <span @click="onFocus" class="label">{{ label }}</span>
    <input
      ref="Input"
      style="width: 100%; padding-left: 0; margin-top: 10px"
      type="text"
      v-model="model"
      :readonly="readonly || select || multiple"
      @input="filtra(model)"
      @focus="onFocus"
      @blur="onBlur"
    />
    <!-- @blur="onBlur" -->
    <slot name="appendIcon">
      <fa-i
        v-if="clearable && !readonly && model"
        @click="onfocus, selectItem(model, true)"
        icon="fa-solid fa-circle-xmark"
        class="appendIcon"
        :size="outlined ? 'lg' : null"
      ></fa-i>
    </slot>
    <transition name="fade" appear>
      <div
        v-show="dropdown && !readonly"
        class="item-container"
        :style="{ width: '100%' }"
        @mousedown="onDropdownMouseDown"
      >
        <div v-if="multiple && !select && !readonly">
          <div class="input_container" style="display: flex; align-items: center;">
            <span
              @click="focusInput"
              style="font-size: 13px; margin-left: 5px; margin-right: 5px"
              >{{ searchLabel }}</span
            >
            <input
              ref="Search"
              style="border: solid 1px black; width: 100%; margin-top: 0px"
              type="text"
              v-model="search"
              @input="filtra(search)"
            />
          </div>
        </div>
        <div
          v-for="(item, i) in filteredItems"
          :key="i"
          class="item"
          :class="{ selected: checkSelected(item) }"
          @click="selectItem(item, false)"
        >
          {{ itemText != null ? item[itemText] : item }}
        </div>
      </div>
    </transition>
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
      type: [String, Number, Array],
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: [],
    },
    itemText: {
      type: String,
      default: null,
    },
    itemValue: {
      type: String,
      default: null,
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
    select: {
      type: Boolean,
      default: true,
    },
    searchLabel: {
      type: String,
      default: "search",
    },
  },
  data() {
    return {
      isFocused: false, // Gestisce lo stato di focus
      model: "",
      search: "",
      filteredItems: [],
      dropdown: false,
      isClickingDropdownItem: false,
    };
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.filteredItems = Array.from(this.items);
    this.updateModelDisplay();
    if (!this.itemText && !this.itemValue) {
      if (this.multiple) {
        let selected = [];
        this.modelValue.forEach((i) => {
          let newItem = this.filteredItems.find((a) => a == i);
          if (newItem) {
            selected.push(newItem);
          }
        });
        selected.forEach(
          (item, i) => (this.model = this.model + (i == 0 ? "" : " - ") + item)
        );
      } else {
        this.model = this.modelValue;
      }
    } else {
      if (this.multiple) {
        let selected = [];
        this.modelValue.forEach((item) => {
          let newItem = this.filteredItems.find(
            (a) => a[this.itemValue] == item
          );
          if (newItem) {
            selected.push(newItem);
          }
        });
        selected.forEach(
          (item, i) =>
            (this.model =
              this.model + (i == 0 ? "" : " - ") + item[this.itemText])
        );
      } else {
        this.model =
          this.filteredItems.filter((i) => i[this.itemValue] == this.modelValue)
            .length > 0
            ? this.filteredItems.filter(
                (i) => i[this.itemValue] == this.modelValue
              )[0][this.itemText]
            : "";
      }
    }
  },
  watch: {
    items(newVal) {
      if (newVal) {
        this.filteredItems = Array.from(newVal);
      }
    },
    modelValue() {
      this.updateModelDisplay();
      this.search="";
      if (!this.select) {
        this.filtra(null);
      }
    },
  },
  computed: {
    isValuePresent() {
      return (
        this.model !== null && this.model !== undefined && this.model !== ""
      );
    },
  },
  methods: {
    updateModelDisplay() {
      if (!this.itemText && !this.itemValue) {
        this.model = this.multiple
          ? this.modelValue.join(" - ")
          : this.modelValue;
      } else {
        if (this.multiple) {
          const texts = this.modelValue.map((item) => {
            const temp = this.items.find((a) => a[this.itemValue] == item);
            return temp ? temp[this.itemText] : "";
          });
          this.model = texts.filter(Boolean).join(" - ");
        } else {
          const temp = this.items.find(
            (a) => a[this.itemValue] == this.modelValue
          );
          this.model = temp ? temp[this.itemText] : "";
        }
      }
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdown = false;
        this.isFocused = false;
      }
    },
    checkSelected(item) {
      if (this.itemText && this.itemValue) {
        if (this.multiple) {
          return (
            this.modelValue.filter((i) => i == item[this.itemValue]).length > 0
          );
        } else {
          return this.model == item[this.itemText];
        }
      } else {
        if (this.multiple) {
          return this.modelValue.filter((i) => i == item).length > 0;
        } else {
          return this.model == item;
        }
      }
    },
    filtra(item) {
      if (!item) {
        this.filteredItems = [...this.items];
        return;
      }
      if (this.itemText && this.itemValue) {
        this.filteredItems = this.items.filter((i) =>
          i[this.itemText]
            .toString()
            .toLowerCase()
            .includes(item.toString().toLowerCase())
        );
      } else {
        this.filteredItems = this.items.filter((i) =>
          i.toString().toLowerCase().includes(item.toString().toLowerCase())
        );
      }
    },
    selectItem(item, clear) {
      if (clear) {
        item = "";
        if (this.multiple) {
          this.$emit("update:modelValue", []);
          this.$emit("change");
          return;
        } else {
          this.$emit("update:modelValue", null);
          this.$emit("change");
          return;
        }
      }

      if (!this.itemValue && !this.itemText) {
        // Caso semplice (array di valori primitivi)
        if (this.multiple) {
          let newVal = [...this.modelValue]; // copia sicura
          const index = newVal.indexOf(item);
          if (index >= 0) {
            newVal.splice(index, 1); // rimuovi
          } else {
            newVal.push(item); // aggiungi
          }
          this.$emit("update:modelValue", [...newVal]); // emetti nuova copia
          this.$emit("change");
        } else {
          const newVal = this.modelValue === item ? null : item;
          this.model = newVal || "";
          this.$emit("update:modelValue", newVal);
          this.$emit("change");
        }
      } else {
        // Caso con itemText / itemValue
        if (this.multiple) {
          let newVal = [...this.modelValue]; // copia sicura
          const id = item[this.itemValue];
          const index = newVal.indexOf(id);
          if (index >= 0) {
            newVal.splice(index, 1); // rimuovi
          } else {
            newVal.push(id); // aggiungi
          }
          this.$emit("update:modelValue", [...newVal]); // forza reattività
          this.$emit("change");
        } else {
          const newVal =
            this.modelValue === item[this.itemValue]
              ? null
              : item[this.itemValue];
          this.$emit("update:modelValue", newVal);
          this.$emit("change");
        }
      }

      if (!this.multiple) {
        this.dropdown = false;
      }

      this.isClickingDropdownItem = false;
    },

    onFocus() {
      this.$refs.Input.focus();
      this.isFocused = true;
      this.dropdown = true;
      this.filteredItems = Array.from(this.items);
    },
    onBlur() {
      if (!this.isClickingDropdownItem) {
        this.isFocused = false;
        this.dropdown = false;
      }
      this.isClickingDropdownItem = false;
    },
    onDropdownMouseDown() {
      this.isClickingDropdownItem = true;
    },
  },
};
</script>
<style scoped>
.input-container {
  background: rgb(240, 240, 240);
  border: solid grey;
  border-width: 0 0 1px 0;
  padding-top: 2px !important;
  padding-bottom: 4px !important;
  position: relative;
  overflow: visible;
}

.input-container.outlined {
  border: solid grey 1px;
  transition: border-color 0.3s;
  position: relative;
}

.rounded {
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
  top: 8px;
  right: 5px;
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
.item-container {
  position: absolute;
  top: calc(100%+18px);
  transform: translateX(-50%) !important;
  left: 50%;
  z-index: 1000;
  background-color: white;
  border: solid 1px;
  max-height: 300px;
  overflow-y: scroll;
}
.item {
  margin: 0px 0px 0px 0px;
  padding-left: 10px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.item:hover {
  cursor: pointer;
  background-color: rgb(174, 174, 174);
}
.selected {
  background-color: rgb(132, 132, 132);
}
</style>
