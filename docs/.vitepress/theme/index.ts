import BlogTheme,{Theme} from '@sugarat/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import ElementPlus from 'element-plus'
import './style.scss'

// @ts-ignore
const CustomBlogTheme: Theme = {
    ...BlogTheme,
    enhanceApp(ctx:any) {
        // 使用 ElementPlus 插件
        ctx.app.use(ElementPlus)
        // 将 ElementPlus 实例传递给 app.config.globalProperties.$ELEMENT
        ctx.app.config.globalProperties.$ELEMENT = ElementPlus
        enhanceAppWithTabs(ctx.app)
    }
}

export default CustomBlogTheme
