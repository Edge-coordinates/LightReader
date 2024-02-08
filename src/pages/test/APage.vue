<template>
  <!--
  Forked from:
  http://www.quasarchs.com/vue-components/virtual-scroll#example--scroll-to-position
-->
  <div id="q-app" style="min-height: 100vh;">
    <div>
      <div class="q-pa-md row justify-center">
        <q-input style="min-width: 10em" type="number" v-model.number="virtualListIndex" :min="0" :max="9999"
          label="Scroll to index" input-class="text-right" outlined></q-input>
        <q-btn class="q-ml-sm" label="Go" no-caps color="primary" @click="executeScroll"></q-btn>
      </div>

      <q-separator></q-separator>

      <q-virtual-scroll ref="virtualListRef" style="max-height: 800px;" component="q-list" :items="heavyList" separator
        @virtual-scroll="onVirtualScroll" v-slot="{ item, index }">
        <q-item :key="index" dense :class="{ 'bg-black text-white': index === virtualListIndex }">
          <q-item-section>
            <q-item-label>
              #{{ index }} - {{ item.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </div>
  </div>
</template>>

<script>
import { ref, onMounted } from 'vue'

const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1)
  })
}
export default {
  setup() {
    const virtualListRef = ref(null)
    const virtualListIndex = ref(1200)

    onMounted(() => {
      virtualListRef.value.scrollTo(virtualListIndex.value)
    })

    return {
      heavyList,
      virtualListRef,
      virtualListIndex,

      onVirtualScroll({ index }) {
        virtualListIndex.value = index
      },

      executeScroll() {
        virtualListRef.value.scrollTo(virtualListIndex.value, 'start-force')
      }
    }
  }
}
</script>
