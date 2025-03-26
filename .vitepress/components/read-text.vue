<template>
    <el-text @click="onReadText">
        <slot></slot>
        <el-icon style="font-size: 20px;" class="cursor-pointer read-text-icon">
            <Microphone />
        </el-icon>
    </el-text>
</template>
<script setup>
import { ElMessage } from 'element-plus';
function isSpeechSynthesisSupported() {
  return 'speechSynthesis' in window && typeof window.speechSynthesis.speak === 'function';
}
const findParentElement = (el, className) => {
  while (!el?.classList.contains(className)) {
    el = el?.parentElement;
  }
  return el;
};
const onReadText = (e) => {
    const target = e.target;
    if (!target) {
        return;
    }
    if (['svg', 'path', 'el-icon'].includes(target.tagName.toLowerCase())) {
        const element = findParentElement(target,'el-text');
        const text = element.innerText;

        if (!text) return;

        if (!isSpeechSynthesisSupported()) {
            return ElMessage.info('当前环境不支持阅读文本功能!');
        }
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;

        // 设置语言为中文
        utterance.lang = 'zh-CN';
        // utterance.rate = 0.4; // 设置语速，范围是0.1到10
        // utterance.pitch = 2; // 设置音调，范围是0到2

        window.speechSynthesis.speak(utterance);
    }

}
</script>