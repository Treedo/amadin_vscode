import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Шлях до каталогу модулів
const MODULES_DIR = path.join(vscode.workspace.rootPath || '', 'modules');

export function activate(context: vscode.ExtensionContext) {
  const listModulesCommand = vscode.commands.registerCommand('extension.listModules', () => {
    const modules = listAvailableModules();
    const treeDataProvider = new ModuleTreeDataProvider(modules);
    vscode.window.createTreeView('amadin', { treeDataProvider });
  });

  const createConfigCommand = vscode.commands.registerCommand('extension.createConfig', async () => {
    const moduleName = await vscode.window.showInputBox({ prompt: 'Enter module name' });
    if (moduleName) {
      createConfigurationFromModule(moduleName);
    }
  });

  context.subscriptions.push(listModulesCommand, createConfigCommand);
}

export function deactivate() {}

// Функція для читання наявних модулів
function listAvailableModules(): string[] {
  if (!fs.existsSync(MODULES_DIR)) {
    return [];
  }
  return fs.readdirSync(MODULES_DIR).filter(file => fs.statSync(path.join(MODULES_DIR, file)).isDirectory());
}

// Функція для створення нової конфігурації з вибраного модуля
function createConfigurationFromModule(moduleName: string) {
  const modulePath = path.join(MODULES_DIR, moduleName, 'configuration.amadin');
  if (fs.existsSync(modulePath)) {
    const config = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
    const newConfigName = `${moduleName}_config.json`;
    const newConfigPath = path.join(vscode.workspace.rootPath || '', newConfigName);
    fs.writeFileSync(newConfigPath, JSON.stringify(config, null, 2));
    vscode.window.showInformationMessage(`Configuration created: ${newConfigName}`);
    vscode.workspace.openTextDocument(newConfigPath).then(doc => {
      vscode.window.showTextDocument(doc);
    });
  } else {
    vscode.window.showErrorMessage(`Module configuration not found: ${moduleName}`);
  }
}

class ModuleTreeDataProvider implements vscode.TreeDataProvider<ModuleItem> {
  private modules: string[];

  constructor(modules: string[]) {
    this.modules = modules;
  }

  getTreeItem(element: ModuleItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ModuleItem): Thenable<ModuleItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(this.modules.map(module => new ModuleItem(module, vscode.TreeItemCollapsibleState.None)));
    }
  }
}

class ModuleItem extends vscode.TreeItem {
  constructor(public readonly label: string, public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
    super(label, collapsibleState);
  }
}
