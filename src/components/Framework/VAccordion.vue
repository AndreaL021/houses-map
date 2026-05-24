<template>
    <div
      
      class="accordion"
      :style="{ width: width, borderRadius: rounded ? '8px' : '' }"
    >
      <div v-for="(item, index) in items" :key="index">
        <div
          class="accordion-title"
          :class="{ 'is-open': openIndex.includes(index) }"
          @click="toggleOpen(index)"
        >
          <slot name="title" :item="item" :title="item.title">
            {{ item.title }}
          </slot>
        <slot name="icon">
          <div class="chevron-down">
          <fa-i
            icon="fa-solid fa-chevron-down"
            class="icon"
          ></fa-i>


          </div>
        </slot>
      </div>
      <div
        ref="contents"
        :class="['accordion-content', { 'is-open': openIndex.includes(index) }]"
        :style="{
          maxHeight: openIndex.includes(index) ? computedHeights[index] : '0',
          textAlign: 'left',
          whiteSpace: 'pre-line'
        }"
      >
        <slot name="content" :item="item" :content="item.content">
          {{ item.content }}
        </slot>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      openIndex: [], // Indice della sezione aperta
      computedHeights: [], // Altezze dinamiche calcolate
    };
  },
  props: {
    width: {
      type: String,
      default: "auto",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true, // Elenco delle sezioni
    },
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // Inizializza le altezze dinamiche
    this.$nextTick(() => {
      this.computedHeights = this.$refs.contents.map((content) =>
        content ? `${content.scrollHeight}px` : "0"
      );
    });
  },
  methods: {
    toggleOpen(index) {
      if (this.openIndex.includes(index)) {        
        // Chiusura
        this.openIndex = this.openIndex.filter((i)=>i!=index);
      } else {
        // Apertura
        if (this.autoClose && this.openIndex.length>0) {
          this.openIndex=[]
        }
        this.openIndex.push(index);

        // Calcolo dinamico dell'altezza del contenuto
        this.$nextTick(() => {
          const content = this.$refs.contents[index];
          this.computedHeights[index] = `${content.scrollHeight}px`;
        });
      }
    },
  },
};
</script>
  
<style scoped>
.chevron-down:hover {
  background-color: #929292;
  transition: background-color 0.3s ease;
}
.chevron-down {
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.accordion {
  border: 1px solid #929292;
  overflow: hidden;
}

.accordion-title {
  cursor: pointer;
  background-color: #f5f5f5;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.accordion-title:hover {
  background-color: #e6e6e6;
}

.accordion-title.is-open {
  background-color: #e6e6e6;
}

.accordion-title .icon {
  transition: transform 0.4s ease;
}

.accordion-title.is-open .icon {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 10px;
  background-color: #fff;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.2s ease-out, padding 0.2s ease-out;
}

.accordion-content.is-open {
  padding: 10px;
}
</style>