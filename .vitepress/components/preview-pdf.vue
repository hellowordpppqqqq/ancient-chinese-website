<template>
  <div>
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, onMounted, defineProps } from 'vue';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

// 设置 PDF.js 工作线程
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// 定义组件的 props 类型
interface Props {
  url: string;
}

// 获取 props
const props = defineProps<Props>();
const pdfCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  const loadingTask = pdfjsLib.getDocument(props.url);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 1 });
  if (pdfCanvas.value) {
    const context = pdfCanvas.value.getContext('2d');
    if (context) {
      pdfCanvas.value.height = viewport.height;
      pdfCanvas.value.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    }
  }
});
</script>

<style scoped>
canvas {
  border: 1px solid #dedede;
}
</style>
