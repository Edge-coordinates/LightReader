<!-- eslint-disable quotes -->
<template>
  <q-dialog v-model="setStore.isOpen">
    <q-card class="!max-w-none w-4/5 h-4/5">
      <q-toolbar>
        <q-avatar>
          <q-icon name="mdi-cogs" color="blue" size="2em" />
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold">设置</span> Setting</q-toolbar-title>

        <q-btn flat round dense icon="mdi-close" v-close-popup />
      </q-toolbar>

      <div>
        <q-splitter v-model="splitterModel">

          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-blue">
              <q-tab name="mails" label="基础设置" />
              <q-tab name="alarms" label="查看器设置" />
              <q-tab name="movies" label="高级" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
              <q-tab-panel name="mails">
                <!-- ANCHOR 基础设置 -->
                <div class="text-h4 q-mb-md">基础设置</div>
                <!-- 目录抽屉宽度 -->
                <q-badge color="secondary">
                  目录宽度: {{ setStore.menuDWidth }} (100 to 1500, step 10)
                </q-badge>
                <q-slider v-model="setStore.menuDWidth" color="green" :min="100" :step="10" :max="1500" />
                <!-- 字体大小 支持存储 -->
                <q-badge color="secondary">
                  字体大小: {{ setStore.fontSize }} (1 to 200, step 1)
                </q-badge>
                <q-btn round dense flat icon="mdi-content-save" @click="saveData('fontSize')"><q-tooltip
                    class="bg-purple text-body2" :offset="[10, 10]">
                    保存设置
                  </q-tooltip></q-btn>
                <q-slider v-model="setStore.fontSize" color="blue" :min="1" :step="1" :max="200" />
                <!-- 阅读区边框 -->
                <q-input v-model="setStore.cMargin" label="
                  边框区宽度：分别为 上右下左； 单位为 px">
                  <template v-slot:after>
                    <q-btn round dense flat icon="mdi-content-save" @click="saveData('readerMargin')"><q-tooltip
                        class="bg-purple text-body2" :offset="[10, 10]">
                        保存设置
                      </q-tooltip></q-btn>

                    <q-btn round dense flat icon="mdi-reload" @click="reloadData('readerMargin')"><q-tooltip
                        class="bg-purple text-body2" :offset="[10, 10]">
                        重置设置
                      </q-tooltip></q-btn>
                  </template>
                </q-input>
                <div>
                  <br />
                  <q-list separator>
                    <q-item v-ripple>
                      <q-item-section>保存意味着存储，会影响之后使用软件</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>临时使用没有任何副作用，仅会影响本次的体验！</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="alarms">
                <!-- ANCHOR 正则表达式设置 -->
                <div class="text-h4 q-mb-md">正则表达式设置</div>
                <div class="q-pa-md">
                  <q-list bordered separator>
                    <q-item clickable v-ripple v-for="(item, index) in setStore.menuRegs" v-bind:key="index"
                      @click="openSecondDialog(index)">
                      <q-item-section>
                        <div class="flex">
                          <q-radio v-model="setStore.regIndex" :val="index" />
                          <div>{{ item }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="float-right">
                  <q-btn round dense flat icon="mdi-plus" @click="addRegData"><q-tooltip class="bg-purple text-body2"
                      :offset="[10, 10]">
                      增加
                    </q-tooltip></q-btn>
                  <q-btn round dense flat icon="mdi-content-save" @click="saveData('menuReg')"><q-tooltip
                      class="bg-purple text-body2" :offset="[10, 10]">
                      保存设置
                    </q-tooltip></q-btn>
                </div>
              </q-tab-panel>

              <q-tab-panel name="movies">
                <!-- ANCHOR 高级设置 -->
                <div class="text-h4 q-mb-md">高级</div>
                <p>
                  高级就是，什么都没有。。。。
                </p>
                <p>最动人是秋林映着落日。那酡红如醉，衬托着天边加深的暮色。晚风带着清澈的凉意，随着暮色浸染，那是一种十分艳丽的凄楚之美，让你想流几行感怀身世之泪，却又被那逐渐淡去的醉红所慑住，而情愿把奔放的情感凝结。</p>
                <p>
                  这上面的夜的天空，奇怪而高，我生平没有见过这样奇怪而高的天空。他仿佛要离开人间而去，使人们仰面不再看见。然而现在却非常之蓝，闪闪地眨着几十个星星的眼，冷眼。他的口角上现出微笑，似乎自以为大有深意，而将繁霜洒在我的园里的野花草上。
                </p>
                <div class="q-pa-md">
                  <q-input v-model="text" filled type="textarea" spellcheck="false" class="text-xl" />
                </div>
                <q-input bottom-slots v-model="text" label="Label" counter maxlength="12" :dense="dense">
                  <template v-slot:before>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                  </template>

                  <template v-slot:append>
                    <q-icon v-if="text !== ''" name="mdi-close" @click="text = ''" class="cursor-pointer" />
                    <!-- <q-icon name="mdi-schedule" /> -->
                  </template>

                  <template v-slot:hint>
                    Field hint
                  </template>

                  <template v-slot:after>
                    <q-btn disable round dense flat icon="mdi-send" />
                  </template>
                </q-input>

                <q-input bottom-slots v-model="text" label="Label">
                  <template v-slot:after>
                    <q-btn disable round dense flat icon="mdi-send" />
                  </template>
                </q-input>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="临时使用" color="primary" v-close-popup />
        <!-- <q-btn flat label="保存" disable @click="saveData" color="primary" v-close-popup /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-blue-3 text-Black" style="width: 800px">
      <q-card-section>
        <b class="text-lg">正则表达式</b>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="tmpReg" />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <!-- <q-btn flat label="OK" v-close-popup /> -->
        <q-btn v-close-popup round dense flat icon="mdi-delete-outline" @click="deleteData('regex')"><q-tooltip
            class="bg-purple text-body2" :offset="[10, 10]">
            删除
          </q-tooltip></q-btn>
        <q-btn v-close-popup round dense flat icon="mdi-close"><q-tooltip class="bg-purple text-body2" :offset="[10, 10]">
            取消
          </q-tooltip></q-btn>
        <q-btn v-close-popup round dense flat icon="mdi-check" @click="saveData('tmpRegex')"><q-tooltip
            class="bg-purple text-body2" :offset="[10, 10]">
            确认
          </q-tooltip></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- ANCHOR Script -->
<script setup lang="ts">
let text, dense
import { ref, reactive, onMounted } from 'vue'
import { NDynamicInput } from 'naive-ui'


const secondDialog = ref(false)
const props = defineProps<{
  originData?: string,
  ecodes?: any
}>()

// import { useSettingStore } from 'stores/viewerSet-store';
// const setStore = useSettingStore()

import { useSettingStore } from 'stores/bookSet-store';
const setStore = useSettingStore()
let regIndex, tmpReg = ref()
// let radioReg = ref(setStore.regIndex)

function openSecondDialog(index) {
  regIndex = index
  tmpReg.value = setStore.menuRegs[index]
  secondDialog.value = true
}

function addRegData() {
  setStore.menuRegs.push('')
  openSecondDialog(setStore.menuRegs.length - 1)
}

function deleteData(id) {
  switch (id) {
    case 'regex':
      console.log('Delete Reg: ', setStore.menuRegs.splice(regIndex, 1))
      break
  }
}

function reloadData(id) {
  console.log('reload!', id)
  switch (id) {
    case 'readerMargin':
      setStore.cMargin = setStore.defaultCMargin
      window.storeAPI.set('cMargin', setStore.defaultCMargin)
      break
    case 'WBreakpoint':
      break

  }
}

function saveData(id) {
  console.log('saved!', id)
  switch (id) {
    case 'tmpRegex':
      setStore.menuRegs[regIndex] = tmpReg.value
      break
    case 'fontSize':
      window.storeAPI.set('fontSize', setStore.fontSize)
      break
    case 'cMargin':
      window.storeAPI.set('cMargin', setStore.cMargin)
      break
    case 'menuReg':
      window.storeAPI.set('regIndex', setStore.regIndex)
      window.storeAPI.set('menuRegs', JSON.parse(JSON.stringify(setStore.menuRegs)))
      break
    //   case 'perPageNum':
    //     setStore.perPageNum = checked(<any>simpleSetData.perPageNum, setStore.perPageNum)
    //     window.storeAPI.set('itemNum', setStore.perPageNum)
    //     break;
    //   case 'WBreakpoint':
    //     setStore.waterfallBreakpoint = WBV2WB(WBValue.value)
    //     window.storeAPI.set('WBreakpoint', JSON.parse(JSON.stringify(setStore.waterfallBreakpoint)))
    //     break

  }
}

const tab = ref('mails')
const splitterModel = ref(20) // 这啥啊？


onMounted(() => {
  // document.getElementById('inputFormat')!.style.fontWeight = 'bolder' // 输入框加粗 无效
})

// const props = defineProps({
// })
</script>

<!-- <style>
input {
  font-weight: bold;
}
</style> -->
src/stores/bookSet-store
