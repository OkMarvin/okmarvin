module.exports = (conn) => {
  const {
    files,
    layouts,
    siteConfig: { layoutHierarchy }
  } = conn
  return {
    ...conn,
    files: files.reduce((acc, file) => {
      const { layout, template } = file
      const candidateLayouts = layoutHierarchy[layout || template] || []
      let useLayout
      for (let i = 0, len = candidateLayouts.length; i < len; i++) {
        if (layouts[candidateLayouts[i]]) {
          useLayout = candidateLayouts[i]
          break
        }
      }
      return [...acc, { ...file, layout: useLayout }]
    }, [])
  }
}
