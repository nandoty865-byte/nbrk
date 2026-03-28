param(
  [string]$RepoUrl = 'https://github.com/nandoty865-byte/nbrk.git',
  [string]$Branch = 'main',
  [string]$CommitMessage = 'chore: atualizar VistaPro local',
  [switch]$ForcePush
)

$ErrorActionPreference = 'Stop'

Write-Host "==> Atualizador Git do VistaPro" -ForegroundColor Cyan
Write-Host "Pasta atual: $PWD" -ForegroundColor DarkGray

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git não encontrado. Instale o Git for Windows antes de continuar."
}

if (-not (Test-Path ".\package.json")) {
  Write-Warning "package.json não encontrado nesta pasta. Confirme se você está na raiz do projeto."
}

if (-not (Test-Path ".git")) {
  Write-Host "==> Inicializando repositório Git" -ForegroundColor Yellow
  git init
} else {
  Write-Host "==> Repositório Git já existe" -ForegroundColor Green
}

$gitName = git config --global --get user.name 2>$null
$gitEmail = git config --global --get user.email 2>$null

if ([string]::IsNullOrWhiteSpace($gitName)) {
  $gitName = Read-Host "Informe o user.name do Git"
  if ([string]::IsNullOrWhiteSpace($gitName)) {
    Write-Error "user.name não pode ficar vazio."
  }
  git config --global user.name "$gitName"
}

if ([string]::IsNullOrWhiteSpace($gitEmail)) {
  $gitEmail = Read-Host "Informe o user.email do Git"
  if ([string]::IsNullOrWhiteSpace($gitEmail)) {
    Write-Error "user.email não pode ficar vazio."
  }
  git config --global user.email "$gitEmail"
}

Write-Host "==> Configurando branch e remote" -ForegroundColor Yellow
git branch -M $Branch

$hasOrigin = $false
try {
  git remote get-url origin *> $null
  if ($LASTEXITCODE -eq 0) { $hasOrigin = $true }
} catch {
  $hasOrigin = $false
}

if ($hasOrigin) {
  git remote set-url origin $RepoUrl
} else {
  git remote add origin $RepoUrl
}

Write-Host "==> Adicionando arquivos" -ForegroundColor Yellow
git add .

$pending = git status --porcelain
if ([string]::IsNullOrWhiteSpace($pending)) {
  Write-Host "Nenhuma alteração para commitar." -ForegroundColor Green
} else {
  Write-Host "==> Criando commit" -ForegroundColor Yellow
  git commit -m $CommitMessage
}

Write-Host "==> Enviando para o GitHub" -ForegroundColor Yellow
if ($ForcePush) {
  git push -u origin $Branch --force
} else {
  git push -u origin $Branch
}

Write-Host ""
Write-Host "✅ Atualização Git concluída." -ForegroundColor Green
Write-Host "Remote: $RepoUrl"
Write-Host "Branch: $Branch"
Write-Host ""
Write-Host "Comandos úteis:" -ForegroundColor Cyan
Write-Host "git status"
Write-Host "git log --oneline -n 5"
Write-Host "git remote -v"
