import { read, utils } from 'xlsx'

export default function useExcel() {
  async function convertExcelToJson(file, columns, columnFn) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const data = new Uint8Array(e.target?.result)
          const wb = read(data, { type: 'array', cellDates: true, dateNF: 'yyyy-mm-dd' })

          // 시트가 존재하는지 먼저 확인합니다.
          if (wb.SheetNames.length === 0) {
            // alert({ message: '엑셀 파일에 시트가 존재하지 않습니다.' })
            return reject([])
          }

          const firstSheetName = wb.SheetNames[0]
          const worksheet = wb.Sheets[firstSheetName]

          const excelHeader = utils.sheet_to_json(worksheet, { header: 1 })[0]

          const checkExcelHeader = columns.map(({ headerName }) => headerName)
          const fieldHeader = columns.map(({ field }) => field)

          if (JSON.stringify(checkExcelHeader) === JSON.stringify(excelHeader)) {
            const jsonData = utils.sheet_to_json(worksheet, { header: fieldHeader })
            jsonData.shift()
            resolve(columnFn(jsonData))
          } else {
            // alert({ message: '업로드된 파일이 양식에 맞지 않습니다.\n확인해주세요.' })
            reject([])
          }
        } catch {
          reject([])
        }
      }

      reader.onerror = () => {
        // alert({ message: '업로드 파일들 확인 후 다시 업로드 해 주세요.' })
        reject([])
      }
      reader.readAsArrayBuffer(file)
    })
  }

  return {
    convertExcelToJson,
  }
}
