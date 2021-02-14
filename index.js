
const parseArgs = args => {
  let dict = {}
  let classes = []
  let content = ''
  for (const arg of args) {
    switch (typeof arg) {
      case 'object':
        if (Array.isArray(arg)) {
          classes = [...classes, ...arg]
        } else {
          dict = { ...dict, ...arg }
        }
        break
      case 'string':
        content += arg
        break
      default:
        throw new Error(`"${arg}" is ${typeof arg} but must be object or string (${JSON.stringify(args)})`)
    }
  }
  if (classes.length > 0) {
    if (dict.class) {
      dict.class += ' ' + classes.join(' ')
    } else {
      dict.class = classes.join(' ')
    }
  }
  let attributes = ''
  for (const key in dict) {
    const value = dict[key]
    switch (typeof value) {
      case 'string': {
        const quote = value.match(/"/) ? '\'' : '"'
        attributes += ` ${key}=${quote}${value}${quote}`
        break
      }
      case 'number':
        attributes += ` ${key}="${value}"`
        break
      case 'boolean':
        if (value) {
          attributes += ` ${key}`
        }
        break
      case 'object':
        for (const subKey in value) {
          const subValue = value[subKey]
          switch (typeof subValue) {
            case 'string': {
              const quote = subValue.match(/"/) ? '\'' : '"'
              attributes += ` ${key}:${subKey}=${quote}${subValue}${quote}`
              break
            }
            case 'number':
              attributes += ` ${key}="${value}"`
              break
            case 'boolean':
              if (value) {
                attributes += ` ${key}:${subKey}`
              }
              break
            default:
              throw new Error(`${key}="${value}" is a ${typeof value}, but expecting string or Boolean`)
          }
        }
        break
      default:
        throw new Error(`${key}="${value}" is a ${typeof value}, but expecting string, Boolean, or object`)
    }
  }
  return { attributes, content }
}

const element = tag => (...args) => {
  const { attributes, content } = parseArgs(args)
  return `<${tag}${attributes}>${content}</${tag}>`
}

const voidElement = tag => (...args) => {
  const { attributes, content } = parseArgs(args)
  if (content) {
    throw new Error(`<${tag}> is not allwed to have content`)
  }
  return `<${tag}${attributes}>`
}

export const a = element('a')
export const article = element('article')
export const body = element('body')
export const em = element('em')
export const figure = element('figure')
export const h1 = element('h1')
export const h2 = element('h2')
export const h3 = element('h3')
export const head = element('head')
export const html = element('html')
export const label = element('label')
export const p = element('p')
export const script = element('script')
export const section = element('section')
export const span = element('span')
export const style = element('style')
export const sup = element('sup')
export const title = element('title')
export const video = element('video')

// All the self-closing elements
export const area = voidElement('area')
export const base = voidElement('base')
export const br = voidElement('br')
export const col = voidElement('col')
export const embed = voidElement('embed')
export const hr = voidElement('hr')
export const img = voidElement('img')
export const input = voidElement('input')
export const link = voidElement('link')
export const meta = voidElement('meta')
export const param = voidElement('param')
export const source = voidElement('source')
export const track = voidElement('track')
export const wbr = voidElement('wbr')
