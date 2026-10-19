import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'

const root = resolve('dist')
const port = Number(process.env.PORT) || 4173
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }

  let filePath = resolve(root, `.${pathname}`)
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end('Forbidden')
    return
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, 'index.html')
  } catch {
    filePath = resolve(root, 'index.html')
  }

  try {
    const body = await readFile(filePath)
    const immutable = pathname.startsWith('/assets/')
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    })
    response.end(request.method === 'HEAD' ? undefined : body)
  } catch {
    response.writeHead(404).end('Not found')
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Ástria running on port ${port}`)
})
