<template>
  <el-button plain @click="pdfParams.dialogVisible = true">
      {{ props.text }}
  </el-button>
  <el-dialog v-model="pdfParams.dialogVisible" fullscreen top="40vh" width="70%" draggable append-to-body center
      @open="showPdf">
      <canvas id="pdf-render" class="pdf-render"></canvas>
      <el-pagination layout="prev, pager, next" :total="pdfParams.total" @change="getPdfPage"
          style="justify-content: center;margin-top: 20px;" />
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const props = defineProps({
  url: {
      type: String,
      default: ''
  },
  text: {
      type: String,
      default: '预览pdf'
  }
})
const pdfParams = reactive({
  pageNumber: 1, // 当前页
  total: 0, // 总页数
  dialogVisible: false
});

let pdfDoc = null;
let pdfjs = null;
onMounted(async () => {
  // @ts-ignore
  pdfjs = await import('pdfjs-dist/build/pdf');
   // @ts-ignore
  let pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  (pdfjs as any).GlobalWorkerOptions.workerSrc = pdfjsWorker
})

const showPdf = async () => {
  (pdfjs as any).getDocument(props.url).promise.then(doc => {
      pdfDoc = doc
      pdfParams.total = doc.numPages
      getPdfPage(1)
  })
}
const getPdfPage = (number: number) => {
  (pdfDoc as any)?.getPage(number).then(page => {
      const viewport = page.getViewport()
      const canvas = document.getElementById('pdf-render') as HTMLCanvasElement;
      const context = canvas.getContext('2d')
      canvas.width = viewport.viewBox[2]
      canvas.height = viewport.viewBox[3]
      viewport.width = viewport.viewBox[2]
      viewport.height = viewport.viewBox[3]
      canvas.style.width = Math.floor(viewport.width / 2) + 'px'
      canvas.style.height = Math.floor(viewport.height / 2) + 'px'

      let renderContext = {
          canvasContext: context,
          viewport: viewport,
          // 这里transform的六个参数，使用的是transform中的Matrix(矩阵)
          transform: [1, 0, 0, -1, 0, viewport.height]
      }
      // 进行渲染
      page.render(renderContext)
  })
}
</script>

<style scoped>
.pdf-render {
  margin: 0 auto;
  border: none;
}
</style>