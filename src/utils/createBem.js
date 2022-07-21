/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function createBem(name) {
  return (el, mods) => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return `${el}${genBem(el, mods)}`
  }
}

function genBem(name, mods) {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  if (Array.isArray(mods)) {
    return mods.reduce((res, item) => res + genBem(name, item), '')
  }

  return Object.keys(mods).reduce(
    (res, key) => res + (mods[key] ? genBem(name, key) : ''),
    ''
  )
}

export function createNamespace(name) {
  const prefixedName = `t-${name}`
  return [prefixedName, createBem(prefixedName)]
}
