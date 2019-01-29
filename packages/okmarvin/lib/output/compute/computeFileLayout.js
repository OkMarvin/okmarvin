'use strict'

module.exports = conn => {
  const {
    files,
    layouts,
    site: { layoutHierarchy }
  } = conn
  return {
    ...conn,
    files: files.reduce((acc, file) => {
      const { layout, template } = file
      if (layout) {
        if (layouts[layout]) {
          return [...acc, { ...file, layout: layouts[layout] }]
        } else {
          // layout defined in file doesn't exist
          throw new Error(
            `${layout} defined in ${
              file.filePath
            } not found under _layouts directory`
          )
        }
      }
      const candidateLayouts = layoutHierarchy[template] || []
      let useLayout
      for (let i = 0, len = candidateLayouts.length; i < len; i++) {
        if (layouts[candidateLayouts[i]]) {
          useLayout = layouts[candidateLayouts[i]]
          break
        }
      }
      if (!useLayout) {
        throw new Error(
          `No layouts found under _layouts directory for ${file.filePath}`
        )
      }
      return [...acc, { ...file, layout: useLayout }]
    }, [])
  }
}
