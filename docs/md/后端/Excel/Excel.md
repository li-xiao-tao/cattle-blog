# Apache - Excel

- 导出

  - `XSSFWorkbook` 生成2007后`.xlsx`文件
  - `HSSFWorkbook`生成2007前`.xls`文件

- 导入

  - `HSSFWorkboo`读取2007前`.xls`文件
  - `XSSFWorkbook`读取2007后`.xlsx`文件

- 字体Font样式

  - ```
    XSSFFont font = wb.createFont();
    font.setFontName("宋体");
    font.setFontHeightInPoints((short) 10);
    // 加粗
    font.setBold(true);
    ```

- Sheet 表

  - ```
    // 创建.xlsx 文件
    XSSFWorkbook wb = new XSSFWorkbook();
    XSSFSheet sheet = wb.createSheet("表名")
    
    
    // 创建.xls 文件
    HSSFWorkbook wb = new HSSFWorkbook();
    HSSFSheet sheet = wb.createSheet("表名")
    ```

- Sheet 表样式

  - ```
    XSSFSheet sheet = wb.createSheet(sheetName);
    //设置第 1 列的列宽为 30 个字符宽度，其中 256 是 Excel 中的列宽度单位，具体是指 1/256 个字符宽度。
    sheet.setColumnWidth(0, 30 * 256);
    //设置第 2 列的列宽为 30 个字符宽度，其中 256 是 Excel 中的列宽度单位，具体是指 1/256 个字符宽度。
    sheet.setColumnWidth(1, 30 * 256);
    sheet.setColumnWidth(2, 30 * 256);
    sheet.setColumnWidth(3, 20 * 256);
    sheet.setColumnWidth(4, 20 * 256);
    sheet.setColumnWidth(5, 20 * 256);
    sheet.setColumnWidth(6, 20 * 256);
    ```

- 行Row

  - ```
    XSSFRow headerRow = sheet.createRow(0);
    ```

- 行Row样式

  - ```
    XSSFRow headerRow = sheet.createRow(0);
    headerRow.setHeightInPoints(50);
    ```

- 单元格样式

  - ```
    XSSFCellStyle style = wb.createCellStyle();
    // 方法用于设置单元格垂直居中对齐方式
    style.setVerticalAlignment(VerticalAlignment.CENTER);
    style.setAlignment(HorizontalAlignment.CENTER);
    // 设置字体
    style.setFont(font);
    // 设置自动换行
    style.setWrapText(true);
    ```

## pom

```xml
   <dependencies>
       <!--poi-->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>5.2.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.1</version>
        </dependency>
    </dependencies>
```

## Utlis

```vue
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * POI导入、导出Excel
 */
public class ExcelUtil {


    //2003-版本的excel
    private final static String EXCEL_2003 = ".xls";
    //2007+ 版本的excel
    private final static String EXCEL_2007 = ".xlsx";

    /**
     * 描述：根据文件后缀，自适应上传文件的版本
     *
     * @param inStr,fileName
     * @return
     * @throws Exception
     */
    public static Workbook getWorkbook(InputStream inStr, String fileName) {
        Workbook wb;
        String fileType = fileName.substring(fileName.lastIndexOf("."));
        try {
            if (EXCEL_2003.equals(fileType)) {
                wb = new HSSFWorkbook(inStr);  //2003-
            } else if (EXCEL_2007.equals(fileType)) {
                wb = new XSSFWorkbook(inStr);  //2007+
            } else {
                throw new RuntimeException("解析的文件格式有误！");
            }
        } catch (IOException e) {
            throw new RuntimeException("解析的文件格式有误！");
        }
        return wb;
    }

    /**
     * 描述：对表格中数值进行格式化
     *
     * @param cell
     * @return
     */
    public static Object getCellValue(Cell cell) {
        Object value = null;
        DecimalFormat df = new DecimalFormat("0");  //格式化number String字符
        SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");  //日期格式化
        DecimalFormat df2 = new DecimalFormat("0.00");  //格式化数字
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                value = cell.getRichStringCellValue().getString();
                break;
            case Cell.CELL_TYPE_NUMERIC:
                if ("General".equals(cell.getCellStyle().getDataFormatString())) {
                    value = df.format(cell.getNumericCellValue());
                } else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
                    value = sdf.format(cell.getDateCellValue());
                } else {
                    value = df2.format(cell.getNumericCellValue());
                }
                break;
            case Cell.CELL_TYPE_BOOLEAN:
                value = cell.getBooleanCellValue();
                break;
            case Cell.CELL_TYPE_BLANK:
                value = "";
                break;
            default:
                break;
        }
        return value;
    }

    /**
     * 导出Excel
     *
     * @param sheetName sheet名称
     * @param title     标题
     * @param values    内容
     * @param wb        HSSFWorkbook对象
     * @return
     */
    public static XSSFWorkbook getHSSFWorkbook(String sheetName, String[] title, String[][] values, XSSFWorkbook wb) {

        // 第一步，创建一个HSSFWorkbook，对应一个Excel文件
        if (wb == null) {
            wb = new XSSFWorkbook();
        }

        // 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
        XSSFSheet sheet = wb.createSheet(sheetName);
        //设置第 2 列的列宽为 30 个字符宽度，其中 256 是 Excel 中的列宽度单位，具体是指 1/256 个字符宽度。
        sheet.setColumnWidth(0, 30 * 256);
        //设置第 2 列的列宽为 30 个字符宽度，其中 256 是 Excel 中的列宽度单位，具体是指 1/256 个字符宽度。
        sheet.setColumnWidth(1, 30 * 256);
        sheet.setColumnWidth(2, 30 * 256);
        sheet.setColumnWidth(3, 20 * 256);
        sheet.setColumnWidth(4, 20 * 256);
        sheet.setColumnWidth(5, 20 * 256);
        sheet.setColumnWidth(6, 20 * 256);
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        XSSFRow headerRow = sheet.createRow(0);
        headerRow.setHeightInPoints(50);

        // 第四步，创建单元格，并设置值表头 设置表头居中  创建样式
        XSSFCellStyle style = wb.createCellStyle();
        // 方法用于设置单元格垂直居中对齐方式
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = wb.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 10);
        // 加粗
        font.setBold(true);
        style.setFont(font);
        style.setWrapText(true);


        //创建标题
        for (int i = 0; i < title.length; i++) {
            XSSFCell cell = headerRow.createCell(i);
            // 设置头数据
            cell.setCellValue(title[i]);
            // 设置样式
            cell.setCellStyle(style);
        }

        // 创建数据行
        Map<String, CellRangeAddress> departmentMergedRegions = new HashMap<>();
        int rowIndex = 1;
        // 上一个部门名称//用于记录上一个部门名称，如果当前部门对应的单元格范围仅包含一个单元格，则将当前行添加到上一个部门对应的范围中，以保证合并单元格的正确性。同时，还增加了一个判断，避免了只包含一个单元格的范围被添加到 Map 中，
        String lastDepartment = null;
        for (String[] rowValues : values) {
            // 从第二行开始创建
            Row row = sheet.createRow(rowIndex);
            for (int i = 0; i < rowValues.length; i++) {
                Cell cell = row.createCell(i);
                // 塞入行数据
                cell.setCellValue(rowValues[i]);
                // 设置样式
                cell.setCellStyle(style);
            }
            // 获取当前行的部门名称
            String currentDepartment = rowValues[0];
            if (departmentMergedRegions.containsKey(currentDepartment)) {
                // 如果当前部门已经存在于Map中，则获取对应的单元格范围
                CellRangeAddress mergedRegion = departmentMergedRegions.get(currentDepartment);
                if (mergedRegion.getFirstRow() == mergedRegion.getLastRow()) {
                    // 如果现有范围仅包含一个单元格，则将当前行添加到上一个部门对应的范围中
                    mergedRegion.setLastRow(rowIndex);
                    if (lastDepartment != null && !lastDepartment.equals(currentDepartment)) {
                        departmentMergedRegions.get(lastDepartment).setLastRow(mergedRegion.getLastRow());
                    }
                } else if (rowIndex == mergedRegion.getLastRow() + 1) {
                    // 如果当前行与现有范围相邻，则扩展现有范围
                    mergedRegion.setLastRow(rowIndex);
                } else {
                    // 否则，创建一个新的单元格范围
                    mergedRegion = new CellRangeAddress(rowIndex, rowIndex, 0, 0);
                    departmentMergedRegions.put(currentDepartment, mergedRegion);
                }
            } else {
                // 如果当前部门不存在于Map中，则创建一个新的单元格范围，并将当前行添加到Map中
                CellRangeAddress mergedRegion = new CellRangeAddress(rowIndex, rowIndex, 0, 0);
                departmentMergedRegions.put(currentDepartment, mergedRegion);
            }
            lastDepartment = currentDepartment;
            rowIndex++;
        }

        // 将合并单元格应用到工作表中
        for (CellRangeAddress mergedRegion : departmentMergedRegions.values()) {
            if (mergedRegion.getFirstRow() != mergedRegion.getLastRow()) {
                sheet.addMergedRegion(mergedRegion);
            }
        }

        return wb;
    }
}

```









```html
<h1 style="text-align: center;" id="zw3z5">
  <b><font size="5">会议报告</font></b>
</h1>
<table style="border-collapse:collapse; width:100%; height:126px; text-align:center;" border="1">
  <tbody>
    <tr style="height: 30px;">
      <td style="width: 10.926%; text-align: center; height: 30px;">
        <b>主持人</b>
      </td>
      <td style="width: 15.5556%; height: 30px;">
        <br/>
      </td>
      <td style="width: 18.7567%; text-align: center; height: 30px;">
        <strong>记录人</strong>
      </td>
      <td style="width: 17.5367%; height: 30px;" colspan="2">
        <br/>
      </td>
      <td style="width: 24.1667%; text-align: center; height: 30px;">
        <strong>组织人/时间提醒人</strong>
      </td>
      <td style="width: 11.8519%; height: 30px;">
        <br/>
      </td>
    </tr>
    <tr style="height: 30px;">
      <td style="width: 10.926%; text-align: center; height: 30px;">
        <strong>开始时间</strong>
      </td>
      <td style="width: 15.5556%; height: 30px;">
        <br/>
      </td>
      <td style="width: 18.7567%; height: 30px; text-align: center;">
        <strong>结束时间</strong>
      </td>
      <td style="width: 17.5367%; text-align: left; height: 30px;" colspan="2">
        <br/>
      </td>
      <td style="width: 24.1667%; text-align: center; height: 30px;">
        <strong>会议历时（小时）</strong>
      </td>
      <td style="width: 11.8519%; height: 30px;">
        <br/>
      </td>
    </tr>
    <tr style="height: 30px;">
      <td style="width: 10.926%; text-align: center; height: 30px;">
        <strong>会议参与人</strong>
      </td>
      <td style="width: 87.8676%; height: 30px;" colspan="6">
        <br/>
      </td>
    </tr>
    <tr>
      <td style="width: 10.926%; text-align: center; height: 130px;">
        <strong>会议内容</strong>
      </td>
      <td style="height: 150px; width: 87.8676%;" colspan="6">
        <p>
          <br/>
        </p>
      </td>
    </tr>
    <tr style="height: 100px;">
      <td style="width: 10.926%; text-align: center; height: 130px;">
        <strong>会议结论</strong>
      </td>
      <td style="height: 150px; width: 87.8676%;" colspan="6">
        <p style="text-align: left;">
          <br/>
        </p>
      </td>
    </tr>
    <tr style="height: 100px;">
      <td style="width: 10.926%; text-align: center; height: 130px;">
        <strong>待办事项</strong>
      </td>
      <td style="width: 87.8676%; height: 150px; text-align: left;" colspan="6">
        <p>
          <br/>
        </p>
      </td>
    </tr>
  </tbody>
</table>
```

