
import EditorJS from "@editorjs/editorjs"
import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import RawTool from '@editorjs/raw';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
export default defineNuxtPlugin(nuxtApp => {
    const defaultOptions = {
        id: '',   //к какому id прикрепляется editor js
        data: {},  //преждесохраненные данные
        tools: {}, //существующие компоненты в editor js
        view: false
        }
      
    const  editor = (options = defaultOptions) => new EditorJS({
        tools: options.tools || {
            header: {
                class: Header, 
                inlineToolbar: ['link'],
              }, 
              list: { 
                class: List, 
                inlineToolbar: true 
              },
              image: {
                  class: ImageTool
              },
              quote: {
                  class: Quote
              },
              code: {
                  class: CodeTool
              },
              delimiter: {
                  class: Delimiter
              },
              raw: {
                  class: RawTool
              },
              table: {
                   class: Table
              },
              warning: {
                  class: Warning
              },
              checklist: {
                  class: Checklist
              },
        },
        holder: options.id, 
        logLevel: 'ERROR',
        data: options.data || {},
        readOnly: options.view || false
    })
    const App = useNuxtApp()
    App.provide('editor', (options) => editor(options))
  })