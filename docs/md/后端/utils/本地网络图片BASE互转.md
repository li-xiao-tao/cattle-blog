```java
package com.itcast.cattle;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author QWQ
 */
public class ImageToBase64ByStreamUtil {

    public static void main(String[] args) throws Exception {
        String imgFilePath = "http://d.hiphotos.baidu.com/image/pic/item/a044ad345982b2b713b5ad7d3aadcbef76099b65.jpg";
        //将网络图片编码为base64
        String base64 = encodeImageToBase64(new URL(imgFilePath));
        System.out.println(base64);
    }
    
    /**
     * 文件流生成base64
     *
     * @param
     * @return
     */
    public static String imageToBase64ByStream(String imgPath) {
        // 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        byte[] data = null;
        // 读取图片字节数组
        try {
            FileInputStream in = new FileInputStream(imgPath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        // 返回Base64编码过的字节数组字符串  .replace("\r\n","")很重要，有换行，图片会读取不出来
        return encoder.encode(data).replace("\r\n","");;
    }


    /**
     * @param imgBase 图片base
     * @param imgPath 生成图片路径
     * @return 成功/失败
     */
    public static Boolean base64ToImageByStream(String imgBase, String imgPath) {
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            //图片Base解码转byte数组
            byte[] data = decoder.decodeBuffer(imgBase);
            for (int i = 0; i < data.length; i++) {
                //调整异常数据
                if (data[i] < 0) {
                    data[i] += 256;
                }
            }
            //生成图片
            FileOutputStream out = new FileOutputStream(imgPath);
            out.write(data);
            //关闭流
            out.flush();
            out.close();
            return true;
        } catch (IOException e) {
            return false;
        }
    }



    /**
     * 将网络图片编码为base64
     */
    public static String encodeImageToBase64(URL url) throws Exception {
        //将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        System.out.println("图片的路径为:" + url.toString());
        //打开链接
        HttpURLConnection conn = null;
        try {
            conn = (HttpURLConnection) url.openConnection();
            //设置请求方式为"GET"
            conn.setRequestMethod("GET");
            //超时响应时间为5秒
            conn.setConnectTimeout(10 * 1000);
            //通过输入流获取图片数据
            InputStream inStream = conn.getInputStream();
            //得到图片的二进制数据，以二进制封装得到数据，具有通用性
            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
            //创建一个Buffer字符串
            byte[] buffer = new byte[1024];
            //每次读取的字符串长度，如果为-1，代表全部读取完毕
            int len = 0;
            //使用一个输入流从buffer里把数据读取出来
            while ((len = inStream.read(buffer)) != -1) {
                //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
                outStream.write(buffer, 0, len);
            }
            //关闭输入流
            inStream.close();
            byte[] data = outStream.toByteArray();
            //对字节数组Base64编码
            BASE64Encoder encoder = new BASE64Encoder();
            //返回Base64编码过的字节数组字符串 .replace("\r\n","")很重要，有换行，图片会读取不出来
            return encoder.encode(data).replace("\r\n","");
        } catch (IOException e) {
            e.printStackTrace();
            throw new Exception("将网络图片编码为base64失败");
        }
    }
}   
```