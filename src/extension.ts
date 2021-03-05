import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const workspace = vscode.workspace.workspaceFolders;
  const workspacePath = workspace?.[0].uri.fsPath;

  const config = vscode.workspace.getConfiguration('copy-workspace-path');
  const cd = config.get<String>('add cd');
  
  let disposable = vscode.commands.registerCommand('copy-workspace-path.add cd', () => {

    if (workspace && workspacePath) {
      if (cd) {
        vscode.env.clipboard.writeText('cd \'' + workspacePath + '\'');
      } else {
        vscode.env.clipboard.writeText('\'' + workspacePath + '\'');
      }

      vscode.window.showInformationMessage(`The path copied! ${workspacePath}`);
    } else {
      vscode.window.showInformationMessage(`Could not copy. It seems that no project is open.`);
    }
    
  });

  context.subscriptions.push(disposable);
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
