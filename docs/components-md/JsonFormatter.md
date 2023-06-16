<script setup>
import { defineAsyncComponent } from 'vue';

const JsonFormatter = defineAsyncComponent(() => import('/components-md/components/JsonFormatter.vue'));
</script>


# JSON工具箱
<JsonFormatter />
