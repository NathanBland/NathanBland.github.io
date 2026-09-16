import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const resume = JSON.parse(
  await readFile(resolve(projectRoot, 'src/data/resume.json'), 'utf8')
)

const letter = [612, 792]
const margin = 48
const contentWidth = letter[0] - (margin * 2)
const palette = {
  ink: rgb(16 / 255, 33 / 255, 43 / 255),
  slate: rgb(82 / 255, 101 / 255, 109 / 255),
  teal: rgb(23 / 255, 110 / 255, 115 / 255),
  sunset: rgb(1, 179 / 255, 143 / 255),
  line: rgb(216 / 255, 227 / 255, 226 / 255),
  paper: rgb(1, 253 / 255, 248 / 255)
}

const pdf = await PDFDocument.create()
pdf.setTitle(`${resume.name} - Resume`)
pdf.setAuthor(resume.name)
pdf.setSubject('Professional experience, selected projects, skills, and education')
pdf.setKeywords(['front-end development', 'UI development', 'software engineering'])
pdf.setCreator('nathanbland.dev build pipeline')
pdf.setProducer('pdf-lib')

const regular = await pdf.embedFont(StandardFonts.Helvetica)
const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
const italic = await pdf.embedFont(StandardFonts.HelveticaOblique)

const clean = (text) => String(text)
  .replaceAll('—', '-')
  .replaceAll('–', '-')
  .replaceAll('’', "'")
  .replaceAll('“', '"')
  .replaceAll('”', '"')

const wrapText = (text, font, size, maxWidth) => {
  const words = clean(text).trim().split(/\s+/)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !line) {
      line = candidate
    } else {
      lines.push(line)
      line = word
    }
  }

  if (line) lines.push(line)
  return lines
}

const drawWrappedText = (page, text, options) => {
  const {
    x,
    y,
    font = regular,
    size = 9.5,
    maxWidth = contentWidth,
    lineHeight = size * 1.35,
    color = palette.ink
  } = options
  const lines = wrapText(text, font, size, maxWidth)
  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - (index * lineHeight), font, size, color })
  })
  return y - (lines.length * lineHeight)
}

const drawRightText = (page, text, options) => {
  const { right, y, font = regular, size = 9.5, color = palette.ink } = options
  const value = clean(text)
  page.drawText(value, {
    x: right - font.widthOfTextAtSize(value, size),
    y,
    font,
    size,
    color
  })
}

const drawRule = (page, y) => {
  page.drawLine({
    start: { x: margin, y },
    end: { x: letter[0] - margin, y },
    thickness: 0.75,
    color: palette.line
  })
}

const drawSectionLabel = (page, label, y) => {
  page.drawText(clean(label).toUpperCase(), {
    x: margin,
    y,
    font: bold,
    size: 8,
    color: palette.teal,
    characterSpacing: 1.1
  })
  return y - 19
}

const drawPageHeader = (page, pageNumber, compact = false) => {
  page.drawRectangle({ x: margin, y: 738, width: contentWidth, height: 8, color: palette.teal })

  if (compact) {
    page.drawText(resume.name, { x: margin, y: 711, font: bold, size: 17, color: palette.ink })
    drawRightText(page, `${resume.email}  |  nathanbland.dev`, {
      right: letter[0] - margin,
      y: 713,
      size: 8.5,
      color: palette.slate
    })
  } else {
    page.drawText(resume.name, { x: margin, y: 694, font: bold, size: 29, color: palette.ink })
    page.drawText(resume.headline, { x: margin, y: 674, font: regular, size: 12, color: palette.teal })
    drawRightText(page, resume.email, {
      right: letter[0] - margin,
      y: 696,
      font: bold,
      size: 9.5,
      color: palette.ink
    })
    drawRightText(page, 'nathanbland.dev', {
      right: letter[0] - margin,
      y: 680,
      size: 9,
      color: palette.slate
    })
    drawRightText(page, 'linkedin.com/in/nathan-bland-39177766', {
      right: letter[0] - margin,
      y: 665,
      size: 8.5,
      color: palette.slate
    })
  }

  page.drawText(`Page ${pageNumber} of 2`, {
    x: margin,
    y: 26,
    font: regular,
    size: 7.5,
    color: palette.slate
  })
  drawRightText(page, 'nathanbland.dev', {
    right: letter[0] - margin,
    y: 26,
    size: 7.5,
    color: palette.slate
  })
}

const drawRole = (page, role, y) => {
  page.drawCircle({
    x: margin + 3,
    y: y + 2,
    size: 3,
    color: role.current ? palette.sunset : palette.teal
  })
  page.drawText(clean(role.role), {
    x: margin + 14,
    y,
    font: bold,
    size: 11.5,
    color: palette.ink
  })
  drawRightText(page, role.period, {
    right: letter[0] - margin,
    y: y + 1,
    font: bold,
    size: 8.5,
    color: palette.slate
  })
  y -= 15
  page.drawText(clean(role.company), {
    x: margin + 14,
    y,
    font: bold,
    size: 9.5,
    color: palette.teal
  })
  if (role.location) {
    drawRightText(page, role.location, {
      right: letter[0] - margin,
      y,
      size: 8.5,
      color: palette.slate
    })
  }
  if (role.summary) {
    y -= 17
    y = drawWrappedText(page, role.summary, {
      x: margin + 14,
      y,
      size: 9.2,
      maxWidth: contentWidth - 14,
      lineHeight: 12.5,
      color: palette.ink
    })
  }

  for (const highlight of role.highlights) {
    const bulletY = y - 2
    page.drawCircle({ x: margin + 18, y: bulletY + 3, size: 1.5, color: palette.teal })
    y = drawWrappedText(page, highlight, {
      x: margin + 27,
      y: bulletY,
      size: 8.8,
      maxWidth: contentWidth - 27,
      lineHeight: 12,
      color: palette.slate
    })
  }

  if (role.tools.length) {
    y = drawWrappedText(page, role.tools.join('  |  '), {
      x: margin + 14,
      y: y - 2,
      font: italic,
      size: 8,
      maxWidth: contentWidth - 14,
      lineHeight: 10.5,
      color: palette.slate
    })
  }

  return y - 16
}

const drawProject = (page, project, y) => {
  const name = clean(project.name)
  page.drawText(name, { x: margin, y, font: bold, size: 11, color: palette.ink })
  page.drawText(clean(project.label), {
    x: margin + bold.widthOfTextAtSize(name, 11) + 7,
    y,
    font: regular,
    size: 9.5,
    color: palette.teal
  })
  y = drawWrappedText(page, project.summary, {
    x: margin,
    y: y - 16,
    size: 9,
    lineHeight: 12.3,
    color: palette.ink
  })
  y = drawWrappedText(page, project.tools.join('  |  '), {
    x: margin,
    y: y - 1,
    font: italic,
    size: 8,
    lineHeight: 10.5,
    color: palette.slate
  })
  return y - 14
}

const firstPage = pdf.addPage(letter)
firstPage.drawRectangle({ x: 0, y: 0, width: letter[0], height: letter[1], color: palette.paper })
drawPageHeader(firstPage, 1)

let y = drawSectionLabel(firstPage, 'Profile', 624)
y = drawWrappedText(firstPage, resume.summary, {
  x: margin,
  y,
  size: 10.5,
  maxWidth: contentWidth,
  lineHeight: 14.5,
  color: palette.ink
}) - 14
drawRule(firstPage, y)
y = drawSectionLabel(firstPage, 'Professional experience', y - 24)

for (const role of resume.experience.filter((item) => item.featured)) {
  y = drawRole(firstPage, role, y)
}

drawRule(firstPage, y + 6)

const secondPage = pdf.addPage(letter)
secondPage.drawRectangle({ x: 0, y: 0, width: letter[0], height: letter[1], color: palette.paper })
drawPageHeader(secondPage, 2, true)

y = drawSectionLabel(secondPage, 'Additional experience', 675)
for (const role of resume.experience.filter((item) => !item.featured)) {
  y = drawRole(secondPage, role, y)
}

drawRule(secondPage, y + 6)
y = drawSectionLabel(secondPage, 'Selected projects', y - 18)
for (const project of resume.projects) {
  y = drawProject(secondPage, project, y)
}

drawRule(secondPage, y + 6)
y = drawSectionLabel(secondPage, 'Technical scope', y - 18)
for (const group of resume.skills) {
  secondPage.drawText(clean(group.label), { x: margin, y, font: bold, size: 9, color: palette.ink })
  y = drawWrappedText(secondPage, group.items.join(', '), {
    x: margin + 103,
    y,
    size: 8.8,
    maxWidth: contentWidth - 103,
    lineHeight: 11.5,
    color: palette.slate
  }) - 4
}

drawRule(secondPage, y + 6)
y = drawSectionLabel(secondPage, 'Education and certification', y - 18)
secondPage.drawText(clean(resume.education.school), {
  x: margin,
  y,
  font: bold,
  size: 10.5,
  color: palette.ink
})
drawRightText(secondPage, resume.education.period, {
  right: letter[0] - margin,
  y,
  font: bold,
  size: 8.5,
  color: palette.slate
})
secondPage.drawText(clean(resume.education.degree), {
  x: margin,
  y: y - 15,
  font: regular,
  size: 9,
  color: palette.slate
})
y -= 39

for (const certification of resume.certifications) {
  const name = clean(certification.name)
  secondPage.drawText(name, { x: margin, y, font: bold, size: 9.5, color: palette.ink })
  secondPage.drawText(clean(certification.issuer), {
    x: margin + bold.widthOfTextAtSize(name, 9.5) + 7,
    y,
    font: regular,
    size: 9,
    color: palette.slate
  })
  y -= 14
}

const bytes = await pdf.save()
const outputs = [
  resolve(projectRoot, 'public/nathan-bland-resume.pdf'),
  resolve(projectRoot, 'output/pdf/nathan-bland-resume.pdf')
]

for (const output of outputs) {
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, bytes)
}

console.log(`Generated ${outputs[0]}`)
