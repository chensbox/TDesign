export function tabsChange(index, TabElArray, lineRef, trackRef, tabsHeadRef) {
  const [tabsNode] = TabElArray[index]['childNodes']
  const { left, width } = tabsNode.getBoundingClientRect()
  const offsetX = index * -100
  const cur = left + width / 2

  lineRef.value.style.width = width + 'px'
  lineRef.value.style.left = `${left + tabsHeadRef.value.scrollLeft}px`
  trackRef.value.style.transform = `translateX(${offsetX}%)`

  return cur
}
