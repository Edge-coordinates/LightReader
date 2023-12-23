<template>
  <div id="n_top"></div>
  <div v-if="!isnovelok"></div>
  <div v-else>
    <div v-if="!ischaptok">
      章节过长，请检查正则表达式或者当前文本文件所使用的编码格式不支持，建议转换为UTF-8。
    </div>
    <div v-else style="padding: 25px 50px 25px 50px" ref="contentRef">
      <div :style="novelc_style">
        <h1 id="n_title">{{ char.title }}</h1>
        <p v-for="paragraph in char.content">{{ paragraph }}</p>
        <n-button-group>
          <n-button trong secondary type="error" @click="showchapter(char.num - 1)">
            <template #icon>
              <n-icon>
                <ArrowBack />
              </n-icon>
            </template>
            上一章
          </n-button>
          <n-button quaternary type="error" @click="activate('left')"> 目录 </n-button>
          <n-button
            icon-placement="right"
            trong
            secondary
            type="error"
            @click="showchapter(char.num + 1)">
            <template #icon>
              <n-icon>
                <ArrowForward />
              </n-icon>
            </template>
            下一章
          </n-button>
        </n-button-group>
      </div>
    </div>
  </div>
  <n-drawer v-if="isnovelok" v-model:show="active" :default-width="250" :placement="placement" resizable>
    <n-drawer-content  title="目录" :native-scrollbar="false">
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
    </n-drawer-content>
  </n-drawer>
  <div id="reader_tools">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-icon size="40" color="#EC5E42">
        <EllipsisHorizontalCircleSharp />
      </n-icon>
    </n-dropdown>
  </div>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="设置"
    size="huge"
    :bordered="false"
    :segmented="segmented">
    <h2>正则设置</h2>
    <n-radio-group v-model:value="regnum" name="radiogroup">
      <n-space>
        <n-radio v-for="i in regulars.keys()" :key="i" :value="i">
          {{ regulars[i] }}
        </n-radio>
      </n-space>
    </n-radio-group>
    <n-input-group>
      <n-input v-model:value="newreg" type="text" placeholder="请输入一个正则" />
      <n-button type="primary" ghost @click="addReg"> 添加 </n-button>
      <n-button type="primary" ghost @click="removeReg"> 删除 </n-button>
    </n-input-group>
    <h2>字体大小设置</h2>
    <n-space vertical>
      <n-slider v-model:value="front_size" :step="1" />
      <n-input-number v-model:value="front_size" size="small" />
    </n-space>
    <template #footer>
      <h2>相关</h2>
      <ul>
        <li>按键支持：按下键盘左键上一章，按下键盘右键下一章</li>
      </ul>
      <h3>碎碎念</h3>
      <ul>
        <li>我感觉这个目录有点卡顿，比原生要差一些，将就着用吧</li>
        <li>目录自动定位到当前在看的章节也能做到，但没啥太大用处，懒得整了。</li>
        <li>
          退出阅读器目前只有点到别的路由，比如书库页或关于页，如果要做退出键得每个阅读器都写一个，麻烦，懒得整。
        </li>
      </ul>
    </template>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useMessage, DrawerPlacement } from "naive-ui";
  import { EllipsisHorizontalCircleSharp, ArrowBack, ArrowForward } from "@vicons/ionicons5";
  import { TextEncode } from "@/utils/jschardet";
  import type { MenuOption } from "naive-ui";
  import localforage from "localforage";

  const db = localforage;

  // 数据初始化
  let left = 0,
    right = 0;
  let lines = [],
    line = "";
  let novel_menu_l = [],
    novel_menu_r = [];
  let regExp: any;
  let alldb: any;

  function generate_directory_listing() {
    menuOptions = [
      {
        label: "前言",
        key: "0"
      }
    ];
    let count = 0;
    novel_menu_l[count] = 0;
    for (line of lines) {
      if (regExp.test(line)) {
        novel_menu_r[count++] = right - 1;
        novel_menu_l[count] = right;
        menuOptions.push({ label: line, key: count });
        // menu.append(`<a class="mdui-list-item chapter_num" num=${count}>${line}</a>`);
      }
      right++;
    }
    // 重置渲染计数器
    novel_menu_r[count] = right;
    right = 0;
    // console.log(menuOptions);
  }
  let menuOptions: MenuOption[] = [
    {
      label: "前言",
      key: "0"
    }
  ];

  export default defineComponent({
    watch: {
      regnum: {
        handler(newregnum) {
          this.regExp = new RegExp(this.regulars[this.regnum]);
          regExp = this.regExp;
          generate_directory_listing();
          this.showchapter(0);
        }
      }
    },
    data() {
      return {
        showModal: ref(false),
        isnovelok: false,
        ischaptok: ref(true),
        front_size: 17,
        regulars: [],
        newreg: "",
        regnum: 0,
        regExp: Object,
        char: { title: "", content: [], num: 0 },
      };
    },
    computed: {
      novelc_style() {
        return `font-size: ${this.front_size}px;`;
      }
    },
    props: {
      fileUrl: {
        type: String,
        default: ""
      }
    },
    components: {
      EllipsisHorizontalCircleSharp,
      ArrowBack,
      ArrowForward
    },
    methods: {
      updateFrontsize() {
        alldb.front_size = this.front_size;
        db.setItem("TXTV", JSON.stringify(alldb));
      },
      addReg() {
        this.regulars.push(this.newreg);
        alldb.regular = this.regulars;
        db.setItem("TXTV", JSON.stringify(alldb));
        // console.log(alldb)
      },
      removeReg() {
        this.regulars.splice(this.regnum, 1);
        alldb.regular = this.regulars;
        db.setItem("TXTV", JSON.stringify(alldb));
      },
      handleSelect(key: string | number) {
        // message.info(String(key));
        if (String(key) == "txv_contents") {
          // message.info(String(key));
          this.activate("left");
        } else if (String(key) == "setting_for_txv") {
          this.showModal = true;
        }
      },
      handleUpdateValue(key: string, item: MenuOption) {
        // message.info("[onUpdate:value]: " + JSON.stringify(key));
        // message.info("[onUpdate:value]: " + JSON.stringify(item));
        this.showchapter(key as unknown as number);
      },
      prepare_novel(noveltext) {
        lines = noveltext.split(/\r?\n/);
        generate_directory_listing();
        this.menuOptions = menuOptions
        this.showchapter(0);
        this.isnovelok = true;
      },
      showchapter(num: number) {
        // console.log(num)
        if (num < 0) num = 0;
        if (num > novel_menu_l.length) num = novel_menu_l.length;
        this.updateFrontsize();
        let l = novel_menu_l[num],
          r = novel_menu_r[num];
        let novel_content = [],
          novel_char_title = "";
        this.ischaptok = ref(true);
        if (r - l > 10000) {
          this.ischaptok = ref(false);
        }
        if (num == 0) {
          novel_content = lines.slice(l, r + 1);
        } else {
          novel_content = lines.slice(l + 1, r + 1);
        }
        novel_char_title = menuOptions[num].label as string;
        this.char.title = novel_char_title;
        this.char.content = novel_content;
        this.char.num = num;
        // console.log(this.char);
        this.active = false;
        // window.scrollTo(0,0);
        document.getElementById("n_top").scrollIntoView();
      },
      async teststore() {
        // console.log(this.fileUrl)
        await this.dbinit();
        let file = await fetch(this.fileUrl).then();
        let arraybuffer = await file.arrayBuffer();
        // let filetext = await file.text()
        file = await fetch(this.fileUrl).then();
        let fileblob = await file.blob();
        const buffer = Buffer.from(arraybuffer);
        let txtencoding = TextEncode("GBK", buffer);
        let reader = new FileReader();
        reader.readAsText(fileblob, txtencoding);
        let that = this;
        reader.onloadend = function (e) {
          that.prepare_novel(reader.result);
          // resolve(reader.result)
          // console.log(reader.result);
        };
        // console.log();
      },
      async dbinit() {
        alldb = await db.getItem("TXTV");
        if (typeof alldb == "string") alldb = JSON.parse(alldb);
        // console.log(alldb)
        this.regulars = alldb.regular;
        this.regnum = alldb.regnum;
        this.regExp = new RegExp(this.regulars[this.regnum]);
        regExp = this.regExp;
        this.front_size = alldb.front_size;
        // console.log(this.regulars)
      }
    },
    created() {
      this.teststore();
      // this.dbinit()
    },
    mounted() {
      var _this = this;
      document.onkeyup = function (e) {
        if (e.code === "ArrowLeft") {
          // console.log("arrowleft");
          // pageUp() 和 pageDown()是具体实现的函数
          _this.showchapter(_this.char.num - 1);
        } else if (e.code === "ArrowRight") {
          console.log("arrowright");
          _this.showchapter(_this.char.num + 1);
        }
      };
    },
    setup() {
      const message = useMessage();
      const showDropdownRef = ref(false);
      const activeRef = ref(false);
      const placementRef = ref<DrawerPlacement>("right");
      const activate = (place: DrawerPlacement) => {
        activeRef.value = true;
        placementRef.value = place;
      };
      return {
        active: activeRef,
        placement: placementRef,
        activate,
        menuOptions,
        options: [
          {
            label: "设置",
            key: "setting_for_txv"
          },
          {
            label: "目录",
            key: "txv_contents"
          }
          // {
          //   label: "亚特兰蒂斯巴哈马，拿骚",
          //   key: "atlantis nahamas, nassau"
          // },
          // {
          //   label: "比佛利山庄酒店，洛杉矶",
          //   key: "the beverly hills hotel, los angeles"
          // }
        ],
        showDropdown: showDropdownRef,
        handleClick() {
          showDropdownRef.value = !showDropdownRef.value;
        },
        bodyStyle: {
          width: "600px"
        },
        segmented: {
          content: "soft",
          footer: "soft"
        } as const
      };
    }
  });
</script>

<style>
  #reader_tools {
    /* position: absolute; */
    position: fixed;
    right: 5%;
    bottom: 5%;
  }
</style>
