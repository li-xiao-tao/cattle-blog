<script setup>
import { defineAsyncComponent } from 'vue';

const UuidConfig = defineAsyncComponent(() => import('/components-md/components/UuidConfig.vue'));
</script>


# 在线生成`UUID`
<UuidConfig />
