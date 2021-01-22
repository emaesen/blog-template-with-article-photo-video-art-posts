<template>
  <div class="main-test">
    <h1>{{$page.cms.test.title}}</h1>
    <h2>Formatted content of Rich Text block</h2>
    <RichText :data="$page.cms.test.richText" class="richtext" />

    <h2>Test Dark Mode Support</h2>
    <div>
      Test result: <i>{{ supportsDarkMode }}</i>
    </div>

    <h2>html elements:</h2>
    
    <div>
      <input id="foo1" name="foo" type="text" placeholder="title"/>
      <label for="foo1">label</label><br>

      <input id="foo2" type="time" step="900"/>
      <label for="foo2">time</label><br>

      <input id="foo3" type="date"/>
      <label for="foo3">date</label><br>

      <input id="foo4" type="number"/>
      <label for="foo4">number</label><br>

      <input id="foo5" type="color"/>
      <label for="foo5">color</label><br>

      <input id="foo6" type="range"/>
      <label for="foo6">range</label><br>

      <input id="foo7" type="search"/>
      <label for="foo7">search</label><br>

    </div>
    <div>
      <textarea id="foo20" placeholder="type something"/>
      <label for="foo20">textarea</label>
    </div>
    <div>
      <select id="foo30">
        <option value="option1">option 1</option>
        <option value="option2" selected>option 2</option>
        <option value="option3">option 3</option>
      </select>
      <label for="foo30">select</label>
    </div>
    <div>
      <input type="checkbox" id="cb1" value="1" checked/>
      <label for="cb1"><span><span></span></span>checkbox 1</label><br>
      <input type="checkbox" id="cb2" value="2"/>
      <label for="cb2"><span><span></span></span>checkbox 2</label>
    </div>
    <div>
      <input type="radio" name="colors" id="r1">
      <label for="r1"><span><span></span></span>radio 1</label><br>
      <input type="radio" name="colors" id="r2" checked>
      <label for="r2"><span><span></span></span>radio 2</label><br>
    </div>
    <button>button</button>

    <h2>Color scheme</h2>
    <h3>Primary</h3>
    <div class="scheme">
      <div class="color p1"><span class="text">1</span></div>
      <div class="color p2"><span class="text">2</span></div>
      <div class="color p0"><span class="text">0</span></div>
      <div class="color p3"><span class="text">3</span></div>
      <div class="color p4"><span class="text">4</span></div>
    </div>

    <h3>Secondary (1)</h3>
    <div class="scheme">
      <div class="color s11"><span class="text">1-1</span></div>
      <div class="color s12"><span class="text">1-2</span></div>
      <div class="color s10"><span class="text">1-0</span></div>
      <div class="color s13"><span class="text">1-3</span></div>
      <div class="color s14"><span class="text">1-4</span></div>
    </div>

    <h3>Secondary (2)</h3>
    <div class="scheme">
      <div class="color s21"><span class="text">2-1</span></div>
      <div class="color s22"><span class="text">2-2</span></div>
      <div class="color s20"><span class="text">2-0</span></div>
      <div class="color s23"><span class="text">2-3</span></div>
      <div class="color s24"><span class="text">2-4</span></div>
    </div>

    <h3>Derived</h3>
    <div class="scheme">
      <div class="color bg"><span class="text">bg</span></div>
      <div class="color bg_opaque"><span class="text">bg_opaque</span></div>
      <div class="color bg_accent-1"><span class="text">bg_accent-1</span></div>
      <div class="color bg_accent-2"><span class="text">bg_accent-2</span></div>
      <div class="color border_accent-1"><span class="text">border_accent-1</span></div>
      <div class="color border_accent-2"><span class="text">border_accent-2</span></div>
      <div class="color text_body"><span class="text">text_body</span></div>
      <div class="color text_header"><span class="text">text_header</span></div>
      <div class="color text_action"><span class="text">text_action</span></div>
      <div class="color text_action_hover"><span class="text">text_action_hover</span></div>
      <div class="color text_action_selected"><span class="text">text_action_selected</span></div>
      <div class="color text_action_active"><span class="text">text_action_active</span></div>
      <div class="color text_action_underline"><span class="text">text_action_underline</span></div>
      <div class="color text_action_underline_hover"><span class="text">text_action_underline_hover</span></div>
      <div class="color text_highlight"><span class="text">text_highlight</span></div>
      <div class="color formfield_border"><span class="text">formfield_border</span></div>
      <div class="color icon"><span class="text">icon</span></div>
      <div class="color scrollbar"><span class="text">scrollbar</span></div>
      <div class="color scrollbar-thumb"><span class="text">scrollbar-thumb</span></div>
    </div>

  </div>
</template>

<script>
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  components: {
    RichText,
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.test.seo) 
  },
  computed: {
    supportsDarkMode() {
      if (typeof window !== 'undefined') {
        const mm = window.matchMedia('(prefers-color-scheme)')
        if (mm && mm.media !== 'not all') {
          return "Dark Mode is supported"
        } else {
          return "Dark Mode is NOT supported"
        } 
      }
    }
  }
}
</script>

<page-query>
query TestPage {
  cms {
    test {
      title
      richText
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
    }
  }
}
</page-query>

<style lang="less" scoped>
@import '~/assets/styles/form.less';

.richtext {
  border: 15px solid #ccc;
  border-radius: 50px;
  padding: 2em;
}
.scheme {
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.color {
  line-height: 3em;
  border: 3px solid #ccc;
  flex-grow: 1;
  text-align: center;
  min-width: 10em;
}
.text {
  color: #fff;
  mix-blend-mode: difference;
}

.p0 {
  background-color: rgb(var(--base-color-primary-0));
}
.p1 {
  background-color: rgb(var(--base-color-primary-1));
}
.p2 {
  background-color: rgb(var(--base-color-primary-2));
}
.p3 {
  background-color: rgb(var(--base-color-primary-3));
}
.p4 {
  background-color: rgb(var(--base-color-primary-4));
}

.s10 {
  background-color: rgb(var(--base-color-secondary-1-0));
}
.s11 {
  background-color: rgb(var(--base-color-secondary-1-1));
}
.s12 {
  background-color: rgb(var(--base-color-secondary-1-2));
}
.s13 {
  background-color: rgb(var(--base-color-secondary-1-3));
}
.s14 {
  background-color: rgb(var(--base-color-secondary-1-4));
}

.s20 {
  background-color: rgb(var(--base-color-secondary-2-0));
}
.s21 {
  background-color: rgb(var(--base-color-secondary-2-1));
}
.s22 {
  background-color: rgb(var(--base-color-secondary-2-2));
}
.s23 {
  background-color: rgb(var(--base-color-secondary-2-3));
}
.s24 {
  background-color: rgb(var(--base-color-secondary-2-4));
}
.bg {
  background-color: var(--color_bg);
}
.bg_opaque {
  background-color: var(--color_bg_opaque);
}

.bg {
  background-color: var(--color_bg);
}
.bg_opaque {
  background-color: var(--color_bg_opaque);
}
.bg_accent-1 {
  background-color: var(--color_bg_accent-1);
}
.bg_accent-2 {
  background-color: var(--color_bg_accent-2);
}
.border_accent-1 {
  background-color: var(--color_border_accent-1);
}
.border_accent-2 {
  background-color: var(--color_border_accent-2);
}
.text_body {
  background-color: var(--color_text_body);
}
.text_header {
  background-color: var(--color_text_header);
}
.text_action {
  background-color: var(--color_text_action);
}
.text_action_hover {
  background-color: var(--color_text_action_hover);
}
.text_action_selected {
  background-color: var(--color_text_action_selected);
}
.text_action_active {
  background-color: var(--color_text_action_active);
}
.text_action_underline {
  background-color: var(--color_text_action_underline);
}
.text_action_underline_hover {
  background-color: var(--color_text_action_underline_hover);
}
.text_highlight {
  background-color: var(--color_text_highlight);
}
.formfield_border {
  background-color: var(--color_formfield_border);
}
.icon {
  background-color: var(--color_icon);
}
.scrollbar {
  background-color: var(--color_scrollbar);
}
.scrollbar-thumb {
  background-color: var(--color_scrollbar-thumb);
}

</style>