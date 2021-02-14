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
        if (content.length > 0) {
          content += ' '
        }
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

export const element = tag => (...args) => {
  const { attributes, content } = parseArgs(args)
  return `<${tag}${attributes}>${content}</${tag}>`
}

export const emptyElement = tag => (...args) => {
  const { attributes, content } = parseArgs(args)
  if (content) {
    throw new Error(`<${tag}> is not allwed to have content`)
  }
  return `<${tag}${attributes}>`
}
