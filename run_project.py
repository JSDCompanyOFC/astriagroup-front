#!/usr/bin/env python3
"""Install project dependencies when needed and launch the Vite dev server."""

from pathlib import Path
import shutil
import subprocess
import sys


ROOT = Path(__file__).resolve().parent


def main() -> int:
    npm = shutil.which("npm")
    node = shutil.which("node")
    if not node or not npm:
        print("Node.js e npm não encontrados. Instale a versão LTS em https://nodejs.org/ e tente novamente.", file=sys.stderr)
        return 1

    package_json = ROOT / "package.json"
    if not package_json.is_file():
        print(f"package.json não encontrado em {ROOT}", file=sys.stderr)
        return 1

    if not (ROOT / "node_modules").is_dir():
        print("Instalando dependências do projeto…")
        result = subprocess.run([npm, "install"], cwd=ROOT, check=False)
        if result.returncode:
            return result.returncode

    print("Servidor Vite iniciado. Use Ctrl+C para encerrar.")
    return subprocess.run([npm, "run", "dev", "--", "--host", "0.0.0.0"], cwd=ROOT, check=False).returncode


if __name__ == "__main__":
    raise SystemExit(main())
