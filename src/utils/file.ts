import { last } from 'lodash-es'

// 文件规则
const fileRules = [
  {
    label: '图片',
    value: 'image',
    format: ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'gif', 'svg', 'webp'],
    color: '#67C23A',
  },
  {
    label: '视频',
    value: 'video',
    format: ['avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'mp4'],
    color: '#409EFF',
  },
  {
    label: '音频',
    value: 'audio',
    format: ['mp3', 'wav', 'wma', 'mp2', 'flac', 'midi', 'ra', 'ape', 'aac', 'cda'],
    color: '#E6A23C',
  },
  {
    label: '文字',
    value: 'Writer',
    format: ['doc', 'dot', 'wps', 'wpt', 'docx', 'dotx', 'docm', 'dotm'],
    color: '#F56C6C',
  },
  {
    label: '表格',
    value: 'Spreadsheet',
    format: ['xls', 'xlt', 'et', 'xlsx', 'xltx', 'xlsm', 'xltm'],
    color: '#F56C6C',
  },
  {
    label: '演示',
    value: 'Presentation',
    format: ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsm', 'pps', 'potx', 'potm', 'dpt', 'dps'],
    color: '#F56C6C',
  },
  {
    label: 'PDF',
    value: 'Pdf',
    format: ['pdf'],
    color: '#F56C6C',
  },
  {
    label: '文件',
    value: 'file',
    format: [],
    color: '#909399',
  },
]

// 路径名称
export function basename(path: string): string {
  let index = path.lastIndexOf('/')
  index = index > -1 ? index : path.lastIndexOf('\\')
  if (index < 0)
    return path

  return path.substring(index + 1)
}

// 文件名
export function filename(path: string): string {
  return basename(path.substring(0, path.lastIndexOf('.')))
}

// 文件扩展名
export function extname(path: string): string {
  return path.substring(path.lastIndexOf('.') + 1)
}

// 文件大小
export function fileSize(size = 0): string {
  const num = 1024.0

  if (size < num)
    return `${size}B`
  if (size < num ** 2)
    return `${(size / num).toFixed(2)}K`
  if (size < num ** 3)
    return `${(size / num ** 2).toFixed(2)}M`
  if (size < num ** 4)
    return `${(size / num ** 3).toFixed(2)}G`
  return `${(size / num ** 4).toFixed(2)}T`
}

// 文件名
export function fileName(url: string) {
  return filename(url.substring(url.indexOf('_') + 1))
}

// 类型信息
export function fileType(path: string) {
  const d = fileRules.find((e) => {
    return e.format.find(a => a === extname(path).toLocaleLowerCase())
  })

  return d || last(fileRules)
}

// 规则信息
export function fileRule(value: string) {
  return fileRules.find(e => e.value === value)
}
